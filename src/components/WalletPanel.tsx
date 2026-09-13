import { depositAction, withdrawAction } from "@/app/actions/wallet";
import type { Messages } from "@/i18n/messages";
import { formatMoney } from "@/lib/money";
import type { Locale } from "@/lib/i18n";
import type { Currency, LedgerEntry, Wallet } from "@/lib/supabase/types";
import { formatDate } from "@/lib/utils";

export function WalletPanel({
  locale,
  messages,
  wallets,
  currencies,
  ledger,
  forCompany,
  back,
}: {
  locale: Locale;
  messages: Messages;
  wallets: Wallet[];
  currencies: Currency[];
  ledger: LedgerEntry[];
  forCompany: boolean;
  back: string;
}) {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl">{messages.wallet.title}</h1>
      {wallets.length === 0 ? (
        <p className="rounded-2xl border border-border bg-paper p-6 text-muted-foreground">
          {messages.wallet.empty}
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {wallets.map((w) => (
            <div key={w.id} className="rounded-2xl border border-border bg-paper p-5">
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {w.currency}
              </p>
              <p className="num mt-2 text-2xl">
                {formatMoney(w.available_balance, w.currency, locale)}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {messages.wallet.reserved}:{" "}
                {formatMoney(w.reserved_balance, w.currency, locale)}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <form action={depositAction} className="rounded-2xl border border-border bg-paper p-5">
          <p className="font-medium">{messages.wallet.deposit}</p>
          <input type="hidden" name="locale" value={locale} />
          <input type="hidden" name="for_company" value={forCompany ? "1" : "0"} />
          <input type="hidden" name="back" value={back} />
          <label className="mt-4 block text-sm">
            <span className="text-muted-foreground">{messages.wallet.currency}</span>
            <select
              name="currency"
              className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2"
              defaultValue="GEL"
            >
              {currencies.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code}
                </option>
              ))}
            </select>
          </label>
          <label className="mt-3 block text-sm">
            <span className="text-muted-foreground">{messages.wallet.amount}</span>
            <input
              name="amount"
              type="number"
              min="0.01"
              step="0.01"
              required
              className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2"
            />
          </label>
          <button
            type="submit"
            className="mt-4 w-full rounded-full bg-pine py-2.5 text-sm text-white"
          >
            {messages.wallet.confirmDeposit}
          </button>
        </form>

        <form action={withdrawAction} className="rounded-2xl border border-border bg-paper p-5">
          <p className="font-medium">{messages.wallet.withdraw}</p>
          <input type="hidden" name="locale" value={locale} />
          <input type="hidden" name="for_company" value={forCompany ? "1" : "0"} />
          <input type="hidden" name="back" value={back} />
          <label className="mt-4 block text-sm">
            <span className="text-muted-foreground">{messages.wallet.currency}</span>
            <select
              name="currency"
              className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2"
              defaultValue="GEL"
            >
              {currencies.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code}
                </option>
              ))}
            </select>
          </label>
          <label className="mt-3 block text-sm">
            <span className="text-muted-foreground">{messages.wallet.amount}</span>
            <input
              name="amount"
              type="number"
              min="0.01"
              step="0.01"
              required
              className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2"
            />
          </label>
          <button
            type="submit"
            className="mt-4 w-full rounded-full border border-pine py-2.5 text-sm text-pine"
          >
            {messages.wallet.confirmWithdraw}
          </button>
        </form>
      </div>

      <section className="rounded-2xl border border-border bg-paper p-5">
        <p className="font-medium">{messages.wallet.history}</p>
        <div className="mt-4 divide-y divide-border text-sm">
          {ledger.map((row) => (
            <div key={row.id} className="flex items-center justify-between py-2">
              <div>
                <p>{row.type}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(row.created_at, locale)}
                </p>
              </div>
              <p className="num">
                {formatMoney(row.amount, row.currency, locale)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
