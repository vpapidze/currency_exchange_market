"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  localeHref,
  localeLabels,
  locales,
  type Locale,
} from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-paper p-1 text-xs">
      {locales.map((l) => (
        <Link
          key={l}
          href={localeHref(l, pathname)}
          className={cn(
            "rounded-full px-2.5 py-1 font-medium",
            l === locale ? "bg-pine text-white" : "text-muted-foreground hover:text-ink",
          )}
        >
          {localeLabels[l]}
        </Link>
      ))}
    </div>
  );
}
