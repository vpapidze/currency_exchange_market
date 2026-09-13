import { setCompanyStatusAction } from "@/app/actions/admin";
import { StatusBadge } from "@/components/StatusBadge";
import { adminListCompanies } from "@/lib/data";

export default async function AdminCompaniesPage() {
  const companies = await adminListCompanies();
  return (
    <div className="space-y-4">
      <h1 className="font-display text-3xl">კომპანიები</h1>
      <div className="divide-y divide-border rounded-2xl border border-border bg-paper">
        {companies.map((c) => (
          <div key={c.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 text-sm">
            <div>
              <p className="font-medium">{c.name_ka}</p>
              <p className="text-xs text-muted-foreground">{c.email} · {c.phone}</p>
            </div>
            <StatusBadge status={c.status} />
            <div className="flex gap-2">
              {["approved", "rejected", "suspended", "pending"].map((status) => (
                <form key={status} action={setCompanyStatusAction}>
                  <input type="hidden" name="id" value={c.id} />
                  <input type="hidden" name="status" value={status} />
                  <button className="rounded-full border border-border px-3 py-1">{status}</button>
                </form>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
