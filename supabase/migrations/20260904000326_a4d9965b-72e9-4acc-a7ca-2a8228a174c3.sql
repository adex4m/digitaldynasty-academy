CREATE TABLE public.visitor_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  agreed_to_terms BOOLEAN NOT NULL DEFAULT false,
  agreed_at TIMESTAMP WITH TIME ZONE,
  newsletter_opt_in BOOLEAN NOT NULL DEFAULT true,
  source_path TEXT NOT NULL DEFAULT '',
  referrer TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX visitor_leads_created_at_idx ON public.visitor_leads (created_at DESC);
CREATE INDEX visitor_leads_email_idx ON public.visitor_leads (lower(email));

GRANT INSERT ON public.visitor_leads TO anon;
GRANT INSERT, SELECT, UPDATE, DELETE ON public.visitor_leads TO authenticated;
GRANT ALL ON public.visitor_leads TO service_role;

ALTER TABLE public.visitor_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit visitor details"
  ON public.visitor_leads FOR INSERT TO anon, authenticated
  WITH CHECK (
    agreed_to_terms = true
    AND length(trim(full_name)) BETWEEN 2 AND 120
    AND length(trim(email)) BETWEEN 5 AND 255
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND length(trim(phone)) BETWEEN 6 AND 30
  );

CREATE POLICY "Staff can read visitor leads"
  ON public.visitor_leads FOR SELECT TO authenticated
  USING (public.is_staff(auth.uid()));

CREATE POLICY "Staff can update visitor leads"
  ON public.visitor_leads FOR UPDATE TO authenticated
  USING (public.is_staff(auth.uid()))
  WITH CHECK (public.is_staff(auth.uid()));

CREATE POLICY "Staff can delete visitor leads"
  ON public.visitor_leads FOR DELETE TO authenticated
  USING (public.is_staff(auth.uid()));

CREATE TRIGGER visitor_leads_updated_at
  BEFORE UPDATE ON public.visitor_leads
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();