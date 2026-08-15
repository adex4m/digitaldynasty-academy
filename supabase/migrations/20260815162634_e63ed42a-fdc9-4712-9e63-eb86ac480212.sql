-- Split public-read policies so anon never needs the role helpers
DROP POLICY "Published courses are public" ON public.courses;
CREATE POLICY "Published courses are public" ON public.courses
  FOR SELECT TO anon USING (is_published);
CREATE POLICY "Staff read all courses" ON public.courses
  FOR SELECT TO authenticated USING (is_published OR public.is_staff(auth.uid()));

DROP POLICY "Published bootcamps are public" ON public.bootcamps;
CREATE POLICY "Published bootcamps are public" ON public.bootcamps
  FOR SELECT TO anon USING (is_published);
CREATE POLICY "Staff read all bootcamps" ON public.bootcamps
  FOR SELECT TO authenticated USING (is_published OR public.is_staff(auth.uid()));

DROP POLICY "Published tiers are public" ON public.bootcamp_tiers;
CREATE POLICY "Published tiers are public" ON public.bootcamp_tiers
  FOR SELECT TO anon USING (is_published);
CREATE POLICY "Staff read all tiers" ON public.bootcamp_tiers
  FOR SELECT TO authenticated USING (is_published OR public.is_staff(auth.uid()));

DROP POLICY "Published resources are public" ON public.resource_categories;
CREATE POLICY "Published resources are public" ON public.resource_categories
  FOR SELECT TO anon USING (is_published);
CREATE POLICY "Staff read all resources" ON public.resource_categories
  FOR SELECT TO authenticated USING (is_published OR public.is_staff(auth.uid()));

DROP POLICY "Settings are public" ON public.site_settings;
CREATE POLICY "Settings are public" ON public.site_settings
  FOR SELECT TO anon, authenticated USING (true);

-- Lock down function execution
REVOKE ALL ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.is_staff(UUID) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_staff(UUID) TO authenticated;