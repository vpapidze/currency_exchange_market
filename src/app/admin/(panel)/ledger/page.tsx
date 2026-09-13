import { adminListLedger } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export default async function AdminLedgerPage() {
  const rows = await adminListLedger();
  return (
    <div className="space-y-4">
      <h1 className="font-display text-3xl">ლეჯერი</h1>
      <div className="divide-y divide-border rounded-2xl border border-border bg-paper">
        {rows.map((r) => (
          <div key={r.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 text-sm">
            <span>{r.type}</span>
            <span className="num">
              {r.amount} {r.currency}
            </span>
            <span className="text-muted-foreground">{formatDate(r.created_at, "ka")}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
