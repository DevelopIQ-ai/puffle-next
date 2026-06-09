alter table public.landing_leads
  add column if not exists company_input text,
  add column if not exists visitor_id text,
  add column if not exists session_id text,
  add column if not exists ip_address inet,
  add column if not exists ip_chain text[] not null default '{}'::text[],
  add column if not exists cf_connecting_ip inet,
  add column if not exists real_ip inet,
  add column if not exists request_headers jsonb not null default '{}'::jsonb,
  add column if not exists request_metadata jsonb not null default '{}'::jsonb,
  add column if not exists client_metadata jsonb not null default '{}'::jsonb,
  add column if not exists contact_request_headers jsonb,
  add column if not exists contact_request_metadata jsonb,
  add column if not exists contact_client_metadata jsonb,
  add column if not exists page_url text,
  add column if not exists page_path text,
  add column if not exists page_search text,
  add column if not exists page_referrer text,
  add column if not exists document_title text,
  add column if not exists referrer text,
  add column if not exists origin text,
  add column if not exists host text,
  add column if not exists user_agent text,
  add column if not exists accept_language text,
  add column if not exists browser_language text,
  add column if not exists browser_languages text[] not null default '{}'::text[],
  add column if not exists platform text,
  add column if not exists timezone text,
  add column if not exists timezone_offset_minutes integer,
  add column if not exists country text,
  add column if not exists region text,
  add column if not exists city text,
  add column if not exists latitude numeric(9, 6),
  add column if not exists longitude numeric(9, 6),
  add column if not exists utm_source text,
  add column if not exists utm_medium text,
  add column if not exists utm_campaign text,
  add column if not exists utm_term text,
  add column if not exists utm_content text,
  add column if not exists gclid text,
  add column if not exists fbclid text,
  add column if not exists msclkid text,
  add column if not exists ttclid text,
  add column if not exists li_fat_id text,
  add column if not exists screen_width integer,
  add column if not exists screen_height integer,
  add column if not exists viewport_width integer,
  add column if not exists viewport_height integer,
  add column if not exists device_pixel_ratio numeric(8, 3),
  add column if not exists color_depth integer,
  add column if not exists pixel_depth integer,
  add column if not exists hardware_concurrency integer,
  add column if not exists device_memory numeric(8, 3),
  add column if not exists max_touch_points integer,
  add column if not exists webdriver boolean,
  add column if not exists cookie_enabled boolean,
  add column if not exists do_not_track text,
  add column if not exists online boolean,
  add column if not exists connection_metadata jsonb not null default '{}'::jsonb,
  add column if not exists performance_metadata jsonb not null default '{}'::jsonb,
  add column if not exists interaction_metadata jsonb not null default '{}'::jsonb,
  add column if not exists contact_submitted_at timestamptz;

create index if not exists landing_leads_visitor_created_at_idx
  on public.landing_leads (visitor_id, created_at desc)
  where visitor_id is not null;

create index if not exists landing_leads_session_created_at_idx
  on public.landing_leads (session_id, created_at desc)
  where session_id is not null;

create index if not exists landing_leads_ip_address_idx
  on public.landing_leads (ip_address)
  where ip_address is not null;

create index if not exists landing_leads_country_created_at_idx
  on public.landing_leads (country, created_at desc)
  where country is not null;

create index if not exists landing_leads_utm_source_created_at_idx
  on public.landing_leads (utm_source, created_at desc)
  where utm_source is not null;
