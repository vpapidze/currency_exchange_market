"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { localizedPath, type Locale } from "@/lib/i18n";
import { createClient } from "@/lib/supabase/server";

function localeFrom(formData: FormData): Locale {
  const raw = String(formData.get("locale") ?? "ka");
  return raw === "en" || raw === "ru" ? raw : "ka";
}

export async function loginAction(formData: FormData) {
  const locale = localeFrom(formData);
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    const lower = error.message.toLowerCase();
    const code = lower.includes("email not confirmed")
      ? "emailNotConfirmed"
      : lower.includes("invalid login")
        ? "auth"
        : error.message;
    redirect(
      `${localizedPath(locale, "/login")}?error=${encodeURIComponent(code)}`,
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user?.id ?? "")
    .maybeSingle();

  const role =
    profile?.role ??
    (user?.user_metadata?.role as string | undefined) ??
    (user?.app_metadata?.role as string | undefined);

  revalidatePath("/", "layout");
  if (role === "admin") redirect("/admin");
  if (role === "company") redirect(localizedPath(locale, "/company"));
  redirect(localizedPath(locale, "/dashboard"));
}

export async function registerAction(formData: FormData) {
  const locale = localeFrom(formData);
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const fullName = String(formData.get("full_name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const role = String(formData.get("role") ?? "client") === "company" ? "company" : "client";
  const companyName = String(formData.get("company_name") ?? "").trim();

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role,
        full_name: fullName,
        phone,
        locale,
        company_name: companyName || fullName,
      },
    },
  });

  if (error) {
    const lower = error.message.toLowerCase();
    const code = lower.includes("rate limit")
      ? "rateLimit"
      : lower.includes("already registered")
        ? "hasAccount"
        : error.message;
    redirect(
      `${localizedPath(locale, "/register")}?error=${encodeURIComponent(code)}`,
    );
  }

  if (!data.session) {
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (signInError) {
      redirect(`${localizedPath(locale, "/login")}?checkEmail=1`);
    }
  }

  revalidatePath("/", "layout");
  if (role === "company") redirect(localizedPath(locale, "/company"));
  redirect(localizedPath(locale, "/dashboard"));
}

export async function logoutAction(formData: FormData) {
  const locale = localeFrom(formData);
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect(localizedPath(locale, "/"));
}

export async function adminLoginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    redirect(`/admin/login?error=${encodeURIComponent(error.message)}`);
  }
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user?.id ?? "")
    .maybeSingle();
  if (profile?.role !== "admin") {
    await supabase.auth.signOut();
    redirect(`/admin/login?error=${encodeURIComponent("admin_only")}`);
  }
  redirect("/admin");
}

export async function adminLogoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
