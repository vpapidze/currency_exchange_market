import Link from "next/link";
import type { Messages } from "@/i18n/messages";
import { localizedPath, type Locale } from "@/lib/i18n";
import { pickLocalized } from "@/lib/utils";
import type { SiteSettings } from "@/lib/supabase/types";

export function SiteFooter({
  locale,
  messages,
  settings,
}: {
  locale: Locale;
  messages: Messages;
  settings: SiteSettings;
}) {
  const city = pickLocalized(
    locale,
    settings.address_city,
    settings.address_city_en,
    settings.address_city_ru,
  );
  const street = pickLocalized(
    locale,
    settings.address_street,
    settings.address_street_en,
    settings.address_street_ru,
  );

  return (
    <footer className="mt-auto border-t border-pine/20 bg-pine text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-3xl">{messages.brand}</p>
          <p className="mt-3 max-w-sm text-sm text-white/70">{messages.footer.tagline}</p>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold">
            {messages.footer.legal}
          </p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-white/80">
            <Link href={localizedPath(locale, "/terms")}>{messages.footer.terms}</Link>
            <Link href={localizedPath(locale, "/privacy")}>{messages.footer.privacy}</Link>
            <Link href={localizedPath(locale, "/contact")}>{messages.footer.contact}</Link>
          </div>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold">
            {messages.nav.contact}
          </p>
          <p className="mt-4 text-sm text-white/80">
            {street}
            <br />
            {city}
            <br />
            {settings.phone_display}
            <br />
            {settings.email}
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl justify-between px-4 py-5 text-xs text-white/50 sm:px-6">
          <p>{messages.footer.copyright.replace("{year}", "2026")}</p>
          <p className="font-mono uppercase tracking-[0.2em]">{messages.footer.madeIn}</p>
        </div>
      </div>
    </footer>
  );
}
