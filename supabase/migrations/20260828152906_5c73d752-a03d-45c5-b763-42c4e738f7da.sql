REVOKE EXECUTE ON FUNCTION public.consommer_quota_ia(text) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.usage_ia_du_jour() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.consommer_quota_ia(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.usage_ia_du_jour() TO authenticated;