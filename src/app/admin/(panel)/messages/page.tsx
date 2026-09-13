import { adminListMessages } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export default async function AdminMessagesPage() {
  const rows = await adminListMessages();
  return (
    <div className="space-y-4">
      <h1 className="font-display text-3xl">შეტყობინებები</h1>
      <div className="space-y-3">
        {rows.map((r) => (
          <article key={r.id} className="rounded-2xl border border-border bg-paper p-4 text-sm">
            <p className="font-medium">
              {r.name} · {r.email}
            </p>
            <p className="mt-2 text-muted-foreground">{r.message}</p>
            <p className="mt-2 text-xs">{formatDate(r.created_at, "ka")}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
