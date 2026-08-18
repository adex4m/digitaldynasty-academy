CREATE OR REPLACE FUNCTION public.claim_first_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  admin_exists BOOLEAN;
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN false;
  END IF;
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') INTO admin_exists;
  IF admin_exists THEN
    RETURN false;
  END IF;
  INSERT INTO public.user_roles (user_id, role)
  VALUES (auth.uid(), 'admin')
  ON CONFLICT (user_id, role) DO NOTHING;
  RETURN true;
END;
$$;

REVOKE ALL ON FUNCTION public.claim_first_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.claim_first_admin() TO authenticated;

-- Allow admins to see all profiles for team management
CREATE OR REPLACE FUNCTION public.list_team()
RETURNS TABLE (user_id UUID, email TEXT, full_name TEXT, roles TEXT[])
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT p.id, p.email, p.full_name,
         COALESCE(ARRAY_AGG(ur.role::TEXT) FILTER (WHERE ur.role IS NOT NULL), '{}') AS roles
  FROM public.profiles p
  LEFT JOIN public.user_roles ur ON ur.user_id = p.id
  WHERE public.has_role(auth.uid(), 'admin')
  GROUP BY p.id, p.email, p.full_name
  ORDER BY p.created_at
$$;

REVOKE ALL ON FUNCTION public.list_team() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.list_team() TO authenticated;