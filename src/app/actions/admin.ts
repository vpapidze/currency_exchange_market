"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getProfile } from "@/lib/auth";

async function requireAdmin() {
  const ctx = await getProfile();
  if (!ctx.profile || ctx.profile.role !== "admin") redirect("/admin/login");
  return ctx;
}

export async function setCompanyStatusAction(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.rpc("admin_set_company_status", {
    p_company_id: String(formData.get("id") ?? ""),
    p_status: String(formData.get("status") ?? ""),
  });
  if (error) {
    redirect(`/admin/companies?error=${encodeURIComponent(error.message)}`);
  }
  revalidatePath("/admin");
  redirect("/admin/companies?saved=1");
}

export async function setUserRoleAction(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.rpc("admin_set_user_role", {
    p_user_id: String(formData.get("id") ?? ""),
    p_role: String(formData.get("role") ?? ""),
  });
  if (error) {
    redirect(`/admin/users?error=${encodeURIComponent(error.message)}`);
  }
  revalidatePath("/admin");
  redirect("/admin/users?saved=1");
}

export async function updateSettingsAction(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();
  const payload = {
    id: 1,
    phone: String(formData.get("phone") ?? ""),
    phone_display: String(formData.get("phone_display") ?? ""),
    email: String(formData.get("email") ?? ""),
    facebook: String(formData.get("facebook") ?? ""),
    address_street: String(formData.get("address_street") ?? ""),
    address_street_en: String(formData.get("address_street_en") ?? ""),
    address_street_ru: String(formData.get("address_street_ru") ?? ""),
    address_city: String(formData.get("address_city") ?? ""),
    address_city_en: String(formData.get("address_city_en") ?? ""),
    address_city_ru: String(formData.get("address_city_ru") ?? ""),
    address_country: String(formData.get("address_country") ?? ""),
    address_country_en: String(formData.get("address_country_en") ?? ""),
    address_country_ru: String(formData.get("address_country_ru") ?? ""),
    hours_weekday: String(formData.get("hours_weekday") ?? ""),
    hours_weekend: String(formData.get("hours_weekend") ?? ""),
    map_embed_query: String(formData.get("map_embed_query") ?? ""),
    updated_at: new Date().toISOString(),
  };
  const { error } = await supabase.from("site_settings").upsert(payload);
  if (error) {
    redirect(`/admin/settings?error=${encodeURIComponent(error.message)}`);
  }
  revalidatePath("/", "layout");
  redirect("/admin/settings?saved=1");
}

export async function contactAction(formData: FormData) {
  const locale = String(formData.get("locale") ?? "ka");
  const supabase = await createClient();
  const { error } = await supabase.from("contact_messages").insert({
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
    locale,
  });
  const path = `/${locale}/contact`;
  if (error) {
    redirect(`${path}?error=${encodeURIComponent(error.message)}`);
  }
  redirect(`${path}?sent=1`);
}
