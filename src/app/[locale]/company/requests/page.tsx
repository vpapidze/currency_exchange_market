import Link from "next/link";
import { StatusBadge } from "@/components/StatusBadge";
import { getMessages } from "@/i18n/messages";
import { requireRole } from "@/lib/auth";
import { getRequestsForCompany } from "@/lib/data";
import { localizedPath } from "@/lib/i18n";
import { readLocale } from "@/lib/locale-params";
import { formatDate, requestCode } from "@/lib/utils";

export default async function CompanyRequestsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await readLocale(params);
  const { company } = await requireRole(locale, ["company"]);
  const m = getMessages(locale);
  const requests = company ? await getRequestsForCompany(company.id) : [];

  return (
    <div className="space-y-4">
      <h1 className="font-display text-3xl">{m.app.requests}</h1>
      <div className="divide-y divide-border rounded-2xl border border-border bg-paper">
        {requests.map((r) => (
          <Link
            key={r.id}
            href={localizedPath(locale, `/company/requests/${r.id}`)}
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
        {requests.length === 0 && (
          <p className="p-4 text-sm text-muted-foreground">{m.request.empty}</p>
        )}
      </div>
    </div>
  );
}
