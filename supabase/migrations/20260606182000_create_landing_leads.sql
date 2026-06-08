create extension if not exists pgcrypto;

create table if not exists public.landing_leads (
  id uuid primary key default gen_random_uuid(),
  company_url text not null,
  email text,
  x_handle text,
  linkedin_url text,
  source text not null default 'homepage',
  status text not null default 'company_submitted',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint landing_leads_status_check check (
    status in ('company_submitted', 'contact_submitted')
  ),
  constraint landing_leads_contact_check check (
    status = 'company_submitted'
    or email is not null
    or x_handle is not null
    or linkedin_url is not null
  )
);

create index if not exists landing_leads_created_at_idx
  on public.landing_leads (created_at desc);

create index if not exists landing_leads_status_created_at_idx
  on public.landing_leads (status, created_at desc);

alter table public.landing_leads enable row level security;
