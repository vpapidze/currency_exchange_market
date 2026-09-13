-- კურსი / Kursi — run in Supabase SQL Editor
-- Dashboard → SQL → New query → Run

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Helpers
-- ---------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Core tables
-- ---------------------------------------------------------------------------

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'client' check (role in ('client', 'company', 'admin')),
  full_name text not null default '',
  phone text not null default '',
  locale text not null default 'ka' check (locale in ('ka', 'en', 'ru')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null unique references public.profiles (id) on delete cascade,
  slug text not null unique,
  name_ka text not null,
  name_en text,
  name_ru text,
  description_ka text not null default '',
  description_en text,
  description_ru text,
  logo_url text,
  phone text not null default '',
  email text not null default '',
  website text,
  city_ka text not null default 'თბილისი',
  city_en text not null default 'Tbilisi',
  city_ru text not null default 'Тбилиси',
  address_ka text not null default '',
  address_en text,
  address_ru text,
  nbg_registration_number text,
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected', 'suspended')),
  verified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.currencies (
  code text primary key,
  name_ka text not null,
  name_en text not null,
  name_ru text not null,
  symbol text not null,
  decimals int not null default 2,
  quote_unit int not null default 1 check (quote_unit in (1, 10, 100, 1000)),
  is_active boolean not null default true,
  sort_order int not null default 0
);

create table if not exists public.wallets (
  id uuid primary key default gen_random_uuid(),
  owner_type text not null check (owner_type in ('user', 'company')),
  owner_id uuid not null,
  currency text not null references public.currencies (code),
  available_balance numeric(20, 4) not null default 0 check (available_balance >= 0),
  reserved_balance numeric(20, 4) not null default 0 check (reserved_balance >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (owner_type, owner_id, currency)
);

create table if not exists public.ledger_entries (
  id uuid primary key default gen_random_uuid(),
  wallet_id uuid not null references public.wallets (id) on delete cascade,
  type text not null check (type in (
    'deposit', 'withdraw', 'exchange_debit', 'exchange_credit',
    'reserve', 'release', 'adjustment'
  )),
  amount numeric(20, 4) not null,
  currency text not null references public.currencies (code),
  ref_type text,
  ref_id uuid,
  created_by uuid references public.profiles (id),
  note text,
  created_at timestamptz not null default now()
);

create table if not exists public.company_rates (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  base_currency text not null default 'GEL' references public.currencies (code),
  quote_currency text not null references public.currencies (code),
  buy_rate numeric(20, 6) not null check (buy_rate > 0),
  sell_rate numeric(20, 6) not null check (sell_rate > 0),
  min_amount numeric(20, 4),
  max_amount numeric(20, 4),
  is_active boolean not null default true,
  updated_at timestamptz not null default now(),
  unique (company_id, base_currency, quote_currency),
  check (quote_currency <> base_currency)
);

create table if not exists public.exchange_requests (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.profiles (id),
  company_id uuid not null references public.companies (id),
  from_currency text not null references public.currencies (code),
  to_currency text not null references public.currencies (code),
  from_amount numeric(20, 4) not null check (from_amount > 0),
  to_amount numeric(20, 4) not null check (to_amount > 0),
  rate_used numeric(20, 6) not null,
  rate_side text not null check (rate_side in ('buy', 'sell')),
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'rejected', 'cancelled', 'expired')),
  client_note text,
  company_note text,
  expires_at timestamptz not null default (now() + interval '15 minutes'),
  decided_at timestamptz,
  decided_by uuid references public.profiles (id),
  created_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  type text not null,
  payload jsonb not null default '{}'::jsonb,
  read_at timestamptz,
  ref_type text,
  ref_id uuid,
  created_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id int primary key default 1 check (id = 1),
  phone text not null default '+995555000000',
  phone_display text not null default '+995 555 00 00 00',
  email text not null default 'hello@kursi.ge',
  facebook text not null default '',
  address_street text not null default 'რუსთაველის გამზირი',
  address_street_en text not null default 'Rustaveli Avenue',
  address_street_ru text not null default 'проспект Руставели',
  address_city text not null default 'თბილისი',
  address_city_en text not null default 'Tbilisi',
  address_city_ru text not null default 'Тбилиси',
  address_country text not null default 'საქართველო',
  address_country_en text not null default 'Georgia',
  address_country_ru text not null default 'Грузия',
  hours_weekday text not null default 'ორშ – პარ · 09:00 — 19:00',
  hours_weekend text not null default 'შაბ · 10:00 — 16:00',
  map_embed_query text not null default 'Tbilisi, Georgia',
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  locale text not null default 'ka',
  created_at timestamptz not null default now()
);

