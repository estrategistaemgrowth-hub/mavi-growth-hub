create table public.assessment_leads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now() not null,
  loja_url text,
  nome text not null,
  email text not null,
  whatsapp text not null,
  avg_score integer not null default 0,
  persona text not null default '',
  scores jsonb not null default '{}',
  answers jsonb not null default '[]'
);

alter table public.assessment_leads enable row level security;

create policy "Public can insert assessment leads"
  on public.assessment_leads for insert
  to anon, authenticated
  with check (true);

create policy "Admins can read assessment leads"
  on public.assessment_leads for select
  to authenticated
  using (
    exists (
      select 1 from public.user_roles
      where user_id = auth.uid() and role = 'admin'
    )
  );

create policy "Admins can delete assessment leads"
  on public.assessment_leads for delete
  to authenticated
  using (
    exists (
      select 1 from public.user_roles
      where user_id = auth.uid() and role = 'admin'
    )
  );
