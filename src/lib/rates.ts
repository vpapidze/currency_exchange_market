export const rateSorts = ["buy", "sell", "company", "updated"] as const;
export type RateSort = (typeof rateSorts)[number];

export function parseRateSort(value: string | undefined): RateSort {
  return rateSorts.includes(value as RateSort) ? (value as RateSort) : "buy";
}

export function ratesQueryHref(pathname: string, fx: string, sort: RateSort) {
  const q = new URLSearchParams();
  if (fx) q.set("fx", fx);
  if (sort !== "buy") q.set("sort", sort);
  const s = q.toString();
  return s ? `${pathname}?${s}` : pathname;
}
