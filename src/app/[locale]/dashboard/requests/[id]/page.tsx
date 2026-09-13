import { notFound } from "next/navigation";
import { cancelExchangeAction } from "@/app/actions/exchange";
import { StatusBadge } from "@/components/StatusBadge";
import { getMessages } from "@/i18n/messages";
import { requireRole } from "@/lib/auth";
import { getCompanyById, getRequest } from "@/lib/data";
import { readLocale } from "@/lib/locale-params";
import { formatMoney } from "@/lib/money";
import { formatDate, pickLocalized, requestCode } from "@/lib/utils";

export default async function ClientRequestDetail({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const locale = await readLocale(params);
  const { profile } = await requireRole(locale, ["client"]);
  const { error } = await searchParams;
  const m = getMessages(locale);
  const request = await getRequest(id);
  if (!request || request.client_id !== profile!.id) notFound();
  const company = await getCompanyById(request.company_id);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl">{requestCode(request.id)}</h1>
        <StatusBadge status={request.status} messages={m} />
      </div>
      {error && <p className="text-sm text-danger">{error}</p>}
      <div className="rounded-2xl border border-border bg-paper p-6 text-sm">
        <p>
          {m.wizard.youGive}: {formatMoney(request.from_amount, request.from_currency, locale)}
        </p>
        <p className="mt-2">
          {m.wizard.youGet}: {formatMoney(request.to_amount, request.to_currency, locale)}
        </p>
        <p className="mt-2">
          {m.wizard.rate}: {request.rate_used} ({request.rate_side})
        </p>
        <p className="mt-2 text-muted-foreground">
          {m.request.created}: {formatDate(request.created_at, locale)}
        </p>
        <p className="text-muted-foreground">
          {m.request.expires}: {formatDate(request.expires_at, locale)}
        </p>
      </div>
      {request.status === "confirmed" && company && (
        <div className="rounded-2xl border border-leaf/30 bg-leaf/5 p-6 text-sm">
          <p className="font-medium">{m.request.details}</p>
          <p className="mt-2">
            {pickLocalized(locale, company.name_ka, company.name_en, company.name_ru)}
          </p>
          <p>{company.phone}</p>
          <p>{company.email}</p>
          <p>{pickLocalized(locale, company.address_ka, company.address_en, company.address_ru)}</p>
        </div>
      )}
      {request.status === "pending" && (
        <form action={cancelExchangeAction}>
          <input type="hidden" name="locale" value={locale} />
          <input type="hidden" name="id" value={request.id} />
          <button type="submit" className="rounded-full border border-danger px-4 py-2 text-sm text-danger">
            {m.request.cancel}
          </button>
        </form>
      )}
    </div>
  );
}
