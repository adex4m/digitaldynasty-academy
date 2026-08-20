REVOKE EXECUTE ON FUNCTION public.claim_first_admin() FROM anon;
REVOKE EXECUTE ON FUNCTION public.is_admin_allowed() FROM anon;
REVOKE EXECUTE ON FUNCTION public.list_team() FROM anon;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon;
REVOKE EXECUTE ON FUNCTION public.is_staff(uuid) FROM anon;

GRANT EXECUTE ON FUNCTION public.claim_first_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin_allowed() TO authenticated;
GRANT EXECUTE ON FUNCTION public.list_team() TO authenticated;