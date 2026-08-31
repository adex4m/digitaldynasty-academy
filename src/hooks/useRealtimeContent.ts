import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

/**
 * Keeps the public site in sync with the separate admin site.
 * Any insert/update/delete on a content table invalidates the matching
 * React Query cache, so visitors see edits within about a second.
 */
const TABLES = [
  "courses",
  "bootcamps",
  "bootcamp_tiers",
  "resource_categories",
  "site_settings",
] as const;

export const useRealtimeContent = () => {
  const qc = useQueryClient();

  useEffect(() => {
    const channel = supabase.channel("public-content-sync");

    TABLES.forEach((table) => {
      channel.on(
        "postgres_changes",
        { event: "*", schema: "public", table },
        () => {
          qc.invalidateQueries({ queryKey: [table] });
        }
      );
    });

    channel.subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [qc]);
};

export default useRealtimeContent;
