export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function requestCode(id: string) {
  return `KR-${id.replace(/-/g, "").slice(0, 8).toUpperCase()}`;
}

export function formatDate(iso: string, locale: string) {
  try {
    return new Intl.DateTimeFormat(
      locale === "ka" ? "ka-GE" : locale === "ru" ? "ru-RU" : "en-GB",
      { dateStyle: "medium", timeStyle: "short" },
    ).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function pickLocalized(
  locale: string,
  ka: string,
  en?: string | null,
  ru?: string | null,
) {
  if (locale === "en" && en?.trim()) return en;
  if (locale === "ru" && ru?.trim()) return ru;
  return ka;
}
