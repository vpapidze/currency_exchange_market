import { getMessages } from "@/i18n/messages";
import { requireRole } from "@/lib/auth";
import { getRequestStats, getWallets } from "@/lib/data";
import { readLocale } from "@/lib/locale-params";

export default async function ClientStatsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await readLocale(params);
  const { profile } = await requireRole(locale, ["client"]);
  const m = getMessages(locale);
  const [stats, wallets] = await Promise.all([
    getRequestStats({ clientId: profile!.id }),
    getWallets("user", profile!.id),
  ]);

  const cards = [
    [m.stats.requests, stats.total],
    [m.stats.confirmed, stats.confirmed],
    [m.stats.pending, stats.pending],
    [m.stats.rejected, stats.rejected],
    [m.stats.wallets, wallets.length],
  ];

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl">{m.stats.title}</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
