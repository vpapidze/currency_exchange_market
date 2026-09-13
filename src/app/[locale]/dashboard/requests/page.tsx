import Link from "next/link";
import { StatusBadge } from "@/components/StatusBadge";
import { getMessages } from "@/i18n/messages";
import { requireRole } from "@/lib/auth";
import { getRequestsForClient } from "@/lib/data";
import { localizedPath } from "@/lib/i18n";
import { readLocale } from "@/lib/locale-params";
import { formatDate, requestCode } from "@/lib/utils";

export default async function ClientRequestsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await readLocale(params);
  const { profile } = await requireRole(locale, ["client"]);
  const m = getMessages(locale);
  const requests = await getRequestsForClient(profile!.id);

  return (
    <div className="space-y-4">
      <h1 className="font-display text-3xl">{m.app.requests}</h1>
      {requests.length === 0 ? (
        <p className="text-muted-foreground">{m.request.empty}</p>
      ) : (
        <div className="divide-y divide-border rounded-2xl border border-border bg-paper">
          {requests.map((r) => (
            <Link
              key={r.id}
              href={localizedPath(locale, `/dashboard/requests/${r.id}`)}
              className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 text-sm"
            >
              <span className="font-mono">{requestCode(r.id)}</span>
              <span>
                {r.from_amount} {r.from_currency} → {r.to_amount} {r.to_currency}
              </span>
              <span className="text-muted-foreground">{formatDate(r.created_at, locale)}</span>
              <StatusBadge status={r.status} messages={m} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
