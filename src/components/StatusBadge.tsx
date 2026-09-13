import { statusLabel, type Messages } from "@/i18n/messages";
import { cn } from "@/lib/utils";

const tones: Record<string, string> = {
  pending: "bg-gold-soft text-ink",
  confirmed: "bg-emerald-100 text-success",
  rejected: "bg-red-100 text-danger",
  cancelled: "bg-muted text-muted-foreground",
  expired: "bg-muted text-muted-foreground",
  approved: "bg-emerald-100 text-success",
  suspended: "bg-red-100 text-danger",
  client: "bg-muted text-ink",
  company: "bg-gold-soft text-ink",
  admin: "bg-pine text-white",
};

export function StatusBadge({
  status,
  messages,
}: {
  status: string;
  messages?: Messages;
}) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium",
        tones[status] ?? "bg-muted text-ink",
      )}
    >
      {messages ? statusLabel(messages, status) : status}
    </span>
  );
}
