export const siteConfig = {
  name: "კურსი",
  nameEn: "Kursi",
  title: "კურსი · Kursi — ვალუტის გაცვლის მარკეტპლეისი",
  description:
    "კურსი აკავშირებს საქართველოს ვალუტის გადამცვლელ კომპანიებს და კლიენტებს. შეადარეთ კურსები, გააკეთეთ მოთხოვნა და დაასრულეთ გაცვლა.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "ka_GE",
  keywords: [
    "ვალუტის გაცვლა",
    "კურსი",
    "დოლარი",
    "ევრო",
    "ლარი",
    "currency exchange Georgia",
    "Tbilisi exchange",
    "USD GEL",
    "обмен валюты Грузия",
  ],
} as const;

export function absoluteUrl(path = "/") {
  const base = siteConfig.url.replace(/\/$/, "");
  if (path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
