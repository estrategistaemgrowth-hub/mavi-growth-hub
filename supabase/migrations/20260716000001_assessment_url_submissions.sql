create table public.assessment_url_submissions (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now() not null,
  loja_url text not null
);

alter table public.assessment_url_submissions enable row level security;

create policy "Public can insert assessment url submissions"
  on public.assessment_url_submissions for insert
  to anon, authenticated
  with check (true);

create policy "Admins can read assessment url submissions"
  on public.assessment_url_submissions for select
  to authenticated
  using (
    exists (
      select 1 from public.user_roles
      where user_id = auth.uid() and role = 'admin'
    )
  );

create policy "Admins can delete assessment url submissions"
  on public.assessment_url_submissions for delete
  to authenticated
  using (
    exists (
      select 1 from public.user_roles
      where user_id = auth.uid() and role = 'admin'
    )
  );
