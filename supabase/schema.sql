-- Joynity Growth Report MVP schema
-- Run this in Supabase SQL Editor.

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  role text not null check (role in ('admin', 'client')) default 'client',
  name text not null,
  email text not null,
  birthdate date,
  gender text,
  team text,
  parent_name text,
  phone text,
  created_at timestamptz not null default now()
);

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete set null,
  name text not null,
  birthdate date,
  gender text,
  height numeric,
  weight numeric,
  sport text,
  team text,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  title text not null,
  evaluation_date date not null default current_date,
  height numeric,
  weight numeric,
  growth_stage text,
  echo_findings text,
  posture_findings text,
  movement_findings text,
  risk_level text,
  summary text,
  advice text,
  exercise_menu text,
  pdf_url text,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists clients_profile_id_idx on public.clients(profile_id);
create index if not exists reports_client_id_idx on public.reports(client_id);

alter table public.profiles enable row level security;
alter table public.clients enable row level security;
alter table public.reports enable row level security;

create or replace function public.current_profile_role()
returns text
language sql
security definer
set search_path = public
as $$
  select role from public.profiles where user_id = auth.uid() limit 1;
$$;

create or replace function public.current_profile_id()
returns uuid
language sql
security definer
set search_path = public
as $$
  select id from public.profiles where user_id = auth.uid() limit 1;
$$;

drop policy if exists "profiles_self_or_admin_select" on public.profiles;
create policy "profiles_self_or_admin_select"
on public.profiles for select
to authenticated
using (user_id = auth.uid() or public.current_profile_role() = 'admin');

drop policy if exists "profiles_self_insert" on public.profiles;
create policy "profiles_self_insert"
on public.profiles for insert
to authenticated
with check (user_id = auth.uid());

drop policy if exists "profiles_self_or_admin_update" on public.profiles;
create policy "profiles_self_or_admin_update"
on public.profiles for update
to authenticated
using (user_id = auth.uid() or public.current_profile_role() = 'admin')
with check (user_id = auth.uid() or public.current_profile_role() = 'admin');

drop policy if exists "clients_admin_all" on public.clients;
create policy "clients_admin_all"
on public.clients for all
to authenticated
using (public.current_profile_role() = 'admin')
with check (public.current_profile_role() = 'admin');

drop policy if exists "clients_self_select" on public.clients;
create policy "clients_self_select"
on public.clients for select
to authenticated
using (profile_id = public.current_profile_id());

drop policy if exists "reports_admin_all" on public.reports;
create policy "reports_admin_all"
on public.reports for all
to authenticated
using (public.current_profile_role() = 'admin')
with check (public.current_profile_role() = 'admin');

drop policy if exists "reports_client_published_select" on public.reports;
create policy "reports_client_published_select"
on public.reports for select
to authenticated
using (
  is_published = true
  and exists (
    select 1
    from public.clients c
    where c.id = reports.client_id
      and c.profile_id = public.current_profile_id()
  )
);

insert into storage.buckets (id, name, public)
values ('report-pdfs', 'report-pdfs', false)
on conflict (id) do nothing;

drop policy if exists "report_pdf_admin_all" on storage.objects;
create policy "report_pdf_admin_all"
on storage.objects for all
to authenticated
using (bucket_id = 'report-pdfs' and public.current_profile_role() = 'admin')
with check (bucket_id = 'report-pdfs' and public.current_profile_role() = 'admin');

drop policy if exists "report_pdf_client_read" on storage.objects;
create policy "report_pdf_client_read"
on storage.objects for select
to authenticated
using (bucket_id = 'report-pdfs');

