"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { localizedPath, type Locale } from "@/lib/i18n";
import { createClient } from "@/lib/supabase/server";
import { getProfile } from "@/lib/auth";

function localeFrom(formData: FormData): Locale {
  const raw = String(formData.get("locale") ?? "ka");
  return raw === "en" || raw === "ru" ? raw : "ka";
}

export async function updateCompanyProfileAction(formData: FormData) {
  const locale = localeFrom(formData);
  const { company, supabase } = await getProfile();
  if (!company) redirect(localizedPath(locale, "/company"));

  const { error } = await supabase
    .from("companies")
    .update({
      name_ka: String(formData.get("name_ka") ?? ""),
      name_en: String(formData.get("name_en") ?? "") || null,
      name_ru: String(formData.get("name_ru") ?? "") || null,
      description_ka: String(formData.get("description_ka") ?? ""),
      description_en: String(formData.get("description_en") ?? "") || null,
      description_ru: String(formData.get("description_ru") ?? "") || null,
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      website: String(formData.get("website") ?? "") || null,
      city_ka: String(formData.get("city_ka") ?? ""),
      city_en: String(formData.get("city_en") ?? ""),
      city_ru: String(formData.get("city_ru") ?? ""),
      address_ka: String(formData.get("address_ka") ?? ""),
      address_en: String(formData.get("address_en") ?? "") || null,
      address_ru: String(formData.get("address_ru") ?? "") || null,
      nbg_registration_number:
        String(formData.get("nbg_registration_number") ?? "") || null,
    })
    .eq("id", company.id);

  if (error) {
    redirect(
      `${localizedPath(locale, "/company/profile")}?error=${encodeURIComponent(error.message)}`,
    );
  }
  revalidatePath("/", "layout");
  redirect(`${localizedPath(locale, "/company/profile")}?saved=1`);
}

export async function upsertRateAction(formData: FormData) {
  const locale = localeFrom(formData);
  const { company, supabase } = await getProfile();
  if (!company) redirect(localizedPath(locale, "/company"));

  const quote = String(formData.get("quote_currency") ?? "");
  const payload = {
    company_id: company.id,
    base_currency: "GEL",
    quote_currency: quote,
    buy_rate: Number(formData.get("buy_rate")),
    sell_rate: Number(formData.get("sell_rate")),
    min_amount: String(formData.get("min_amount") ?? "").trim()
      ? Number(formData.get("min_amount"))
      : null,
    max_amount: String(formData.get("max_amount") ?? "").trim()
      ? Number(formData.get("max_amount"))
      : null,
    is_active: String(formData.get("is_active") ?? "") === "1",
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("company_rates").upsert(payload, {
    onConflict: "company_id,base_currency,quote_currency",
  });

  if (error) {
    redirect(
      `${localizedPath(locale, "/company/rates")}?error=${encodeURIComponent(error.message)}`,
    );
  }
  revalidatePath("/", "layout");
  redirect(`${localizedPath(locale, "/company/rates")}?saved=1`);
}

export async function deleteRateAction(formData: FormData) {
  const locale = localeFrom(formData);
  const { company, supabase } = await getProfile();
  if (!company) redirect(localizedPath(locale, "/company"));
  const id = String(formData.get("id") ?? "");
  await supabase.from("company_rates").delete().eq("id", id).eq("company_id", company.id);
  revalidatePath("/", "layout");
  redirect(localizedPath(locale, "/company/rates"));
}
