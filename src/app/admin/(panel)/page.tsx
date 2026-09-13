import { adminListCompanies, adminListProfiles, adminListRequests } from "@/lib/data";

export default async function AdminHome() {
  const [users, companies, requests] = await Promise.all([
    adminListProfiles(),
    adminListCompanies(),
    adminListRequests(),
  ]);
  const pendingCompanies = companies.filter((c) => c.status === "pending").length;
  const pendingRequests = requests.filter((r) => r.status === "pending").length;

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl">მიმოხილვა</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["მომხმარებლები", users.length],
          ["კომპანიები", companies.length],
          ["მოლოდინში კომპანია", pendingCompanies],
          ["მოლოდინში გაცვლა", pendingRequests],
        ].map(([label, value]) => (
          <div key={String(label)} className="rounded-2xl border border-border bg-paper p-5">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="num mt-2 text-3xl">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
