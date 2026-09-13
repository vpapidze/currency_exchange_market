import { ExchangeWizard } from "@/components/ExchangeWizard";
import { getMessages } from "@/i18n/messages";
import { requireRole } from "@/lib/auth";
import { getPublicRates } from "@/lib/data";
import { readLocale } from "@/lib/locale-params";

export default async function ExchangePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ company?: string; from?: string; to?: string; error?: string }>;
}) {
  const locale = await readLocale(params);
  await requireRole(locale, ["client"]);
  const q = await searchParams;
  const m = getMessages(locale);
  const rates = await getPublicRates();

  return (
    <div className="space-y-4">
      <h1 className="font-display text-3xl">{m.wizard.title}</h1>
      {q.error && (
        <p className="text-sm text-danger">
          {q.error === "below_minimum" || q.error === "belowMin"
            ? m.errors.belowMin
            : q.error === "above_maximum" || q.error === "aboveMax"
              ? m.errors.aboveMax
              : q.error === "rate_not_found"
                ? m.errors.rateMissing
                : q.error === "insufficient_funds" || q.error === "insufficient"
                  ? m.errors.insufficient
                  : q.error}
        </p>
      )}
      <ExchangeWizard
        locale={locale}
        messages={m}
        rates={rates}
        initialCompanyId={q.company}
        initialFrom={q.from}
        initialTo={q.to}
      />
    </div>
  );
}
