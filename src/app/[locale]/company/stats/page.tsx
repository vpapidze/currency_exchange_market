import { getMessages } from "@/i18n/messages";
import { requireRole } from "@/lib/auth";
import { getRequestStats } from "@/lib/data";
import { readLocale } from "@/lib/locale-params";

export default async function CompanyStatsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await readLocale(params);
  const { company } = await requireRole(locale, ["company"]);
  const m = getMessages(locale);
  const stats = company
    ? await getRequestStats({ companyId: company.id })
    : { total: 0, confirmed: 0, pending: 0, rejected: 0 };

  const cards = [
    [m.stats.requests, stats.total],
    [m.stats.confirmed, stats.confirmed],
    [m.stats.pending, stats.pending],
    [m.stats.rejected, stats.rejected],
  ];

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl">{m.stats.title}</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-border bg-paper p-5">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="num mt-2 text-3xl">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
