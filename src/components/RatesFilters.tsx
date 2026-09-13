"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { Messages } from "@/i18n/messages";
import { parseRateSort, rateSorts, ratesQueryHref, type RateSort } from "@/lib/rates";
import { cn } from "@/lib/utils";

export function RatesFilters({
  messages,
  codes,
  fx,
  sort,
}: {
  messages: Messages;
  codes: string[];
  fx: string;
  sort: RateSort;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const sortLabel: Record<RateSort, string> = {
    buy: messages.rates.sortBuy,
    sell: messages.rates.sortSell,
    company: messages.rates.sortCompany,
    updated: messages.rates.sortUpdated,
  };

  return (
    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs uppercase tracking-wider text-muted-foreground">
          {messages.rates.filterCurrency}
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          <Link
            href={ratesQueryHref(pathname, "", sort)}
            className={cn(
              "rounded-full px-3 py-1.5 text-sm",
              fx === "" ? "bg-pine text-white" : "border border-border bg-paper",
            )}
          >
            {messages.rates.allCurrencies}
          </Link>
          {codes.map((code) => (
            <Link
              key={code}
              href={ratesQueryHref(pathname, code, sort)}
              className={cn(
                "rounded-full px-3 py-1.5 font-mono text-sm",
                fx === code ? "bg-pine text-white" : "border border-border bg-paper",
              )}
            >
              {code}
            </Link>
          ))}
        </div>
      </div>
      <label className="text-sm">
        <span className="text-xs uppercase tracking-wider text-muted-foreground">
          {messages.rates.sort}
        </span>
        <select
          className="mt-2 block rounded-xl border border-border bg-paper px-3 py-2"
          value={sort}
          onChange={(e) =>
            router.push(ratesQueryHref(pathname, fx, parseRateSort(e.target.value)))
          }
        >
          {rateSorts.map((s) => (
            <option key={s} value={s}>
              {sortLabel[s]}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
