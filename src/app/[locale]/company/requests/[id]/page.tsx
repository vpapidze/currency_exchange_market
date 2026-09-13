import { notFound } from "next/navigation";
import { decideExchangeAction } from "@/app/actions/exchange";
import { StatusBadge } from "@/components/StatusBadge";
import { getMessages } from "@/i18n/messages";
import { requireRole } from "@/lib/auth";
import { getRequest } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";
import { readLocale } from "@/lib/locale-params";
import { formatMoney } from "@/lib/money";
import { formatDate, requestCode } from "@/lib/utils";
import type { Profile } from "@/lib/supabase/types";

export default async function CompanyRequestDetail({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const locale = await readLocale(params);
  const { company } = await requireRole(locale, ["company"]);
  const { error } = await searchParams;
  const m = getMessages(locale);
  const request = await getRequest(id);
  if (!request || !company || request.company_id !== company.id) notFound();

  let client: Profile | null = null;
  if (request.status === "confirmed") {
    const supabase = await createClient();
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", request.client_id)
      .maybeSingle();
    client = data as Profile | null;
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl">{requestCode(request.id)}</h1>
        <StatusBadge status={request.status} messages={m} />
      </div>
      {error && <p className="text-sm text-danger">{error}</p>}
      <div className="rounded-2xl border border-border bg-paper p-6 text-sm">
        <p>
          {request.from_amount} {request.from_currency} → {request.to_amount} {request.to_currency}
        </p>
        <p className="mt-2">
          {m.wizard.rate}: {request.rate_used}
        </p>
        <p className="mt-2 text-muted-foreground">{formatDate(request.created_at, locale)}</p>
        <p className="num mt-3">{formatMoney(request.from_amount, request.from_currency, locale)}</p>
      </div>
      {client && (
        <div className="rounded-2xl border border-leaf/30 bg-leaf/5 p-6 text-sm">
          <p className="font-medium">{m.request.counterpart}</p>
          <p className="mt-2">{client.full_name}</p>
          <p>{client.phone}</p>
        </div>
      )}
      {request.status === "pending" && (
        <div className="grid gap-4 md:grid-cols-2">
          <form action={decideExchangeAction} className="rounded-2xl border border-border bg-paper p-5">
            <input type="hidden" name="locale" value={locale} />
            <input type="hidden" name="id" value={request.id} />
            <input type="hidden" name="accept" value="1" />
            <label className="block text-sm">
              {m.request.reason}
              <textarea name="note" className="mt-1 w-full rounded-xl border border-border px-3 py-2" />
            </label>
            <button className="mt-3 w-full rounded-full bg-leaf py-2 text-white">{m.request.confirm}</button>
          </form>
          <form action={decideExchangeAction} className="rounded-2xl border border-border bg-paper p-5">
            <input type="hidden" name="locale" value={locale} />
            <input type="hidden" name="id" value={request.id} />
            <input type="hidden" name="accept" value="0" />
            <label className="block text-sm">
              {m.request.reason}
              <textarea name="note" className="mt-1 w-full rounded-xl border border-border px-3 py-2" />
            </label>
            <button className="mt-3 w-full rounded-full border border-danger py-2 text-danger">
              {m.request.reject}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
