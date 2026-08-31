ALTER TABLE public.courses REPLICA IDENTITY FULL;
ALTER TABLE public.bootcamps REPLICA IDENTITY FULL;
ALTER TABLE public.bootcamp_tiers REPLICA IDENTITY FULL;
ALTER TABLE public.resource_categories REPLICA IDENTITY FULL;
ALTER TABLE public.site_settings REPLICA IDENTITY FULL;

ALTER PUBLICATION supabase_realtime ADD TABLE public.courses;
ALTER PUBLICATION supabase_realtime ADD TABLE public.bootcamps;
ALTER PUBLICATION supabase_realtime ADD TABLE public.bootcamp_tiers;
ALTER PUBLICATION supabase_realtime ADD TABLE public.resource_categories;
ALTER PUBLICATION supabase_realtime ADD TABLE public.site_settings;