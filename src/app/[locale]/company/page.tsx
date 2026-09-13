import Link from "next/link";
import { StatusBadge } from "@/components/StatusBadge";
import { getMessages } from "@/i18n/messages";
import { requireRole } from "@/lib/auth";
import { getRequestsForCompany } from "@/lib/data";
import { localizedPath } from "@/lib/i18n";
import { readLocale } from "@/lib/locale-params";
import { requestCode } from "@/lib/utils";

export default async function CompanyHome({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await readLocale(params);
  const { company } = await requireRole(locale, ["company"]);
  const m = getMessages(locale);
  const requests = company ? await getRequestsForCompany(company.id) : [];
  const pending = requests.filter((r) => r.status === "pending");
  const title = company?.name_ka?.trim() || m.app.overview;

  const nextSteps = [
    { href: "/company/rates", label: m.company.nextRates },
    { href: "/company/wallet", label: m.company.nextWallet },
    { href: "/company/profile", label: m.company.nextProfile },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl">{title}</h1>
        {company?.city_ka ? (
          <p className="mt-1 text-sm text-muted-foreground">{company.city_ka}</p>
        ) : null}
      </div>

      {!company && (
        <p className="rounded-2xl border border-gold bg-gold-soft px-4 py-3 text-sm">
          {m.company.missingCompany}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-paper p-5">
          <p className="text-sm text-muted-foreground">{m.stats.pending}</p>
          <p className="num mt-2 text-3xl">{pending.length}</p>
        </div>
        <div className="rounded-2xl border border-border bg-paper p-5">
          <p className="text-sm text-muted-foreground">{m.stats.requests}</p>
          <p className="num mt-2 text-3xl">{requests.length}</p>
        </div>
        <div className="rounded-2xl border border-border bg-paper p-5">
          <p className="text-sm text-muted-foreground">{m.request.status}</p>
          <div className="mt-2">
            <StatusBadge status={company?.status ?? "pending"} messages={m} />
          </div>
        </div>
      </div>

      <section className="rounded-2xl border border-border bg-paper p-5">
        <h2 className="font-medium">{m.company.nextTitle}</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {nextSteps.map((step) => (
            <Link
              key={step.href}
              href={localizedPath(locale, step.href)}
              className="rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm hover:border-leaf hover:text-leaf"
            >
              {step.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-paper p-5">
        <h2 className="font-medium">{m.app.requests}</h2>
        <div className="mt-4 space-y-2">
          {pending.slice(0, 6).map((r) => (
            <Link
              key={r.id}
              href={localizedPath(locale, `/company/requests/${r.id}`)}
              className="flex items-center justify-between rounded-xl bg-muted/50 px-3 py-2 text-sm"
            >
              <span className="font-mono">{requestCode(r.id)}</span>
              <span>
                {r.from_amount} {r.from_currency} → {r.to_amount} {r.to_currency}
              </span>
            </Link>
          ))}
          {pending.length === 0 && <p className="text-sm text-muted-foreground">{m.request.empty}</p>}
        </div>
      </section>
    </div>
  );
}
