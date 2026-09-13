import { cache } from "react";
import { redirect } from "next/navigation";
import { localizedPath, type Locale } from "@/lib/i18n";
import { createClient } from "@/lib/supabase/server";
import type { Company, Profile, Role } from "@/lib/supabase/types";
import type { User } from "@supabase/supabase-js";

function metaRole(user: User): Role {
  const raw = String(user.user_metadata?.role ?? user.app_metadata?.role ?? "");
  if (raw === "company" || raw === "admin" || raw === "client") return raw;
  return "client";
}

function slugify(input: string, userId: string) {
  const base =
    input
      .toLowerCase()
      .replace(/[^a-z0-9ა-ჰа-яё]+/gi, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 40) || "company";
  return `${base}-${userId.replace(/-/g, "").slice(0, 8)}`;
}

async function ensureProfile(
  supabase: Awaited<ReturnType<typeof createClient>>,
  user: User,
  existing: Profile | null,
): Promise<Profile> {
  if (existing) return existing;

  const role = metaRole(user);
  const row = {
    id: user.id,
    role,
    full_name: String(user.user_metadata?.full_name ?? ""),
    phone: String(user.user_metadata?.phone ?? ""),
    locale: String(user.user_metadata?.locale ?? "ka"),
  };

  const { data, error } = await supabase
    .from("profiles")
    .upsert(row, { onConflict: "id" })
    .select("*")
    .maybeSingle();

  if (error || !data) {
    return {
      ...row,
      created_at: new Date().toISOString(),
    };
  }
  return data as Profile;
}

async function ensureCompany(
  supabase: Awaited<ReturnType<typeof createClient>>,
  user: User,
  profile: Profile,
  existing: Company | null,
): Promise<Company | null> {
  if (existing || profile.role !== "company") return existing;

  const name = String(
    user.user_metadata?.company_name || profile.full_name || "ახალი კომპანია",
  );
  const payload = {
    owner_id: user.id,
    slug: slugify(name, user.id),
    name_ka: name,
    name_en: name,
    name_ru: name,
    phone: profile.phone,
    email: user.email ?? "",
    status: "pending",
  };

  const { data } = await supabase
    .from("companies")
    .upsert(payload, { onConflict: "owner_id" })
    .select("*")
    .maybeSingle();

  return (data as Company | null) ?? null;
}

export const getProfile = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { supabase, user: null, profile: null, company: null };

  const { data: profileRow } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  const profile = await ensureProfile(supabase, user, profileRow as Profile | null);

  let company: Company | null = null;
  if (profile.role === "company" || profile.role === "admin") {
    const { data } = await supabase
      .from("companies")
      .select("*")
      .eq("owner_id", user.id)
      .maybeSingle();
    company = await ensureCompany(supabase, user, profile, data as Company | null);
  }

  return { supabase, user, profile, company };
});

export async function requireRole(locale: Locale, roles: Role[]) {
  const ctx = await getProfile();
  if (!ctx.user) {
    redirect(localizedPath(locale, "/login"));
  }

  const role = ctx.profile?.role ?? metaRole(ctx.user);
  if (!roles.includes(role)) {
    const dest =
      role === "company"
        ? localizedPath(locale, "/company")
        : role === "admin"
          ? "/admin"
          : localizedPath(locale, "/dashboard");
    const here = localizedPath(locale, roles.includes("company") ? "/company" : "/dashboard");
    if (dest !== here) redirect(dest);
  }
  return ctx;
}
