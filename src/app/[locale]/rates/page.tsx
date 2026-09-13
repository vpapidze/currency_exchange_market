import Link from "next/link";
import { RatesFilters } from "@/components/RatesFilters";
import { parseRateSort } from "@/lib/rates";
import { getMessages } from "@/i18n/messages";
import { getCurrencies, getPublicRates } from "@/lib/data";
import { localizedPath } from "@/lib/i18n";
import { readLocale } from "@/lib/locale-params";
import { pickLocalized } from "@/lib/utils";
import { formatRate } from "@/lib/money";
import type { PublicRate } from "@/lib/supabase/types";

function sortRates(rows: PublicRate[], sort: ReturnType<typeof parseRateSort>) {
  const copy = [...rows];
  copy.sort((a, b) => {
    if (sort === "sell") return Number(a.sell_rate) - Number(b.sell_rate);
    if (sort === "company") {
      return a.name_ka.localeCompare(b.name_ka, "ka");
    }
    if (sort === "updated") {
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    }
    return Number(b.buy_rate) - Number(a.buy_rate);
  });
  return copy;
}

export default async function RatesPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ fx?: string; sort?: string }>;
}) {
  const locale = await readLocale(params);
  const q = await searchParams;
  const m = getMessages(locale);
  const [rates, currencies] = await Promise.all([getPublicRates(), getCurrencies()]);
  const fxCodes = currencies.filter((c) => c.code !== "GEL").map((c) => c.code);
  const fx = fxCodes.includes(q.fx ?? "") ? (q.fx as string) : "";
  const sort = parseRateSort(q.sort);
  const filtered = sortRates(
    fx ? rates.filter((r) => r.quote_currency === fx) : rates,
    sort,
  );

  const bestBuyId = filtered.reduce<string | null>((id, r) => {
    if (!id) return r.id;
    const cur = filtered.find((x) => x.id === id)!;
    return Number(r.buy_rate) > Number(cur.buy_rate) ? r.id : id;
  }, null);
  const bestSellId = filtered.reduce<string | null>((id, r) => {
    if (!id) return r.id;
    const cur = filtered.find((x) => x.id === id)!;
    return Number(r.sell_rate) < Number(cur.sell_rate) ? r.id : id;
  }, null);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <h1 className="font-display text-5xl">{m.rates.title}</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">{m.rates.body}</p>

      <RatesFilters messages={m} codes={fxCodes} fx={fx} sort={sort} />

      {rates.length === 0 ? (
        <p className="mt-10 rounded-3xl border border-border bg-paper p-8 text-muted-foreground">
          {m.rates.empty}
        </p>
      ) : filtered.length === 0 ? (
        <p className="mt-10 rounded-3xl border border-border bg-paper p-8 text-muted-foreground">
          {m.rates.filterEmpty}
        </p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-3xl border border-border bg-paper">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-muted/60 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3">{m.rates.company}</th>
                <th className="px-4 py-3">{m.rates.city}</th>
                <th className="px-4 py-3">FX</th>
                <th className="px-4 py-3">{m.rates.buy}</th>
                <th className="px-4 py-3">{m.rates.sell}</th>
                <th className="px-4 py-3">{m.rates.updated}</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium">
                    {pickLocalized(locale, r.name_ka, r.name_en, r.name_ru)}
                  </td>
                  <td className="px-4 py-3">
                    {pickLocalized(locale, r.city_ka, r.city_en, r.city_ru)}
                  </td>
                  <td className="px-4 py-3 font-mono">{r.quote_currency}</td>
                  <td className="num px-4 py-3">
                    {formatRate(r.buy_rate)}
                    {r.id === bestBuyId && (
                      <span className="ml-2 rounded-full bg-gold-soft px-2 py-0.5 text-[10px] uppercase tracking-wider">
                        {m.rates.bestBuy}
                      </span>
                    )}
                  </td>
                  <td className="num px-4 py-3">
                    {formatRate(r.sell_rate)}
                    {r.id === bestSellId && (
                      <span className="ml-2 rounded-full bg-leaf/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-leaf">
                        {m.rates.bestSell}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-mono text-muted-foreground">
                    {r.updated_at.slice(0, 16).replace("T", " ")}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={localizedPath(
                        locale,
                        `/dashboard/exchange?company=${r.company_id}&from=${r.quote_currency}&to=GEL`,
                      )}
                      className="rounded-full bg-pine px-3 py-1.5 text-xs text-white"
                    >
                      {m.rates.exchange}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
