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

