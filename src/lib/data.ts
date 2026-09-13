import { createClient } from "@/lib/supabase/server";
import {
  defaultSettings,
  type Company,
  type CompanyRate,
  type Currency,
  type ExchangeRequest,
  type LedgerEntry,
  type Notification,
  type Profile,
  type PublicRate,
  type SiteSettings,
  type Wallet,
} from "@/lib/supabase/types";

async function db() {
  return createClient();
}

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const supabase = await db();
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .eq("id", 1)
      .maybeSingle();
    if (error || !data) return defaultSettings;
    return data as SiteSettings;
  } catch {
    return defaultSettings;
  }
}

export async function getCurrencies(): Promise<Currency[]> {
  try {
    const supabase = await db();
    const { data, error } = await supabase
      .from("currencies")
      .select("*")
      .eq("is_active", true)
      .order("sort_order");
    if (error || !data) return [];
    return data as Currency[];
  } catch {
    return [];
  }
}

export async function getPublicRates(): Promise<PublicRate[]> {
  try {
    const supabase = await db();
    const { data, error } = await supabase
      .from("public_rates")
      .select("*")
      .order("quote_currency");
    if (error || !data) return [];
    return data as PublicRate[];
  } catch {
    return [];
  }
}

export async function getApprovedCompanies(): Promise<Company[]> {
  try {
    const supabase = await db();
    const { data, error } = await supabase
      .from("companies")
      .select("*")
      .eq("status", "approved")
      .order("name_ka");
    if (error || !data) return [];
    return data as Company[];
  } catch {
    return [];
  }
}

export async function getCompanyById(id: string) {
  const supabase = await db();
  const { data } = await supabase.from("companies").select("*").eq("id", id).maybeSingle();
  return data as Company | null;
}

export async function getCompanyBySlug(slug: string) {
  const supabase = await db();
  const { data } = await supabase
    .from("companies")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  return data as Company | null;
}

export async function getWallets(ownerType: "user" | "company", ownerId: string) {
  try {
    const supabase = await db();
    const { data, error } = await supabase
      .from("wallets")
      .select("*")
      .eq("owner_type", ownerType)
      .eq("owner_id", ownerId)
      .order("currency");
    if (error || !data) return [];
    return data as Wallet[];
  } catch {
    return [];
  }
}

export async function getLedger(walletIds: string[], limit = 40) {
  if (walletIds.length === 0) return [] as LedgerEntry[];
  const supabase = await db();
  const { data } = await supabase
    .from("ledger_entries")
    .select("*")
    .in("wallet_id", walletIds)
    .order("created_at", { ascending: false })
    .limit(limit);
  return (data ?? []) as LedgerEntry[];
}

export async function getCompanyRates(companyId: string) {
  const supabase = await db();
  const { data } = await supabase
    .from("company_rates")
    .select("*")
    .eq("company_id", companyId)
    .order("quote_currency");
  return (data ?? []) as CompanyRate[];
}

export async function getRequestsForClient(clientId: string) {
  const supabase = await db();
  const { data } = await supabase
    .from("exchange_requests")
    .select("*")
    .eq("client_id", clientId)
    .order("created_at", { ascending: false });
  return (data ?? []) as ExchangeRequest[];
}

export async function getRequestsForCompany(companyId: string) {
  try {
    const supabase = await db();
    const { data } = await supabase
      .from("exchange_requests")
      .select("*")
      .eq("company_id", companyId)
      .order("created_at", { ascending: false });
    return (data ?? []) as ExchangeRequest[];
  } catch {
    return [];
  }
}

export async function getRequest(id: string) {
  const supabase = await db();
  const { data } = await supabase
    .from("exchange_requests")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  return data as ExchangeRequest | null;
}

export async function getNotifications(userId: string) {
  try {
    const supabase = await db();
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(20);
    if (error) return [];
    return (data ?? []) as Notification[];
  } catch {
    return [];
  }
}

export async function getRequestStats(filter: {
  clientId?: string;
  companyId?: string;
}) {
  const supabase = await db();
  let q = supabase.from("exchange_requests").select("status, from_amount, from_currency, to_amount, to_currency");
  if (filter.clientId) q = q.eq("client_id", filter.clientId);
  if (filter.companyId) q = q.eq("company_id", filter.companyId);
  const { data } = await q;
  const rows = data ?? [];
  const byStatus = {
    pending: 0,
    confirmed: 0,
    rejected: 0,
    cancelled: 0,
    expired: 0,
  };
  for (const r of rows) {
    if (r.status in byStatus) {
      byStatus[r.status as keyof typeof byStatus] += 1;
    }
  }
  return { total: rows.length, ...byStatus, rows };
}

export async function adminListProfiles() {
  const supabase = await db();
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });
  return (data ?? []) as Profile[];
}

export async function adminListCompanies() {
  const supabase = await db();
  const { data } = await supabase
    .from("companies")
    .select("*")
    .order("created_at", { ascending: false });
  return (data ?? []) as Company[];
}

export async function adminListRequests() {
  const supabase = await db();
  const { data } = await supabase
    .from("exchange_requests")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);
  return (data ?? []) as ExchangeRequest[];
}

export async function adminListLedger() {
  const supabase = await db();
  const { data } = await supabase
    .from("ledger_entries")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);
  return (data ?? []) as LedgerEntry[];
}

export async function adminListMessages() {
  const supabase = await db();
  const { data } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);
  return (data ?? []) as Array<{
    id: string;
    name: string;
    email: string;
    message: string;
    created_at: string;
  }>;
}
