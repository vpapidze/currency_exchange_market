import type { Messages } from "@/i18n/messages";

export function rpcMessage(error: { message?: string } | null, messages: Messages) {
  const raw = (error?.message ?? "").toLowerCase();
  if (raw.includes("insufficient_funds")) return messages.errors.insufficient;
  if (raw.includes("company_insufficient")) return messages.errors.companyFunds;
  if (raw.includes("rate_not_found") || raw.includes("rate_missing")) {
    return messages.errors.rateMissing;
  }
  if (raw.includes("not_pending")) return messages.errors.notPending;
  if (raw.includes("invalid login") || raw.includes("invalid_credentials")) {
    return messages.errors.auth;
  }
  if (raw) return error?.message ?? messages.errors.generic;
  return messages.errors.generic;
}
