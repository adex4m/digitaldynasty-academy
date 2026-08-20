REVOKE EXECUTE ON FUNCTION public.is_admin_allowed() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.claim_first_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin_allowed() TO authenticated;
GRANT EXECUTE ON FUNCTION public.claim_first_admin() TO authenticated;