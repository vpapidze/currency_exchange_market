import { logoutAction } from "@/app/actions/auth";
import { AppNav } from "@/components/AppNav";
import { NotificationBell } from "@/components/NotificationBell";
import type { Messages } from "@/i18n/messages";
import type { Locale } from "@/lib/i18n";
import type { Notification } from "@/lib/supabase/types";

type Item = { href: string; label: string };

export function AppShell({
  locale,
  messages,
  title,
  items,
  notifications,
  children,
  banner,
}: {
  locale: Locale;
  messages: Messages;
  title: string;
  items: Item[];
  notifications: Notification[];
  children: React.ReactNode;
  banner?: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row">
      <aside className="lg:w-56">
        <div className="flex items-center justify-between">
          <p className="font-display text-2xl">{title}</p>
          <NotificationBell
            locale={locale}
            messages={messages}
            items={notifications}
          />
        </div>
        <AppNav locale={locale} items={items} />
        <form action={logoutAction} className="mt-6">
          <input type="hidden" name="locale" value={locale} />
          <button type="submit" className="text-sm text-muted-foreground hover:text-danger">
            {messages.app.logout}
          </button>
        </form>
      </aside>
      <div className="min-w-0 flex-1 space-y-6">
        {banner}
        {children}
      </div>
    </div>
  );
}
