export const locales = ["ka", "en", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ka";

export const localeLabels: Record<Locale, string> = {
  ka: "ქარ",
  en: "ENG",
  ru: "РУС",
};

export const localeNames: Record<Locale, string> = {
  ka: "ქართული",
  en: "English",
  ru: "Русский",
};

export const localeHtmlLang: Record<Locale, string> = {
  ka: "ka",
  en: "en",
  ru: "ru",
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localizedPath(locale: Locale, path = "/") {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (clean === "/") return `/${locale}`;
  return `/${locale}${clean}`;
}

export function stripLocalePrefix(pathname: string): string {
  const parts = pathname.split("/");
  if (parts.length >= 2 && isLocale(parts[1])) {
    const rest = "/" + parts.slice(2).join("/");
    return rest === "/" ? "/" : rest.replace(/\/$/, "") || "/";
  }
  return pathname;
}

export function localeHref(locale: Locale, pathname: string) {
  const pathWithoutLocale = stripLocalePrefix(pathname);
  return pathWithoutLocale === "/"
    ? `/${locale}`
    : `/${locale}${pathWithoutLocale}`;
}
