CREATE INDEX IF NOT EXISTS courses_published_sort_idx ON public.courses (is_published, sort_order);
CREATE INDEX IF NOT EXISTS bootcamps_published_sort_idx ON public.bootcamps (is_published, sort_order);
CREATE INDEX IF NOT EXISTS bootcamp_tiers_published_sort_idx ON public.bootcamp_tiers (is_published, sort_order);
CREATE INDEX IF NOT EXISTS resource_categories_published_sort_idx ON public.resource_categories (is_published, sort_order);