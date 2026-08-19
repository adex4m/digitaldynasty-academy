CREATE TABLE public.admin_allowlist (
  email TEXT PRIMARY KEY,
  note TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT ON public.admin_allowlist TO authenticated;
GRANT ALL ON public.admin_allowlist TO service_role;

ALTER TABLE public.admin_allowlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage allowlist"
ON public.admin_allowlist FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

INSERT INTO public.admin_allowlist (email, note)
VALUES ('hello@digitaldynasty.academy', 'Primary owner account')
ON CONFLICT (email) DO NOTHING;

-- Is the current signed-in user permitted to reach the admin area?
CREATE OR REPLACE FUNCTION public.is_admin_allowed()
RETURNS BOOLEAN
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  uid UUID := auth.uid();
  addr TEXT;
BEGIN
  IF uid IS NULL THEN
    RETURN false;
  END IF;

  -- Existing staff keep access regardless of the allowlist
  IF public.is_staff(uid) THEN
    RETURN true;
  END IF;

  SELECT lower(email) INTO addr FROM auth.users WHERE id = uid;
  IF addr IS NULL THEN
    RETURN false;
  END IF;

  RETURN EXISTS (SELECT 1 FROM public.admin_allowlist WHERE lower(email) = addr);
END;
$$;

-- Only an allowlisted email may bootstrap the first admin
CREATE OR REPLACE FUNCTION public.claim_first_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  admin_exists BOOLEAN;
  addr TEXT;
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN false;
  END IF;

  SELECT lower(email) INTO addr FROM auth.users WHERE id = auth.uid();
  IF addr IS NULL OR NOT EXISTS (
    SELECT 1 FROM public.admin_allowlist WHERE lower(email) = addr
  ) THEN
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