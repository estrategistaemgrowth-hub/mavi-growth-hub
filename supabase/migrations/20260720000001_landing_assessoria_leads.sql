create table public.landing_assessoria_leads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now() not null,
  nome text not null,
  email text not null,
  whatsapp text not null,
  empresa text,
  segmento text not null,
  faturamento text,
  origem_url text
);

alter table public.landing_assessoria_leads enable row level security;

create policy "Public can insert landing assessoria leads"
  on public.landing_assessoria_leads for insert
  to anon, authenticated
  with check (true);

create policy "Admins can read landing assessoria leads"
  on public.landing_assessoria_leads for select
  to authenticated
  using (
    exists (
      select 1 from public.user_roles
      where user_id = auth.uid() and role = 'admin'
    )
  );

create policy "Admins can delete landing assessoria leads"
  on public.landing_assessoria_leads for delete
  to authenticated
  using (
    exists (
      select 1 from public.user_roles
      where user_id = auth.uid() and role = 'admin'
    )
  );
