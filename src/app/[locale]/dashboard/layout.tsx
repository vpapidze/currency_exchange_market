import { AppShell } from "@/components/AppShell";
import { getMessages } from "@/i18n/messages";
import { requireRole } from "@/lib/auth";
import { getNotifications } from "@/lib/data";
import { readLocale } from "@/lib/locale-params";

export const dynamic = "force-dynamic";

export default async function ClientLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const locale = await readLocale(params);
  const { profile } = await requireRole(locale, ["client"]);
  const messages = getMessages(locale);
  const notifications = profile ? await getNotifications(profile.id) : [];

  return (
    <AppShell
      locale={locale}
      messages={messages}
      title={messages.nav.dashboard}
      notifications={notifications}
      items={[
        { href: "/dashboard", label: messages.app.overview },
        { href: "/dashboard/wallet", label: messages.app.wallet },
        { href: "/dashboard/exchange", label: messages.app.exchange },
        { href: "/dashboard/requests", label: messages.app.requests },
        { href: "/dashboard/stats", label: messages.app.stats },
      ]}
    >
      {children}
    </AppShell>
  );
}
