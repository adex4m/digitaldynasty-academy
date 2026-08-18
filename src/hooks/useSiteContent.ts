import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface DbCourse {
  id: string;
  slug: string;
  title: string;
  description: string;
  why_take: string[];
  beginner_timeline: string;
  intermediate_timeline: string;
  category: string;
  thumbnail_url: string | null;
  enroll_url: string | null;
  is_custom_request: boolean;
  is_published: boolean;
  sort_order: number;
}

export interface DbBootcamp {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  highlights: string[];
  status: string;
  register_url: string | null;
  is_published: boolean;
  sort_order: number;
}

export interface DbTier {
  id: string;
  name: string;
  title: string;
  price: string;
  features: string[];
  is_highlighted: boolean;
  register_url: string | null;
  is_published: boolean;
  sort_order: number;
}

export interface ResourceItem {
  name: string;
  type: string;
  url?: string;
}

export interface DbResourceCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  items: ResourceItem[];
  cta_label: string | null;
  cta_url: string | null;
  is_published: boolean;
  sort_order: number;
}

export const useCourses = () =>
  useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("is_published", true)
        .order("sort_order");
      if (error) throw error;
      return (data ?? []) as unknown as DbCourse[];
    },
  });

export const useBootcamps = () =>
  useQuery({
    queryKey: ["bootcamps"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bootcamps")
        .select("*")
        .eq("is_published", true)
        .order("sort_order");
      if (error) throw error;
      return (data ?? []) as unknown as DbBootcamp[];
    },
  });

export const useBootcampTiers = () =>
  useQuery({
    queryKey: ["bootcamp_tiers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bootcamp_tiers")
        .select("*")
        .eq("is_published", true)
        .order("sort_order");
      if (error) throw error;
      return (data ?? []) as unknown as DbTier[];
    },
  });

export const useResourceCategories = () =>
  useQuery({
    queryKey: ["resource_categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("resource_categories")
        .select("*")
        .eq("is_published", true)
        .order("sort_order");
      if (error) throw error;
      return (data ?? []).map((row) => ({
        ...row,
        items: Array.isArray(row.items) ? (row.items as unknown as ResourceItem[]) : [],
      })) as unknown as DbResourceCategory[];
    },
  });

export const useSiteSettings = () =>
  useQuery({
    queryKey: ["site_settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("key,value,label");
      if (error) throw error;
      const map: Record<string, string> = {};
      (data ?? []).forEach((row) => {
        map[row.key] = row.value;
      });
      return map;
    },
  });
