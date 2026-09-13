"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { Messages } from "@/i18n/messages";
import { localizedPath, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function SiteHeader({
  locale,
  messages,
  signedIn,
  role,
}: {
  locale: Locale;
  messages: Messages;
  signedIn: boolean;
  role?: string | null;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dash =
    role === "company"
      ? "/company"
      : role === "admin"
        ? "/admin"
        : "/dashboard";

  const nav = [
    { to: "/", label: messages.nav.home },
    { to: "/rates", label: messages.nav.rates },
    { to: "/about", label: messages.nav.about },
    { to: "/contact", label: messages.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href={localizedPath(locale)} className="flex items-baseline gap-2">
          <span className="font-display text-2xl tracking-tight">{messages.brand}</span>
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground sm:inline">
            {messages.brandEn}
          </span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((n) => {
            const href = localizedPath(locale, n.to);
            const active =
              n.to === "/"
                ? pathname === href
                : pathname.startsWith(href);
            return (
              <Link
                key={n.to}
                href={href}
                className={cn(
                  "text-sm",
                  active ? "text-leaf" : "text-foreground/80 hover:text-leaf",
                )}
              >
                {n.label}
              </Link>
            );
          })}
          <LanguageSwitcher locale={locale} />
          {signedIn ? (
            <Link
              href={role === "admin" ? "/admin" : localizedPath(locale, dash)}
              className="rounded-full bg-pine px-4 py-2 text-sm text-white"
            >
              {messages.nav.dashboard}
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Link href={localizedPath(locale, "/login")} className="text-sm">
                {messages.nav.login}
              </Link>
              <Link
                href={localizedPath(locale, "/register")}
                className="rounded-full bg-pine px-4 py-2 text-sm text-white"
              >
                {messages.nav.register}
              </Link>
            </div>
          )}
        </nav>
        <button
          type="button"
          className="md:hidden"
          aria-label={messages.nav.menu}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block h-px w-6 bg-foreground" />
          <span className="mt-1.5 block h-px w-6 bg-foreground" />
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-paper px-4 py-4 md:hidden">
          {nav.map((n) => (
            <Link
              key={n.to}
              href={localizedPath(locale, n.to)}
              onClick={() => setOpen(false)}
              className="block py-2 text-lg"
            >
              {n.label}
            </Link>
          ))}
          {signedIn ? (
            <Link
              href={role === "admin" ? "/admin" : localizedPath(locale, dash)}
              onClick={() => setOpen(false)}
              className="mt-4 inline-block rounded-full bg-pine px-4 py-2 text-white"
            >
              {messages.nav.dashboard}
            </Link>
          ) : (
            <div className="mt-4 flex gap-3">
              <Link href={localizedPath(locale, "/login")} onClick={() => setOpen(false)}>
                {messages.nav.login}
              </Link>
              <Link
                href={localizedPath(locale, "/register")}
                onClick={() => setOpen(false)}
                className="rounded-full bg-pine px-4 py-2 text-white"
              >
                {messages.nav.register}
              </Link>
            </div>
          )}
          <div className="mt-3">
            <LanguageSwitcher locale={locale} />
          </div>
        </div>
      )}
    </header>
  );
}
