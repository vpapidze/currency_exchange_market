import { StatusBadge } from "@/components/StatusBadge";
import { adminListRequests } from "@/lib/data";
import { formatDate, requestCode } from "@/lib/utils";

export default async function AdminRequestsPage() {
  const rows = await adminListRequests();
  return (
    <div className="space-y-4">
      <h1 className="font-display text-3xl">ტრანზაქციები</h1>
      <div className="divide-y divide-border rounded-2xl border border-border bg-paper">
        {rows.map((r) => (
          <div key={r.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 text-sm">
            <span className="font-mono">{requestCode(r.id)}</span>
            <span>
              {r.from_amount} {r.from_currency} → {r.to_amount} {r.to_currency}
            </span>
            <span className="text-muted-foreground">{formatDate(r.created_at, "ka")}</span>
            <StatusBadge status={r.status} />
          </div>
        ))}
      </div>
    </div>
  );
}
