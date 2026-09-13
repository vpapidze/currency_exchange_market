"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localizedPath, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Item = { href: string; label: string };

export function AppNav({ locale, items }: { locale: Locale; items: Item[] }) {
  const pathname = usePathname();
  return (
    <nav className="mt-6 flex gap-2 overflow-x-auto lg:flex-col">
      {items.map((item) => {
        const href = localizedPath(locale, item.href);
        const exact = item.href === "/dashboard" || item.href === "/company";
        const active = exact
          ? pathname === href
          : pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={item.href}
            href={href}
            className={cn(
              "whitespace-nowrap rounded-full px-3 py-2 text-sm",
              active ? "bg-pine text-white" : "bg-paper text-foreground hover:bg-muted",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
