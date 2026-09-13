import { AppShell } from "@/components/AppShell";
import { getMessages } from "@/i18n/messages";
import { requireRole } from "@/lib/auth";
import { getNotifications } from "@/lib/data";
import { readLocale } from "@/lib/locale-params";

export const dynamic = "force-dynamic";

export default async function CompanyLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const locale = await readLocale(params);
  const { profile, company } = await requireRole(locale, ["company"]);
  const messages = getMessages(locale);
  const notifications = profile ? await getNotifications(profile.id) : [];

  const banner =
    company?.status === "pending" ? (
      <p className="rounded-2xl bg-gold-soft px-4 py-3 text-sm">{messages.app.pendingBanner}</p>
    ) : company?.status === "rejected" || company?.status === "suspended" ? (
      <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-danger">
        {messages.app.rejectedBanner}
      </p>
    ) : null;

  return (
    <AppShell
      locale={locale}
      messages={messages}
      title={messages.auth.roleCompany}
      notifications={notifications}
      banner={banner}
      items={[
        { href: "/company", label: messages.app.overview },
        { href: "/company/requests", label: messages.app.requests },
        { href: "/company/rates", label: messages.app.rates },
        { href: "/company/wallet", label: messages.app.wallet },
        { href: "/company/profile", label: messages.app.profile },
        { href: "/company/stats", label: messages.app.stats },
      ]}
    >
      {children}
    </AppShell>
  );
}
