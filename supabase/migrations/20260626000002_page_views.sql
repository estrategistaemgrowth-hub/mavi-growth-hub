create table public.page_views (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now() not null,
  path text not null,
  referrer text
);

alter table public.page_views enable row level security;

create policy "Anyone can insert page views"
  on public.page_views for insert
  to anon, authenticated
  with check (true);

create policy "Admins can read page views"
  on public.page_views for select
  to authenticated
  using (
    exists (
      select 1 from public.user_roles
      where user_id = auth.uid() and role = 'admin'
    )
  );
