"use client";

import { useState } from "react";
import { markNotificationsReadAction } from "@/app/actions/exchange";
import type { Messages } from "@/i18n/messages";
import { formatDate } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";
import type { Notification } from "@/lib/supabase/types";

export function NotificationBell({
  locale,
  messages,
  items,
}: {
  locale: Locale;
  messages: Messages;
  items: Notification[];
}) {
  const [open, setOpen] = useState(false);
  const unread = items.filter((n) => !n.read_at).length;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="relative rounded-full border border-border bg-paper px-2.5 py-1 text-sm"
        aria-label={messages.app.notifications}
      >
        •
        {unread > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[10px] text-ink">
            {unread}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 z-20 mt-2 w-72 rounded-2xl border border-border bg-paper p-3 shadow-lg">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-medium">{messages.app.notifications}</p>
            <form action={markNotificationsReadAction}>
              <button type="submit" className="text-xs text-leaf">
                {messages.app.markRead}
              </button>
            </form>
          </div>
          {items.length === 0 ? (
            <p className="text-sm text-muted-foreground">{messages.app.noNotifications}</p>
          ) : (
            <ul className="max-h-72 space-y-2 overflow-auto text-sm">
              {items.map((n) => (
                <li key={n.id} className={n.read_at ? "opacity-60" : ""}>
                  <p className="font-medium">{n.type}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(n.created_at, locale)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
