"use client";

import { useMemo, useState } from "react";
import { createExchangeAction } from "@/app/actions/exchange";
import type { Messages } from "@/i18n/messages";
import { formatMoney, formatRate, parseAmount } from "@/lib/money";
import type { Locale } from "@/lib/i18n";
import { pickLocalized } from "@/lib/utils";
import type { PublicRate } from "@/lib/supabase/types";

export function ExchangeWizard({
  locale,
  messages,
  rates,
  initialCompanyId,
  initialFrom,
  initialTo,
}: {
  locale: Locale;
  messages: Messages;
  rates: PublicRate[];
  initialCompanyId?: string;
  initialFrom?: string;
  initialTo?: string;
}) {
  const [step, setStep] = useState(1);
  const [from, setFrom] = useState(initialFrom || "USD");
  const [to, setTo] = useState(initialTo || "GEL");
  const [amount, setAmount] = useState("100");
  const [companyId, setCompanyId] = useState(initialCompanyId || rates[0]?.company_id || "");
  const [note, setNote] = useState("");

  const pairOk = from === "GEL" || to === "GEL";
  const fx = from === "GEL" ? to : from;
  const matches = rates.filter((r) => r.quote_currency === fx && r.base_currency === "GEL");
  const selected = matches.find((r) => r.company_id === companyId) ?? matches[0];

  const quote = useMemo(() => {
    const n = parseAmount(amount);
    if (!selected || !Number.isFinite(n) || n <= 0 || !pairOk) return null;
    const unit = selected.quote_currency === "RUB" ? 100 : 1;
    if (from !== "GEL") {
      const rate = Number(selected.buy_rate);
      return { rate, side: "buy" as const, toAmount: (n * rate) / unit, unit };
    }
    const rate = Number(selected.sell_rate);
    return { rate, side: "sell" as const, toAmount: (n * unit) / rate, unit };
  }, [amount, from, pairOk, selected]);

  const minFx =
    selected &&
    Number(selected.min_amount) > 0 &&
    (selected.max_amount == null ||
      Number(selected.min_amount) <= Number(selected.max_amount))
      ? Number(selected.min_amount)
      : null;
  const fxAmount = from !== "GEL" ? parseAmount(amount) : (quote?.toAmount ?? NaN);
  const belowMin = minFx != null && Number.isFinite(fxAmount) && fxAmount < minFx;

  return (
    <div className="rounded-3xl border border-border bg-paper p-6">
      <div className="mb-6 flex gap-2 text-xs uppercase tracking-wider text-muted-foreground">
        <span className={step === 1 ? "text-leaf" : ""}>1. {messages.wizard.step1}</span>
        <span className={step === 2 ? "text-leaf" : ""}>2. {messages.wizard.step2}</span>
        <span className={step === 3 ? "text-leaf" : ""}>3. {messages.wizard.step3}</span>
      </div>

      {step === 1 && (
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="text-sm">
            <span className="text-muted-foreground">{messages.wizard.from}</span>
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2"
            >
              {["GEL", "USD", "EUR", "GBP", "RUB", "TRY", "AED", "CHF"].map((c) => (
                <option key={c} value={c} disabled={c === to}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm">
            <span className="text-muted-foreground">{messages.wizard.to}</span>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2"
            >
              {["GEL", "USD", "EUR", "GBP", "RUB", "TRY", "AED", "CHF"].map((c) => (
                <option key={c} value={c} disabled={c === from}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm">
            <span className="text-muted-foreground">{messages.wizard.amount}</span>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2"
            />
          </label>
          {!pairOk && <p className="sm:col-span-3 text-sm text-danger">{messages.wizard.gelOnly}</p>}
        </div>
      )}

      {step === 2 && (
        <div className="space-y-3">
          {matches.length === 0 && (
            <p className="text-sm text-muted-foreground">{messages.rates.empty}</p>
          )}
          {matches.map((r) => (
            <button
              type="button"
              key={r.id}
              onClick={() => setCompanyId(r.company_id)}
              className={`w-full rounded-2xl border px-4 py-3 text-left ${
                companyId === r.company_id ? "border-leaf bg-leaf/5" : "border-border"
              }`}
            >
              <p className="font-medium">
                {pickLocalized(locale, r.name_ka, r.name_en, r.name_ru)}
              </p>
              <p className="num text-sm text-muted-foreground">
                {messages.rates.buy} {formatRate(r.buy_rate)} · {messages.rates.sell}{" "}
                {formatRate(r.sell_rate)}
                {Number(r.min_amount) > 0 &&
                (r.max_amount == null || Number(r.min_amount) <= Number(r.max_amount))
                  ? ` · ${messages.company.min} ${r.min_amount} ${r.quote_currency}`
                  : ""}
              </p>
            </button>
          ))}
        </div>
      )}

      {step === 3 && selected && quote && (
        <form action={createExchangeAction} className="space-y-4">
          <input type="hidden" name="locale" value={locale} />
          <input type="hidden" name="company_id" value={selected.company_id} />
          <input type="hidden" name="from_currency" value={from} />
          <input type="hidden" name="to_currency" value={to} />
          <input type="hidden" name="from_amount" value={amount} />
          <input type="hidden" name="client_note" value={note} />
          <div className="rounded-2xl bg-muted p-4">
            <p className="text-sm text-muted-foreground">{messages.wizard.review}</p>
            <p className="mt-2 font-medium">
              {pickLocalized(locale, selected.name_ka, selected.name_en, selected.name_ru)}
            </p>
            <p className="num mt-3">
              {messages.wizard.youGive}: {formatMoney(amount, from, locale)}
            </p>
            <p className="num mt-1">
              {messages.wizard.youGet}: {formatMoney(quote.toAmount, to, locale)}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {messages.wizard.rate}: {formatRate(quote.rate, quote.unit)}
            </p>
            {belowMin && (
              <p className="mt-3 text-sm text-danger">
                {messages.errors.belowMin} ({minFx} {selected.quote_currency})
              </p>
            )}
          </div>
          <label className="block text-sm">
            <span className="text-muted-foreground">{messages.wizard.note}</span>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2"
              rows={3}
            />
          </label>
          <button
            type="submit"
            disabled={belowMin}
            className="w-full rounded-full bg-pine py-3 text-white disabled:opacity-40"
          >
            {messages.wizard.submit}
          </button>
        </form>
      )}

      <div className="mt-6 flex justify-between">
        <button
          type="button"
          disabled={step === 1}
          onClick={() => setStep((s) => s - 1)}
          className="text-sm text-muted-foreground disabled:opacity-40"
        >
          {messages.wizard.back}
        </button>
        {step < 3 && (
          <button
            type="button"
            disabled={!pairOk || (step === 2 && !selected)}
            onClick={() => {
              if (step === 1 && selected) setCompanyId(selected.company_id);
              setStep((s) => s + 1);
            }}
            className="rounded-full bg-pine px-5 py-2 text-sm text-white disabled:opacity-40"
          >
            {messages.wizard.next}
          </button>
        )}
      </div>
    </div>
  );
}
