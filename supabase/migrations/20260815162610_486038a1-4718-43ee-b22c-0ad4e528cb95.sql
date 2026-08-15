-- ROLES ENUM
CREATE TYPE public.app_role AS ENUM ('admin', 'editor');

-- SHARED updated_at TRIGGER FN
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- PROFILES
CREATE TABLE public.profiles (
  id UUID NOT NULL PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- USER ROLES
CREATE TABLE public.user_roles (
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE OR REPLACE FUNCTION public.is_staff(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role IN ('admin', 'editor')
  )
$$;

-- PROFILES POLICIES
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT TO authenticated USING (id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE TO authenticated USING (id = auth.uid()) WITH CHECK (id = auth.uid());

-- USER ROLES POLICIES
CREATE POLICY "Staff can view roles" ON public.user_roles
  FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage roles" ON public.user_roles
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- AUTO PROFILE ON SIGNUP
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data ->> 'full_name')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- COURSES
CREATE TABLE public.courses (
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  why_take TEXT[] NOT NULL DEFAULT '{}',
  beginner_timeline TEXT NOT NULL DEFAULT '',
  intermediate_timeline TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT '',
  thumbnail_url TEXT,
  enroll_url TEXT,
  is_custom_request BOOLEAN NOT NULL DEFAULT false,
  is_published BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.courses TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.courses TO authenticated;
GRANT ALL ON public.courses TO service_role;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published courses are public" ON public.courses
  FOR SELECT USING (is_published OR public.is_staff(auth.uid()));
CREATE POLICY "Staff manage courses" ON public.courses
  FOR ALL TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE TRIGGER courses_updated_at BEFORE UPDATE ON public.courses
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- BOOTCAMPS
CREATE TABLE public.bootcamps (
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  image_url TEXT,
  highlights TEXT[] NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'contact',
  register_url TEXT,
  is_published BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.bootcamps TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.bootcamps TO authenticated;
GRANT ALL ON public.bootcamps TO service_role;
ALTER TABLE public.bootcamps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published bootcamps are public" ON public.bootcamps
  FOR SELECT USING (is_published OR public.is_staff(auth.uid()));
CREATE POLICY "Staff manage bootcamps" ON public.bootcamps
  FOR ALL TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE TRIGGER bootcamps_updated_at BEFORE UPDATE ON public.bootcamps
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- BOOTCAMP TIERS
CREATE TABLE public.bootcamp_tiers (
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  price TEXT NOT NULL DEFAULT '',
  features TEXT[] NOT NULL DEFAULT '{}',
  is_highlighted BOOLEAN NOT NULL DEFAULT false,
  register_url TEXT,
  is_published BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.bootcamp_tiers TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.bootcamp_tiers TO authenticated;
GRANT ALL ON public.bootcamp_tiers TO service_role;
ALTER TABLE public.bootcamp_tiers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published tiers are public" ON public.bootcamp_tiers
  FOR SELECT USING (is_published OR public.is_staff(auth.uid()));
CREATE POLICY "Staff manage tiers" ON public.bootcamp_tiers
  FOR ALL TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE TRIGGER bootcamp_tiers_updated_at BEFORE UPDATE ON public.bootcamp_tiers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- RESOURCE CATEGORIES
CREATE TABLE public.resource_categories (
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  icon TEXT NOT NULL DEFAULT 'BookOpen',
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  cta_label TEXT,
  cta_url TEXT,
  is_published BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.resource_categories TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.resource_categories TO authenticated;
GRANT ALL ON public.resource_categories TO service_role;
ALTER TABLE public.resource_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published resources are public" ON public.resource_categories
  FOR SELECT USING (is_published OR public.is_staff(auth.uid()));
CREATE POLICY "Staff manage resources" ON public.resource_categories
  FOR ALL TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE TRIGGER resource_categories_updated_at BEFORE UPDATE ON public.resource_categories
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- SITE SETTINGS (shared CTA links)
CREATE TABLE public.site_settings (
  key TEXT NOT NULL PRIMARY KEY,
  value TEXT NOT NULL DEFAULT '',
  label TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_settings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Settings are public" ON public.site_settings
  FOR SELECT USING (true);
CREATE POLICY "Staff manage settings" ON public.site_settings
  FOR ALL TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE TRIGGER site_settings_updated_at BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();