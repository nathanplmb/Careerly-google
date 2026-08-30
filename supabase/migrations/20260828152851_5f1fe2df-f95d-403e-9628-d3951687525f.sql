CREATE TABLE public.plans_utilisateur (
  user_id uuid NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  plan text NOT NULL DEFAULT 'gratuit',
  expire_le timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.plans_utilisateur TO authenticated;
GRANT ALL ON public.plans_utilisateur TO service_role;
ALTER TABLE public.plans_utilisateur ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Lire son propre plan" ON public.plans_utilisateur FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE TRIGGER update_plans_utilisateur_updated_at BEFORE UPDATE ON public.plans_utilisateur FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.quotas_plan (
  plan text NOT NULL,
  outil text NOT NULL,
  limite_jour integer NOT NULL,
  PRIMARY KEY (plan, outil)
);
GRANT SELECT ON public.quotas_plan TO authenticated;
GRANT ALL ON public.quotas_plan TO service_role;
ALTER TABLE public.quotas_plan ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Quotas visibles" ON public.quotas_plan FOR SELECT TO authenticated USING (true);

INSERT INTO public.quotas_plan (plan, outil, limite_jour) VALUES
  ('gratuit','brief',2),
  ('gratuit','match',30),
  ('gratuit','offre',20),
  ('gratuit','cv',5),
  ('gratuit','tri',15),
  ('gratuit','redaction',15),
  ('gratuit','relance',15),
  ('gratuit','_total',60),
  ('pro','brief',6),
  ('pro','match',200),
  ('pro','offre',150),
  ('pro','cv',30),
  ('pro','tri',100),
  ('pro','redaction',100),
  ('pro','relance',100),
  ('pro','_total',400);

CREATE TABLE public.usage_ia (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  jour date NOT NULL DEFAULT (now() AT TIME ZONE 'utc')::date,
  outil text NOT NULL,
  compteur integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, jour, outil)
);
GRANT SELECT ON public.usage_ia TO authenticated;
GRANT ALL ON public.usage_ia TO service_role;
ALTER TABLE public.usage_ia ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Lire son propre usage" ON public.usage_ia FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE TABLE public.debit_ia (
  user_id uuid NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  derniers timestamptz[] NOT NULL DEFAULT '{}'
);
GRANT SELECT ON public.debit_ia TO authenticated;
GRANT ALL ON public.debit_ia TO service_role;
ALTER TABLE public.debit_ia ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Lire son propre debit" ON public.debit_ia FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.consommer_quota_ia(_outil text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _uid uuid := auth.uid();
  _plan text;
  _jour date := (now() AT TIME ZONE 'utc')::date;
  _limite integer;
  _limite_totale integer;
  _utilise integer;
  _total integer;
  _recents timestamptz[];
BEGIN
  IF _uid IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'raison', 'auth');
  END IF;

  SELECT CASE WHEN p.expire_le IS NOT NULL AND p.expire_le < now() THEN 'gratuit' ELSE p.plan END
    INTO _plan FROM public.plans_utilisateur p WHERE p.user_id = _uid;
  IF _plan IS NULL THEN
    INSERT INTO public.plans_utilisateur (user_id) VALUES (_uid)
      ON CONFLICT (user_id) DO NOTHING;
    _plan := 'gratuit';
  END IF;

  -- Limite de debit : 5 appels par minute
  INSERT INTO public.debit_ia (user_id, derniers) VALUES (_uid, '{}')
    ON CONFLICT (user_id) DO NOTHING;
  SELECT array(SELECT t FROM unnest(d.derniers) AS t WHERE t > now() - interval '1 minute')
    INTO _recents FROM public.debit_ia d WHERE d.user_id = _uid FOR UPDATE;
  IF coalesce(array_length(_recents, 1), 0) >= 5 THEN
    UPDATE public.debit_ia SET derniers = _recents WHERE user_id = _uid;
    RETURN jsonb_build_object('ok', false, 'raison', 'debit');
  END IF;

  SELECT q.limite_jour INTO _limite FROM public.quotas_plan q WHERE q.plan = _plan AND q.outil = _outil;
  IF _limite IS NULL THEN _limite := 10; END IF;
  SELECT q.limite_jour INTO _limite_totale FROM public.quotas_plan q WHERE q.plan = _plan AND q.outil = '_total';
  IF _limite_totale IS NULL THEN _limite_totale := 60; END IF;

  SELECT coalesce(sum(u.compteur), 0) INTO _total
    FROM public.usage_ia u WHERE u.user_id = _uid AND u.jour = _jour;
  IF _total >= _limite_totale THEN
    RETURN jsonb_build_object('ok', false, 'raison', 'total', 'limite', _limite_totale);
  END IF;

  SELECT coalesce(u.compteur, 0) INTO _utilise
    FROM public.usage_ia u WHERE u.user_id = _uid AND u.jour = _jour AND u.outil = _outil;
  IF coalesce(_utilise, 0) >= _limite THEN
    RETURN jsonb_build_object('ok', false, 'raison', 'quota', 'limite', _limite, 'outil', _outil);
  END IF;

  INSERT INTO public.usage_ia (user_id, jour, outil, compteur)
    VALUES (_uid, _jour, _outil, 1)
    ON CONFLICT (user_id, jour, outil)
    DO UPDATE SET compteur = public.usage_ia.compteur + 1, updated_at = now();

  UPDATE public.debit_ia SET derniers = _recents || now() WHERE user_id = _uid;

  RETURN jsonb_build_object('ok', true, 'plan', _plan, 'outil', _outil,
    'limite', _limite, 'reste', _limite - coalesce(_utilise, 0) - 1);
END;
$$;
GRANT EXECUTE ON FUNCTION public.consommer_quota_ia(text) TO authenticated;

CREATE OR REPLACE FUNCTION public.usage_ia_du_jour()
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _uid uuid := auth.uid();
  _plan text;
  _jour date := (now() AT TIME ZONE 'utc')::date;
BEGIN
  IF _uid IS NULL THEN RETURN jsonb_build_object('plan', 'gratuit', 'lignes', '[]'::jsonb); END IF;
  SELECT CASE WHEN p.expire_le IS NOT NULL AND p.expire_le < now() THEN 'gratuit' ELSE p.plan END
    INTO _plan FROM public.plans_utilisateur p WHERE p.user_id = _uid;
  IF _plan IS NULL THEN _plan := 'gratuit'; END IF;
  RETURN jsonb_build_object(
    'plan', _plan,
    'lignes', coalesce((
      SELECT jsonb_agg(jsonb_build_object(
        'outil', q.outil,
        'limite', q.limite_jour,
        'utilise', coalesce((SELECT u.compteur FROM public.usage_ia u
           WHERE u.user_id = _uid AND u.jour = _jour AND u.outil = q.outil), 0)
      ) ORDER BY q.outil)
      FROM public.quotas_plan q WHERE q.plan = _plan AND q.outil <> '_total'
    ), '[]'::jsonb),
    'total_utilise', coalesce((SELECT sum(u.compteur) FROM public.usage_ia u
      WHERE u.user_id = _uid AND u.jour = _jour), 0),
    'total_limite', coalesce((SELECT q.limite_jour FROM public.quotas_plan q
      WHERE q.plan = _plan AND q.outil = '_total'), 60)
  );
END;
$$;
GRANT EXECUTE ON FUNCTION public.usage_ia_du_jour() TO authenticated;