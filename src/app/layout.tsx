import type { Metadata } from "next";
import { headers } from "next/headers";
import {
  Fraunces,
  JetBrains_Mono,
  Manrope,
  Noto_Sans_Georgian,
  Noto_Serif_Georgian,
} from "next/font/google";
import { defaultLocale, isLocale, localeHtmlLang } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

const notoSans = Noto_Sans_Georgian({
  variable: "--font-noto-sans-georgian",
  subsets: ["georgian", "latin"],
  weight: ["400", "500", "600", "700"],
});

const notoSerif = Noto_Serif_Georgian({
  variable: "--font-noto-serif-georgian",
  subsets: ["georgian", "latin"],
  weight: ["500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerLocale = (await headers()).get("x-locale") ?? defaultLocale;
  const lang = isLocale(headerLocale)
    ? localeHtmlLang[headerLocale]
    : localeHtmlLang[defaultLocale];

  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`${fraunces.variable} ${manrope.variable} ${notoSans.variable} ${notoSerif.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="flex min-h-full flex-col bg-background text-foreground"
      >
        {children}
      </body>
    </html>
  );
}
