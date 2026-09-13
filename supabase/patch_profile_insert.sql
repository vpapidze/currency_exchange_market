-- Run if you already applied schema.sql once.
-- Lets a signed-in user create their own profile/company if the auth trigger missed it.

drop policy if exists profiles_insert_own on public.profiles;
create policy profiles_insert_own on public.profiles for insert
  to authenticated
  with check (id = auth.uid());

drop policy if exists companies_insert_own on public.companies;
create policy companies_insert_own on public.companies for insert
  to authenticated
  with check (owner_id = auth.uid());

grant insert, update on public.profiles to authenticated;
grant insert, update on public.companies to authenticated;