create table if not exists public.translations (
  key text primary key,
  value_ka text not null default '',
  value_en text not null default '',
  value_ru text not null default '',
  value text not null default '',
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Indexes
-- ---------------------------------------------------------------------------

create index if not exists companies_status_idx on public.companies (status);
create index if not exists wallets_owner_idx on public.wallets (owner_type, owner_id);
create index if not exists ledger_wallet_idx on public.ledger_entries (wallet_id, created_at desc);
create index if not exists company_rates_company_idx on public.company_rates (company_id);
create index if not exists exchange_requests_client_idx on public.exchange_requests (client_id, created_at desc);
create index if not exists exchange_requests_company_idx on public.exchange_requests (company_id, status, created_at desc);
create index if not exists notifications_user_idx on public.notifications (user_id, created_at desc);

-- ---------------------------------------------------------------------------
-- Triggers
-- ---------------------------------------------------------------------------

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();

drop trigger if exists companies_updated_at on public.companies;
create trigger companies_updated_at before update on public.companies
  for each row execute function public.set_updated_at();

drop trigger if exists wallets_updated_at on public.wallets;
create trigger wallets_updated_at before update on public.wallets
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Auth + profile bootstrap
-- ---------------------------------------------------------------------------

create or replace function public.slugify(input text)
returns text
language plpgsql
immutable
as $$
declare
  s text;
begin
  s := lower(trim(both from coalesce(input, '')));
  s := regexp_replace(s, '[^a-z0-9ა-ჰа-яё0-9]+', '-', 'gi');
  s := trim(both '-' from s);
  if s is null or length(s) < 2 then
    s := 'company';
  end if;
  return left(s, 40);
end;
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_role text;
  v_name text;
  v_phone text;
  v_locale text;
  v_company text;
  v_slug text;
begin
  v_role := coalesce(new.raw_user_meta_data ->> 'role', 'client');
  if v_role not in ('client', 'company') then
    v_role := 'client';
  end if;
  v_name := coalesce(new.raw_user_meta_data ->> 'full_name', '');
  v_phone := coalesce(new.raw_user_meta_data ->> 'phone', '');
  v_locale := coalesce(new.raw_user_meta_data ->> 'locale', 'ka');
  if v_locale not in ('ka', 'en', 'ru') then
    v_locale := 'ka';
  end if;
  v_company := coalesce(new.raw_user_meta_data ->> 'company_name', v_name);

  insert into public.profiles (id, role, full_name, phone, locale)
  values (new.id, v_role, v_name, v_phone, v_locale);

  if v_role = 'company' then
    v_slug := public.slugify(v_company) || '-' || substr(replace(new.id::text, '-', ''), 1, 8);
    insert into public.companies (
      owner_id, slug, name_ka, name_en, name_ru, phone, email, status
    ) values (
      new.id, v_slug, coalesce(nullif(v_company, ''), 'ახალი კომპანია'),
      v_company, v_company, v_phone, coalesce(new.email, ''), 'pending'
    );
  end if;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.auto_confirm_email()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.email_confirmed_at := coalesce(new.email_confirmed_at, now());
  return new;
end;
$$;

drop trigger if exists on_auth_user_auto_confirm on auth.users;
create trigger on_auth_user_auto_confirm
  before insert on auth.users
  for each row execute function public.auto_confirm_email();

-- ---------------------------------------------------------------------------
-- Security helpers
-- ---------------------------------------------------------------------------

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  );
$$;

