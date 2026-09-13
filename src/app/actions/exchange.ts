"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { localizedPath, type Locale } from "@/lib/i18n";
import { parseAmount } from "@/lib/money";
import { createClient } from "@/lib/supabase/server";

function localeFrom(formData: FormData): Locale {
  const raw = String(formData.get("locale") ?? "ka");
  return raw === "en" || raw === "ru" ? raw : "ka";
}

export async function createExchangeAction(formData: FormData) {
  const locale = localeFrom(formData);
  const companyId = String(formData.get("company_id") ?? "");
  const from = String(formData.get("from_currency") ?? "");
  const to = String(formData.get("to_currency") ?? "");
  const amount = parseAmount(String(formData.get("from_amount") ?? ""));
  const note = String(formData.get("client_note") ?? "");

  const supabase = await createClient();
  const { data, error } = await supabase.rpc("create_exchange_request", {
    p_company_id: companyId,
    p_from: from,
    p_to: to,
    p_from_amount: amount,
    p_client_note: note || null,
  });

  if (error || !data) {
    redirect(
      `${localizedPath(locale, "/dashboard/exchange")}?error=${encodeURIComponent(error?.message ?? "error")}`,
    );
  }

  revalidatePath("/", "layout");
  redirect(localizedPath(locale, `/dashboard/requests/${data}`));
}

export async function cancelExchangeAction(formData: FormData) {
  const locale = localeFrom(formData);
  const id = String(formData.get("id") ?? "");
  const supabase = await createClient();
  const { error } = await supabase.rpc("cancel_exchange_request", {
    p_request_id: id,
  });
  if (error) {
    redirect(
      `${localizedPath(locale, `/dashboard/requests/${id}`)}?error=${encodeURIComponent(error.message)}`,
    );
  }
  revalidatePath("/", "layout");
  redirect(localizedPath(locale, `/dashboard/requests/${id}`));
}

export async function decideExchangeAction(formData: FormData) {
  const locale = localeFrom(formData);
  const id = String(formData.get("id") ?? "");
  const accept = String(formData.get("accept") ?? "") === "1";
  const note = String(formData.get("note") ?? "");
  const supabase = await createClient();
  const { error } = await supabase.rpc("decide_exchange", {
    p_request_id: id,
    p_accept: accept,
    p_note: note || null,
  });
  if (error) {
    redirect(
      `${localizedPath(locale, `/company/requests/${id}`)}?error=${encodeURIComponent(error.message)}`,
    );
  }
  revalidatePath("/", "layout");
  redirect(localizedPath(locale, `/company/requests/${id}`));
}

export async function markNotificationsReadAction() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;
  await supabase
    .from("notifications")
    .update({ read_at: new Date().toISOString() })
    .eq("user_id", user.id)
    .is("read_at", null);
  revalidatePath("/", "layout");
}
