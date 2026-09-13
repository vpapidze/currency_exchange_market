import { deleteRateAction, upsertRateAction } from "@/app/actions/company";
import { getMessages } from "@/i18n/messages";
import { requireRole } from "@/lib/auth";
import { getCompanyRates, getCurrencies } from "@/lib/data";
import { readLocale } from "@/lib/locale-params";
import { formatRate } from "@/lib/money";

export default async function CompanyRatesPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const locale = await readLocale(params);
  const { company } = await requireRole(locale, ["company"]);
  const q = await searchParams;
  const m = getMessages(locale);
  const [rates, currencies] = await Promise.all([
    company ? getCompanyRates(company.id) : [],
    getCurrencies(),
  ]);
  const fx = currencies.filter((c) => c.code !== "GEL");

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl">{m.company.ratesTitle}</h1>
      {q.saved && <p className="text-sm text-success">{m.company.saved}</p>}
      {q.error && <p className="text-sm text-danger">{q.error}</p>}

      <div className="divide-y divide-border rounded-2xl border border-border bg-paper">
        {rates.map((r) => (
          <div key={r.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 text-sm">
            <span className="font-mono">{r.quote_currency}/GEL</span>
            <span>
              {m.rates.buy} {formatRate(r.buy_rate)} · {m.rates.sell} {formatRate(r.sell_rate)}
            </span>
            <span>{r.is_active ? m.company.active : "—"}</span>
            <form action={deleteRateAction}>
              <input type="hidden" name="locale" value={locale} />
              <input type="hidden" name="id" value={r.id} />
              <button className="text-danger">{m.common.cancel}</button>
            </form>
          </div>
        ))}
      </div>

      <form action={upsertRateAction} className="grid gap-3 rounded-2xl border border-border bg-paper p-5 sm:grid-cols-2">
        <input type="hidden" name="locale" value={locale} />
        <label className="text-sm">
          FX
          <select name="quote_currency" className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2">
            {fx.map((c) => (
              <option key={c.code} value={c.code}>
                {c.code}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          {m.company.buyRate}
          <input name="buy_rate" required step="0.0001" className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2" />
        </label>
        <label className="text-sm">
          {m.company.sellRate}
          <input name="sell_rate" required step="0.0001" className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2" />
        </label>
        <label className="text-sm">
          {m.company.min}
          <input name="min_amount" step="0.01" className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2" />
        </label>
        <label className="text-sm">
          {m.company.max}
          <input name="max_amount" step="0.01" className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2" />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="is_active" value="1" defaultChecked />
          {m.company.active}
        </label>
        <button type="submit" className="rounded-full bg-pine py-2 text-white sm:col-span-2">
          {m.company.addRate}
        </button>
      </form>
    </div>
  );
}