create or replace function public.my_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select p.role from public.profiles p where p.id = auth.uid();
$$;

create or replace function public.my_company_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select c.id from public.companies c where c.owner_id = auth.uid() limit 1;
$$;

-- ---------------------------------------------------------------------------
-- Wallet + ledger internals
-- ---------------------------------------------------------------------------

create or replace function public.ensure_wallet(
  p_owner_type text,
  p_owner_id uuid,
  p_currency text
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  wid uuid;
begin
  insert into public.wallets (owner_type, owner_id, currency)
  values (p_owner_type, p_owner_id, p_currency)
  on conflict (owner_type, owner_id, currency) do update
    set updated_at = now()
  returning id into wid;
  return wid;
end;
$$;

create or replace function public.notify_user(
  p_user_id uuid,
  p_type text,
  p_payload jsonb,
  p_ref_type text default null,
  p_ref_id uuid default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.notifications (user_id, type, payload, ref_type, ref_id)
  values (p_user_id, p_type, coalesce(p_payload, '{}'::jsonb), p_ref_type, p_ref_id);
end;
$$;

create or replace function public.release_reservation(p_wallet_id uuid, p_amount numeric, p_ref uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  w public.wallets%rowtype;
begin
  select * into w from public.wallets where id = p_wallet_id for update;
  if not found then
    raise exception 'wallet_not_found';
  end if;
  if w.reserved_balance < p_amount then
    raise exception 'insufficient_reserved';
  end if;
  update public.wallets
    set reserved_balance = reserved_balance - p_amount,
        available_balance = available_balance + p_amount
    where id = p_wallet_id;
  insert into public.ledger_entries (wallet_id, type, amount, currency, ref_type, ref_id, created_by)
  values (p_wallet_id, 'release', p_amount, w.currency, 'exchange_request', p_ref, auth.uid());
end;
$$;

create or replace function public.expire_stale_requests()
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  r public.exchange_requests%rowtype;
  wid uuid;
begin
  for r in
    select * from public.exchange_requests
    where status = 'pending' and expires_at < now()
    for update skip locked
  loop
    wid := public.ensure_wallet('user', r.client_id, r.from_currency);
    perform public.release_reservation(wid, r.from_amount, r.id);
    update public.exchange_requests set status = 'expired', decided_at = now() where id = r.id;
  end loop;
end;
$$;

-- ---------------------------------------------------------------------------
-- Public RPCs
-- ---------------------------------------------------------------------------

create or replace function public.deposit_funds(
  p_currency text,
  p_amount numeric,
  p_for_company boolean default false
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  oid uuid;
  otype text;
  wid uuid;
begin
  if uid is null then
    raise exception 'not_authenticated';
  end if;
  if p_amount is null or p_amount <= 0 then
    raise exception 'invalid_amount';
  end if;
  if not exists (select 1 from public.currencies c where c.code = p_currency and c.is_active) then
    raise exception 'invalid_currency';
  end if;

  if p_for_company then
    oid := public.my_company_id();
    if oid is null then
      raise exception 'no_company';
    end if;
    otype := 'company';
  else
    oid := uid;
    otype := 'user';
  end if;

  wid := public.ensure_wallet(otype, oid, p_currency);
  update public.wallets
    set available_balance = available_balance + p_amount
    where id = wid;
  insert into public.ledger_entries (wallet_id, type, amount, currency, ref_type, created_by, note)
  values (wid, 'deposit', p_amount, p_currency, 'manual', uid, 'manual_deposit');
  return wid;
end;
$$;

create or replace function public.withdraw_funds(
  p_currency text,
  p_amount numeric,
  p_for_company boolean default false
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  oid uuid;
  otype text;
  wid uuid;
  avail numeric;
begin
  if uid is null then
    raise exception 'not_authenticated';
  end if;
  if p_amount is null or p_amount <= 0 then
    raise exception 'invalid_amount';
  end if;

  if p_for_company then
    oid := public.my_company_id();
    if oid is null then
      raise exception 'no_company';
    end if;
    otype := 'company';
  else
    oid := uid;
    otype := 'user';
  end if;

  wid := public.ensure_wallet(otype, oid, p_currency);
  select available_balance into avail from public.wallets where id = wid for update;
  if avail < p_amount then
    raise exception 'insufficient_funds';
  end if;
  update public.wallets
    set available_balance = available_balance - p_amount
    where id = wid;
  insert into public.ledger_entries (wallet_id, type, amount, currency, ref_type, created_by, note)
  values (wid, 'withdraw', p_amount, p_currency, 'manual', uid, 'manual_withdraw');
  return wid;
end;
$$;

create or replace function public.quote_exchange(
  p_company_id uuid,
  p_from text,
  p_to text,
  p_from_amount numeric
)
returns table (
  rate numeric,
  rate_side text,
  to_amount numeric,
  quote_unit int
)
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  r public.company_rates%rowtype;
  unit int;
  fx text;
begin
  if p_from = p_to then
    raise exception 'same_currency';
  end if;
  if p_from_amount is null or p_from_amount <= 0 then
    raise exception 'invalid_amount';
  end if;
  if p_from <> 'GEL' and p_to <> 'GEL' then
    raise exception 'gel_required';
  end if;

  fx := case when p_from = 'GEL' then p_to else p_from end;

  select * into r
  from public.company_rates
  where company_id = p_company_id
    and base_currency = 'GEL'
    and quote_currency = fx
    and is_active = true;

  if not found then
    raise exception 'rate_not_found';
  end if;

  select c.quote_unit into unit from public.currencies c where c.code = fx;
  unit := coalesce(unit, 1);

  -- Limits are in the foreign currency (quote), not GEL.
  declare
    fx_amount numeric;
    min_ok numeric;
    max_ok numeric;
  begin
    if p_from <> 'GEL' then
      fx_amount := p_from_amount;
    else
      fx_amount := p_from_amount * unit / nullif(r.sell_rate, 0);
    end if;
    min_ok := case when r.min_amount is not null and r.min_amount > 0 then r.min_amount end;
    max_ok := case when r.max_amount is not null and r.max_amount > 0 then r.max_amount end;
    if min_ok is not null and max_ok is not null and min_ok > max_ok then
      min_ok := null;
      max_ok := null;
    end if;
    if min_ok is not null and fx_amount < min_ok then
      raise exception 'below_minimum';
    end if;
    if max_ok is not null and fx_amount > max_ok then
      raise exception 'above_maximum';
    end if;
  end;

  if p_from <> 'GEL' then
    -- client sells FX, company buys
    return query select r.buy_rate, 'buy'::text, round(p_from_amount * r.buy_rate / unit, 4), unit;
  else
    -- client buys FX with GEL, company sells
    return query select r.sell_rate, 'sell'::text, round(p_from_amount * unit / r.sell_rate, 4), unit;
  end if;
end;
$$;

create or replace function public.create_exchange_request(
  p_company_id uuid,
  p_from text,
  p_to text,
  p_from_amount numeric,
  p_client_note text default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  q record;
  wid uuid;
  avail numeric;
  req_id uuid;
  company_owner uuid;
  company_status text;
begin
  perform public.expire_stale_requests();

  if uid is null then
    raise exception 'not_authenticated';
  end if;
  if public.my_role() <> 'client' then
    raise exception 'clients_only';
  end if;

  select c.owner_id, c.status into company_owner, company_status
  from public.companies c where c.id = p_company_id;
  if company_owner is null then
    raise exception 'company_not_found';
  end if;
  if company_status <> 'approved' then
    raise exception 'company_not_approved';
  end if;

  select * into q from public.quote_exchange(p_company_id, p_from, p_to, p_from_amount);
  if q.to_amount <= 0 then
    raise exception 'invalid_quote';
  end if;

  wid := public.ensure_wallet('user', uid, p_from);
  select available_balance into avail from public.wallets where id = wid for update;
  if avail < p_from_amount then
    raise exception 'insufficient_funds';
  end if;

  update public.wallets
    set available_balance = available_balance - p_from_amount,
        reserved_balance = reserved_balance + p_from_amount
    where id = wid;

  insert into public.exchange_requests (
    client_id, company_id, from_currency, to_currency,
    from_amount, to_amount, rate_used, rate_side, client_note
  ) values (
    uid, p_company_id, p_from, p_to,
    p_from_amount, q.to_amount, q.rate, q.rate_side, nullif(trim(p_client_note), '')
  ) returning id into req_id;

  insert into public.ledger_entries (wallet_id, type, amount, currency, ref_type, ref_id, created_by)
  values (wid, 'reserve', p_from_amount, p_from, 'exchange_request', req_id, uid);

  perform public.notify_user(
    company_owner,
    'exchange_requested',
    jsonb_build_object('from', p_from, 'to', p_to, 'from_amount', p_from_amount, 'to_amount', q.to_amount),
    'exchange_request',
    req_id
  );

  return req_id;
end;
$$;

create or replace function public.cancel_exchange_request(p_request_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  r public.exchange_requests%rowtype;
  wid uuid;
  company_owner uuid;
begin
  perform public.expire_stale_requests();
  if uid is null then
    raise exception 'not_authenticated';
  end if;

  select * into r from public.exchange_requests where id = p_request_id for update;
  if not found then
    raise exception 'not_found';
  end if;
  if r.client_id <> uid then
    raise exception 'forbidden';
  end if;
  if r.status <> 'pending' then
    raise exception 'not_pending';
  end if;

  wid := public.ensure_wallet('user', r.client_id, r.from_currency);
  perform public.release_reservation(wid, r.from_amount, r.id);
  update public.exchange_requests
    set status = 'cancelled', decided_at = now(), decided_by = uid
    where id = r.id;

  select owner_id into company_owner from public.companies where id = r.company_id;
  perform public.notify_user(
    company_owner,
    'exchange_cancelled',
    jsonb_build_object('request_id', r.id),
    'exchange_request',
    r.id
  );
end;
$$;

create or replace function public.decide_exchange(
  p_request_id uuid,
  p_accept boolean,
  p_note text default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  r public.exchange_requests%rowtype;
  company_owner uuid;
  client_from uuid;
  client_to uuid;
  company_from uuid;
  company_to uuid;
  company_avail numeric;
begin
  perform public.expire_stale_requests();
  if uid is null then
    raise exception 'not_authenticated';
  end if;

  select * into r from public.exchange_requests where id = p_request_id for update;
  if not found then
    raise exception 'not_found';
  end if;
  if r.status <> 'pending' then
    raise exception 'not_pending';
  end if;

  select c.owner_id into company_owner from public.companies c where c.id = r.company_id;
  if company_owner <> uid and not public.is_admin() then
    raise exception 'forbidden';
  end if;

  if not p_accept then
    client_from := public.ensure_wallet('user', r.client_id, r.from_currency);
    perform public.release_reservation(client_from, r.from_amount, r.id);
    update public.exchange_requests
      set status = 'rejected',
          company_note = nullif(trim(p_note), ''),
          decided_at = now(),
          decided_by = uid
      where id = r.id;
    perform public.notify_user(
      r.client_id,
      'exchange_rejected',
      jsonb_build_object('request_id', r.id, 'note', coalesce(p_note, '')),
      'exchange_request',
      r.id
    );
    return;
  end if;

  company_to := public.ensure_wallet('company', r.company_id, r.to_currency);
  select available_balance into company_avail from public.wallets where id = company_to for update;
  if company_avail < r.to_amount then
    raise exception 'company_insufficient_funds';
  end if;

  client_from := public.ensure_wallet('user', r.client_id, r.from_currency);
  perform 1 from public.wallets where id = client_from for update;
  if (select reserved_balance from public.wallets where id = client_from) < r.from_amount then
    raise exception 'insufficient_reserved';
  end if;

  update public.wallets
    set reserved_balance = reserved_balance - r.from_amount
    where id = client_from;
  insert into public.ledger_entries (wallet_id, type, amount, currency, ref_type, ref_id, created_by)
  values (client_from, 'exchange_debit', r.from_amount, r.from_currency, 'exchange_request', r.id, uid);

  client_to := public.ensure_wallet('user', r.client_id, r.to_currency);
  update public.wallets
    set available_balance = available_balance + r.to_amount
    where id = client_to;
  insert into public.ledger_entries (wallet_id, type, amount, currency, ref_type, ref_id, created_by)
  values (client_to, 'exchange_credit', r.to_amount, r.to_currency, 'exchange_request', r.id, uid);

  update public.wallets
    set available_balance = available_balance - r.to_amount
    where id = company_to;
  insert into public.ledger_entries (wallet_id, type, amount, currency, ref_type, ref_id, created_by)
  values (company_to, 'exchange_debit', r.to_amount, r.to_currency, 'exchange_request', r.id, uid);

  company_from := public.ensure_wallet('company', r.company_id, r.from_currency);
  update public.wallets
    set available_balance = available_balance + r.from_amount
    where id = company_from;
  insert into public.ledger_entries (wallet_id, type, amount, currency, ref_type, ref_id, created_by)
  values (company_from, 'exchange_credit', r.from_amount, r.from_currency, 'exchange_request', r.id, uid);

  update public.exchange_requests
    set status = 'confirmed',
        company_note = nullif(trim(p_note), ''),
        decided_at = now(),
        decided_by = uid
    where id = r.id;

  perform public.notify_user(
    r.client_id,
    'exchange_confirmed',
    jsonb_build_object('request_id', r.id),
    'exchange_request',
    r.id
  );
end;
$$;

create or replace function public.admin_set_company_status(
  p_company_id uuid,
  p_status text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  owner uuid;
begin
  if not public.is_admin() then
    raise exception 'forbidden';
  end if;
  if p_status not in ('pending', 'approved', 'rejected', 'suspended') then
    raise exception 'invalid_status';
  end if;
  update public.companies
    set status = p_status,
        verified_at = case when p_status = 'approved' then now() else verified_at end
    where id = p_company_id
    returning owner_id into owner;
  if owner is null then
    raise exception 'not_found';
  end if;
  if p_status = 'approved' then
    perform public.notify_user(
      owner,
      'company_approved',
      jsonb_build_object('company_id', p_company_id),
      'company',
      p_company_id
    );
  end if;
end;
$$;

create or replace function public.admin_set_user_role(
  p_user_id uuid,
  p_role text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'forbidden';
  end if;
  if p_role not in ('client', 'company', 'admin') then
    raise exception 'invalid_role';
  end if;
  update public.profiles set role = p_role where id = p_user_id;
end;
$$;

-- ---------------------------------------------------------------------------
-- Views
-- ---------------------------------------------------------------------------

create or replace view public.public_rates
with (security_invoker = true) as
select
  r.id,
  r.company_id,
  r.base_currency,
  r.quote_currency,
  r.buy_rate,
  r.sell_rate,
  r.min_amount,
  r.max_amount,
  r.is_active,
  r.updated_at,
  c.slug,
  c.name_ka,
  c.name_en,
  c.name_ru,
  c.city_ka,
  c.city_en,
  c.city_ru,
  c.status as company_status
from public.company_rates r
join public.companies c on c.id = r.company_id
where c.status = 'approved' and r.is_active = true;

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------

alter table public.profiles enable row level security;
alter table public.companies enable row level security;
alter table public.currencies enable row level security;
alter table public.wallets enable row level security;
alter table public.ledger_entries enable row level security;
alter table public.company_rates enable row level security;
alter table public.exchange_requests enable row level security;
alter table public.notifications enable row level security;
alter table public.site_settings enable row level security;
alter table public.contact_messages enable row level security;
alter table public.translations enable row level security;

-- profiles
drop policy if exists profiles_select on public.profiles;
create policy profiles_select on public.profiles for select
  to authenticated
  using (
    id = auth.uid()
    or public.is_admin()
    or exists (
      select 1
      from public.exchange_requests r
      join public.companies c on c.id = r.company_id
      where r.status = 'confirmed'
        and (
          (r.client_id = auth.uid() and c.owner_id = profiles.id)
          or (c.owner_id = auth.uid() and r.client_id = profiles.id)
        )
    )
  );

drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own on public.profiles for update
  to authenticated
  using (id = auth.uid() or public.is_admin())
  with check (
    (id = auth.uid() and role = public.my_role())
    or public.is_admin()
  );

drop policy if exists profiles_insert_own on public.profiles;
create policy profiles_insert_own on public.profiles for insert
  to authenticated
  with check (id = auth.uid());

-- companies
drop policy if exists companies_select on public.companies;
create policy companies_select on public.companies for select
  to anon, authenticated
  using (status = 'approved' or owner_id = auth.uid() or public.is_admin());

drop policy if exists companies_update_own on public.companies;
create policy companies_update_own on public.companies for update
  to authenticated
  using (owner_id = auth.uid() or public.is_admin())
  with check (owner_id = auth.uid() or public.is_admin());

drop policy if exists companies_insert_own on public.companies;
create policy companies_insert_own on public.companies for insert
  to authenticated
  with check (owner_id = auth.uid());

-- currencies
drop policy if exists currencies_read on public.currencies;
create policy currencies_read on public.currencies for select
  to anon, authenticated
  using (true);

drop policy if exists currencies_admin on public.currencies;
create policy currencies_admin on public.currencies for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- wallets
drop policy if exists wallets_select on public.wallets;
create policy wallets_select on public.wallets for select
  to authenticated
  using (
    public.is_admin()
    or (owner_type = 'user' and owner_id = auth.uid())
    or (owner_type = 'company' and owner_id = public.my_company_id())
  );

-- ledger
drop policy if exists ledger_select on public.ledger_entries;
create policy ledger_select on public.ledger_entries for select
  to authenticated
  using (
    public.is_admin()
    or exists (
      select 1 from public.wallets w
      where w.id = ledger_entries.wallet_id
        and (
          (w.owner_type = 'user' and w.owner_id = auth.uid())
          or (w.owner_type = 'company' and w.owner_id = public.my_company_id())
        )
    )
  );

-- rates
drop policy if exists rates_select on public.company_rates;
create policy rates_select on public.company_rates for select
  to anon, authenticated
  using (
    public.is_admin()
    or company_id = public.my_company_id()
    or exists (
      select 1 from public.companies c
      where c.id = company_rates.company_id and c.status = 'approved'
    )
  );

drop policy if exists rates_write on public.company_rates;
create policy rates_write on public.company_rates for all
  to authenticated
  using (company_id = public.my_company_id() or public.is_admin())
  with check (company_id = public.my_company_id() or public.is_admin());

-- requests
drop policy if exists requests_select on public.exchange_requests;
create policy requests_select on public.exchange_requests for select
  to authenticated
  using (
    client_id = auth.uid()
    or company_id = public.my_company_id()
    or public.is_admin()
  );

-- notifications
drop policy if exists notifications_select on public.notifications;
create policy notifications_select on public.notifications for select
  to authenticated
  using (user_id = auth.uid() or public.is_admin());

drop policy if exists notifications_update on public.notifications;
create policy notifications_update on public.notifications for update
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- settings / translations
drop policy if exists settings_read on public.site_settings;
create policy settings_read on public.site_settings for select
  to anon, authenticated
  using (true);

drop policy if exists settings_admin on public.site_settings;
create policy settings_admin on public.site_settings for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists translations_read on public.translations;
create policy translations_read on public.translations for select
  to anon, authenticated
  using (true);

drop policy if exists translations_admin on public.translations;
create policy translations_admin on public.translations for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists contact_insert on public.contact_messages;
create policy contact_insert on public.contact_messages for insert
  to anon, authenticated
  with check (true);

drop policy if exists contact_admin on public.contact_messages;
create policy contact_admin on public.contact_messages for select
  to authenticated
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- Grants
-- ---------------------------------------------------------------------------

grant usage on schema public to anon, authenticated;

grant select on public.profiles to authenticated;
grant insert, update on public.profiles to authenticated;
grant select on public.companies to anon, authenticated;
grant insert, update on public.companies to authenticated;
grant select on public.currencies to anon, authenticated;
grant select on public.wallets to authenticated;
grant select on public.ledger_entries to authenticated;
grant select on public.company_rates to anon, authenticated;
grant insert, update, delete on public.company_rates to authenticated;
grant select on public.exchange_requests to authenticated;
grant select, update on public.notifications to authenticated;
grant select on public.site_settings to anon, authenticated;
grant all on public.site_settings to authenticated;
grant select on public.translations to anon, authenticated;
grant all on public.translations to authenticated;
grant insert on public.contact_messages to anon, authenticated;
grant select on public.contact_messages to authenticated;
grant select on public.public_rates to anon, authenticated;

grant execute on function public.deposit_funds(text, numeric, boolean) to authenticated;
grant execute on function public.withdraw_funds(text, numeric, boolean) to authenticated;
grant execute on function public.quote_exchange(uuid, text, text, numeric) to anon, authenticated;
grant execute on function public.create_exchange_request(uuid, text, text, numeric, text) to authenticated;
grant execute on function public.cancel_exchange_request(uuid) to authenticated;
grant execute on function public.decide_exchange(uuid, boolean, text) to authenticated;
grant execute on function public.admin_set_company_status(uuid, text) to authenticated;
grant execute on function public.admin_set_user_role(uuid, text) to authenticated;
grant execute on function public.expire_stale_requests() to authenticated;
grant execute on function public.is_admin() to authenticated;
grant execute on function public.my_role() to authenticated;
grant execute on function public.my_company_id() to authenticated;

-- ---------------------------------------------------------------------------
-- Realtime
-- ---------------------------------------------------------------------------

do $$
begin
  begin
    alter publication supabase_realtime add table public.notifications;
  exception when duplicate_object then null;
  end;
  begin
    alter publication supabase_realtime add table public.exchange_requests;
  exception when duplicate_object then null;
  end;
end;
$$;

-- ---------------------------------------------------------------------------
-- Seed
-- ---------------------------------------------------------------------------

insert into public.currencies (code, name_ka, name_en, name_ru, symbol, decimals, quote_unit, sort_order) values
  ('GEL', 'ლარი', 'Georgian Lari', 'Лари', '₾', 2, 1, 0),
  ('USD', 'აშშ დოლარი', 'US Dollar', 'Доллар США', '$', 2, 1, 1),
  ('EUR', 'ევრო', 'Euro', 'Евро', '€', 2, 1, 2),
  ('GBP', 'ფუნტი სტერლინგი', 'British Pound', 'Фунт стерлингов', '£', 2, 1, 3),
  ('RUB', 'რუსული რუბლი', 'Russian Ruble', 'Российский рубль', '₽', 2, 100, 4),
  ('TRY', 'თურქული ლირა', 'Turkish Lira', 'Турецкая лира', '₺', 2, 1, 5),
  ('AED', 'დირჰამი', 'UAE Dirham', 'Дирхам', 'د.إ', 2, 1, 6),
  ('CHF', 'შვეიცარიული ფრანკი', 'Swiss Franc', 'Швейцарский франк', 'CHF', 2, 1, 7)
on conflict (code) do update set
  name_ka = excluded.name_ka,
  name_en = excluded.name_en,
  name_ru = excluded.name_ru,
  symbol = excluded.symbol,
  quote_unit = excluded.quote_unit,
  sort_order = excluded.sort_order;

insert into public.site_settings (id) values (1) on conflict (id) do nothing;
