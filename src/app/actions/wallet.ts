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

export async function depositAction(formData: FormData) {
  const locale = localeFrom(formData);
  const currency = String(formData.get("currency") ?? "GEL");
  const amount = parseAmount(String(formData.get("amount") ?? ""));
  const forCompany = String(formData.get("for_company") ?? "") === "1";
  const back = String(formData.get("back") ?? (forCompany ? "/company/wallet" : "/dashboard/wallet"));

  const supabase = await createClient();
  const { error } = await supabase.rpc("deposit_funds", {
    p_currency: currency,
    p_amount: amount,
    p_for_company: forCompany,
  });

  const path = localizedPath(locale, back);
  if (error) {
    redirect(`${path}?error=${encodeURIComponent(error.message)}`);
  }
  revalidatePath("/", "layout");
  redirect(`${path}?saved=1`);
}

export async function withdrawAction(formData: FormData) {
  const locale = localeFrom(formData);
  const currency = String(formData.get("currency") ?? "GEL");
  const amount = parseAmount(String(formData.get("amount") ?? ""));
  const forCompany = String(formData.get("for_company") ?? "") === "1";
  const back = String(formData.get("back") ?? (forCompany ? "/company/wallet" : "/dashboard/wallet"));

  const supabase = await createClient();
  const { error } = await supabase.rpc("withdraw_funds", {
    p_currency: currency,
    p_amount: amount,
    p_for_company: forCompany,
  });

  const path = localizedPath(locale, back);
  if (error) {
    redirect(`${path}?error=${encodeURIComponent(error.message)}`);
  }
  revalidatePath("/", "layout");
  redirect(`${path}?saved=1`);
}
