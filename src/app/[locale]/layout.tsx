import { headers } from "next/headers";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getMessages } from "@/i18n/messages";
import { getProfile } from "@/lib/auth";
import { getSiteSettings } from "@/lib/data";
import { generateLocaleParams, readLocale } from "@/lib/locale-params";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return generateLocaleParams();
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const locale = await readLocale(params);
  const messages = getMessages(locale);
  const pathname = (await headers()).get("x-pathname") ?? "";
  const isApp =
    pathname.includes("/company") || pathname.includes("/dashboard");
  const [{ profile }, settings] = await Promise.all([getProfile(), getSiteSettings()]);

  return (
    <>
      <SiteHeader
        locale={locale}
        messages={messages}
        signedIn={Boolean(profile)}
        role={profile?.role}
      />
      <main className="flex-1">{children}</main>
      {isApp ? null : (
        <SiteFooter locale={locale} messages={messages} settings={settings} />
      )}
    </>
  );
}
