CREATE TABLE public.assessment_url_submissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now(),
  loja_url text NOT NULL
);

GRANT INSERT ON public.assessment_url_submissions TO anon, authenticated;
GRANT SELECT, DELETE ON public.assessment_url_submissions TO authenticated;
GRANT ALL ON public.assessment_url_submissions TO service_role;

ALTER TABLE public.assessment_url_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can insert assessment url submissions"
  ON public.assessment_url_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can read assessment url submissions"
  ON public.assessment_url_submissions FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete assessment url submissions"
  ON public.assessment_url_submissions FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));