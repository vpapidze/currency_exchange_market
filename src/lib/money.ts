export function formatMoney(
  amount: number | string,
  currency: string,
  locale = "ka",
) {
  const n = typeof amount === "string" ? Number(amount) : amount;
  if (!Number.isFinite(n)) return "—";
  try {
    return new Intl.NumberFormat(
      locale === "ka" ? "ka-GE" : locale === "ru" ? "ru-RU" : "en-US",
      {
        style: "currency",
        currency,
        currencyDisplay: "narrowSymbol",
        minimumFractionDigits: 2,
        maximumFractionDigits: 4,
      },
    ).format(n);
  } catch {
    return `${n.toFixed(2)} ${currency}`;
  }
}

export function formatRate(rate: number | string, quoteUnit = 1) {
  const n = typeof rate === "string" ? Number(rate) : rate;
  if (!Number.isFinite(n)) return "—";
  const digits = n >= 1 ? 4 : 6;
  const formatted = n.toFixed(digits).replace(/\.?0+$/, "");
  return quoteUnit === 1 ? formatted : `${formatted} / ${quoteUnit}`;
}

export function parseAmount(value: string) {
  const n = Number(String(value).replace(",", ".").replace(/\s/g, ""));
  return Number.isFinite(n) ? n : NaN;
}
