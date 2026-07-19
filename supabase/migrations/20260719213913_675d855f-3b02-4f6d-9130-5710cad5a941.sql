
CREATE SCHEMA IF NOT EXISTS private;
GRANT USAGE ON SCHEMA private TO anon, authenticated, service_role;

CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
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

REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO anon, authenticated, service_role;

-- assessment_leads
DROP POLICY IF EXISTS "Admins can delete assessment leads" ON public.assessment_leads;
DROP POLICY IF EXISTS "Admins can read assessment leads" ON public.assessment_leads;
DROP POLICY IF EXISTS "Public can insert assessment leads" ON public.assessment_leads;

CREATE POLICY "Admins can delete assessment leads" ON public.assessment_leads
  FOR DELETE TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can read assessment leads" ON public.assessment_leads
  FOR SELECT TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Public can insert assessment leads" ON public.assessment_leads
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(nome) > 0
    AND length(email) > 3
    AND length(whatsapp) > 0
  );

-- assessment_url_submissions
DROP POLICY IF EXISTS "Admins can delete assessment url submissions" ON public.assessment_url_submissions;
DROP POLICY IF EXISTS "Admins can read assessment url submissions" ON public.assessment_url_submissions;
DROP POLICY IF EXISTS "Public can insert assessment url submissions" ON public.assessment_url_submissions;

CREATE POLICY "Admins can delete assessment url submissions" ON public.assessment_url_submissions
  FOR DELETE TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can read assessment url submissions" ON public.assessment_url_submissions
  FOR SELECT TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Public can insert assessment url submissions" ON public.assessment_url_submissions
  FOR INSERT TO anon, authenticated
  WITH CHECK (length(loja_url) > 0 AND length(loja_url) < 2048);

-- page_views
DROP POLICY IF EXISTS "Anyone can insert page views" ON public.page_views;
CREATE POLICY "Anyone can insert page views" ON public.page_views
  FOR INSERT TO anon, authenticated
  WITH CHECK (length(path) > 0 AND length(path) < 2048);

-- user_roles
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;
CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

-- blog_categories
DROP POLICY IF EXISTS "Admins can manage categories" ON public.blog_categories;
CREATE POLICY "Admins can manage categories" ON public.blog_categories
  FOR ALL TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

-- blog_posts
DROP POLICY IF EXISTS "Admins can delete posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can insert posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can update posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Anyone can read published posts" ON public.blog_posts;

CREATE POLICY "Admins can delete posts" ON public.blog_posts
  FOR DELETE TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can insert posts" ON public.blog_posts
  FOR INSERT TO authenticated
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can update posts" ON public.blog_posts
  FOR UPDATE TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Anyone can read published posts" ON public.blog_posts
  FOR SELECT TO anon, authenticated
  USING (status = 'published' OR private.has_role(auth.uid(), 'admin'::public.app_role));

-- storage.objects (blog-images) — drop public listing, recreate admin policies against private.has_role
DROP POLICY IF EXISTS "Admins can delete blog images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update blog images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload blog images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view blog images" ON storage.objects;

CREATE POLICY "Admins can delete blog images" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'blog-images' AND private.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can update blog images" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'blog-images' AND private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (bucket_id = 'blog-images' AND private.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can upload blog images" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'blog-images' AND private.has_role(auth.uid(), 'admin'::public.app_role));

-- No public SELECT policy on storage.objects for blog-images (bucket stays public for direct URLs).

-- Finally drop the old public.has_role wrapper
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);
