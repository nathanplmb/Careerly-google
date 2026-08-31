import { useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import {
  Briefcase,
  CalendarClock,
  Loader2,
  Paperclip,
  Sparkles,
  Users,
  Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useCandidatures } from "@/hooks/useCandidatures";
import { useSession } from "@/hooks/useSession";
import { upsertContact } from "@/lib/contacts-cloud";
import { texteErreurIA } from "@/lib/ai-erreurs";
import { extraireTexteFichier, TYPES_ACCEPTES } from "@/lib/cv-fichier";
import { trierAvecIa } from "@/lib/tri-ia.functions";
import {
  appliquerEcheance,
  trouverCandidature,
  versCandidature,
  versContact,
  type TriIa,
} from "@/lib/tri-ia";
import { formatDate, todayIso } from "@/lib/candidatures";

type Selection = {
  candidatures: boolean[];
  contacts: boolean[];
  echeances: boolean[];
};

function selectionInitiale(t: TriIa): Selection {
  return {
    candidatures: t.candidatures.map(() => true),
    contacts: t.contacts.map(() => true),
    echeances: t.echeances.map(() => true),
  };
}

export function AssistantIa() {
  const { user } = useSession();
  const { items, save, patch } = useCandidatures();
  const run = useServerFn(trierAvecIa);
  const fichierRef = useRef<HTMLInputElement>(null);

  const [texte, setTexte] = useState("");
  const [analyse, setAnalyse] = useState(false);
  const [enregistre, setEnregistre] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const [tri, setTri] = useState<TriIa | null>(null);
  const [sel, setSel] = useState<Selection>({
    candidatures: [],
    contacts: [],
    echeances: [],
  });

  const basculer = (cle: keyof Selection, i: number) =>
    setSel((s) => ({ ...s, [cle]: s[cle].map((v, j) => (j === i ? !v : v)) }));

  const chargerFichier = async (file: File) => {
    try {
      const t = await extraireTexteFichier(file);
      setTexte((prev) => (prev ? `${prev}\n\n${t}` : t));
      toast.success("Fichier ajouté au texte à analyser.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Fichier illisible.");
    }
  };

  const analyser = async () => {
    setAnalyse(true);
    setErreur(null);
    try {
      const r = await run({ data: { texte, aujourdhui: todayIso() } });
      setTri(r);
      setSel(selectionInitiale(r));
    } catch (e) {
      setErreur(texteErreurIA(e));
    } finally {
      setAnalyse(false);
    }
  };

  const enregistrer = async () => {
    if (!tri) return;
    setEnregistre(true);
    try {
      let nbC = 0;
      let nbP = 0;
      let nbE = 0;
      const ajoutees = [...items];

      for (let i = 0; i < tri.candidatures.length; i++) {
        if (!sel.candidatures[i]) continue;
        const c = versCandidature(tri.candidatures[i]!);
        if (!c.entreprise && !c.poste) continue;
        await save(c);
        ajoutees.unshift(c);
        nbC++;
      }

      for (let i = 0; i < tri.echeances.length; i++) {
        if (!sel.echeances[i]) continue;
        const e = tri.echeances[i]!;
        const cible = trouverCandidature(ajoutees, e.entreprise);
        if (!cible) continue;
        const p = appliquerEcheance(cible, e);
        if (!p) continue;
        if (items.some((c) => c.id === cible.id)) patch(cible.id, p);
        else await save({ ...cible, ...p });
        nbE++;
      }

      if (user) {
        for (let i = 0; i < tri.contacts.length; i++) {
          if (!sel.contacts[i]) continue;
          const ct = versContact(tri.contacts[i]!);
          if (!ct.nom) continue;
          const lie = trouverCandidature(ajoutees, ct.entreprise);
          await upsertContact({ ...ct, candidatureId: lie?.id ?? "" }, user.id);
          nbP++;
        }
      } else if (tri.contacts.some((_, i) => sel.contacts[i])) {
        toast.info("Connectez-vous pour enregistrer les contacts.");
      }

      toast.success(
        `Classé : ${nbC} candidature(s), ${nbP} contact(s), ${nbE} échéance(s).`,
      );
      setTri(null);
      setTexte("");
    } catch {
      toast.error("Enregistrement impossible.");
    } finally {
      setEnregistre(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border/60 bg-card/60 p-4 sm:p-5">
        <div className="mb-3 flex items-center gap-2">
          <Wand2 className="size-5 text-primary" />
          <div>
            <h2 className="font-semibold">Assistant IA universel</h2>
            <p className="text-sm text-muted-foreground">
              Collez n'importe quoi (annonce, e-mail, notes, liste
              d'entreprises, message LinkedIn) : l'IA en sort les candidatures,
              les contacts et les échéances, et les range dans NACORA.
            </p>
          </div>
        </div>

        <Textarea
          rows={10}
          value={texte}
          onChange={(e) => setTexte(e.target.value)}
          placeholder="Exemple : « Entretien avec Camille Roux (RH, Danone) mardi 9 septembre. Offre stage contrôle de gestion chez L'Oréal à Paris, candidature avant le 20/09, lien linkedin.com/... »"
        />

        {erreur && <p className="mt-2 text-sm text-destructive">{erreur}</p>}

        <div className="mt-3 flex flex-wrap gap-2">
          <Button
            onClick={analyser}
            disabled={analyse || texte.trim().length < 20}
          >
            {analyse ? <Loader2 className="animate-spin" /> : <Sparkles />}
            {analyse ? "Classement en cours…" : "Classer automatiquement"}
          </Button>
          <Button variant="outline" onClick={() => fichierRef.current?.click()}>
            <Paperclip /> Ajouter un fichier
          </Button>
          <input
            ref={fichierRef}
            type="file"
            accept={TYPES_ACCEPTES}
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              e.target.value = "";
              if (f) void chargerFichier(f);
            }}
          />
        </div>
      </div>

      {tri && (
        <div className="space-y-4 rounded-2xl border border-border/60 bg-card/60 p-4 sm:p-5">
          {tri.resume && (
            <p className="text-sm text-muted-foreground">{tri.resume}</p>
          )}

          <Section
            icon={<Briefcase className="size-4 text-primary" />}
            titre="Candidatures détectées"
            vide="Aucune candidature détectée."
            lignes={tri.candidatures.map((c, i) => ({
              actif: sel.candidatures[i] ?? false,
              onToggle: () => basculer("candidatures", i),
              titre:
                [c.entreprise, c.poste].filter(Boolean).join(" — ") ||
                "Sans titre",
              detail: [
                c.lieu,
                c.statut,
                c.dateLimite && `limite ${formatDate(c.dateLimite)}`,
              ]
                .filter(Boolean)
                .join(" · "),
            }))}
          />

          <Section
            icon={<Users className="size-4 text-primary" />}
            titre="Contacts détectés"
            vide="Aucun contact détecté."
            lignes={tri.contacts.map((c, i) => ({
              actif: sel.contacts[i] ?? false,
              onToggle: () => basculer("contacts", i),
              titre: c.nom || "Sans nom",
              detail: [c.poste, c.entreprise, c.email]
                .filter(Boolean)
                .join(" · "),
            }))}
          />

          <Section
            icon={<CalendarClock className="size-4 text-primary" />}
            titre="Échéances détectées"
            vide="Aucune échéance détectée."
            lignes={tri.echeances.map((e, i) => ({
              actif: sel.echeances[i] ?? false,
              onToggle: () => basculer("echeances", i),
              titre: e.titre || e.nature,
              detail: [e.entreprise, e.date && formatDate(e.date)]
                .filter(Boolean)
                .join(" · "),
            }))}
          />

          <div className="flex flex-wrap gap-2">
            <Button onClick={enregistrer} disabled={enregistre}>
              {enregistre ? <Loader2 className="animate-spin" /> : <Sparkles />}
              Ranger dans NACORA
            </Button>
            <Button
              variant="outline"
              onClick={() => setTri(null)}
              disabled={enregistre}
            >
              Annuler
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

type Ligne = {
  actif: boolean;
  onToggle: () => void;
  titre: string;
  detail: string;
};

function Section({
  icon,
  titre,
  vide,
  lignes,
}: {
  icon: React.ReactNode;
  titre: string;
  vide: string;
  lignes: Ligne[];
}) {
  return (
    <div>
      <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold">
        {icon} {titre}{" "}
        <span className="text-muted-foreground">({lignes.length})</span>
      </h3>
      {lignes.length === 0 ? (
        <p className="text-sm text-muted-foreground">{vide}</p>
      ) : (
        <ul className="space-y-1.5">
          {lignes.map((l, i) => (
            <li
              key={`${l.titre}-${i}`}
              className="flex items-start gap-3 rounded-xl border border-border/50 bg-background/40 px-3 py-2"
            >
              <Checkbox
                checked={l.actif}
                onCheckedChange={l.onToggle}
                className="mt-0.5"
                aria-label={`Inclure ${l.titre}`}
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{l.titre}</p>
                {l.detail && (
                  <p className="truncate text-xs text-muted-foreground">
                    {l.detail}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
