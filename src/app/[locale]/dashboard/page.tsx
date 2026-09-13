import Link from "next/link";
import { StatusBadge } from "@/components/StatusBadge";
import { getMessages } from "@/i18n/messages";
import { requireRole } from "@/lib/auth";
import { getRequestsForClient, getWallets } from "@/lib/data";
import { localizedPath } from "@/lib/i18n";
import { readLocale } from "@/lib/locale-params";
import { formatMoney } from "@/lib/money";
import { requestCode } from "@/lib/utils";

export default async function ClientHome({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await readLocale(params);
  const { profile } = await requireRole(locale, ["client"]);
  const m = getMessages(locale);
  const [wallets, requests] = await Promise.all([
    getWallets("user", profile!.id),
    getRequestsForClient(profile!.id),
  ]);

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl">{m.app.overview}</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        {wallets.slice(0, 3).map((w) => (
          <div key={w.id} className="rounded-2xl border border-border bg-paper p-5">
            <p className="text-xs text-muted-foreground">{w.currency}</p>
            <p className="num mt-2 text-2xl">{formatMoney(w.available_balance, w.currency, locale)}</p>
          </div>
        ))}
        {wallets.length === 0 && (
          <Link
            href={localizedPath(locale, "/dashboard/wallet")}
            className="rounded-2xl border border-dashed border-border p-5 text-muted-foreground"
          >
            {m.wallet.empty}
          </Link>
        )}
      </div>
      <section className="rounded-2xl border border-border bg-paper p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-medium">{m.app.requests}</h2>
          <Link href={localizedPath(locale, "/dashboard/exchange")} className="text-sm text-leaf">
            {m.app.exchange}
          </Link>
        </div>
        <div className="mt-4 space-y-3">
          {requests.slice(0, 5).map((r) => (
            <Link
              key={r.id}
              href={localizedPath(locale, `/dashboard/requests/${r.id}`)}
              className="flex items-center justify-between rounded-xl bg-muted/50 px-3 py-2 text-sm"
            >
              <span className="font-mono">{requestCode(r.id)}</span>
              <span>
                {r.from_amount} {r.from_currency} → {r.to_amount} {r.to_currency}
              </span>
              <StatusBadge status={r.status} messages={m} />
            </Link>
          ))}
          {requests.length === 0 && <p className="text-sm text-muted-foreground">{m.request.empty}</p>}
        </div>
      </section>
    </div>
  );
}
