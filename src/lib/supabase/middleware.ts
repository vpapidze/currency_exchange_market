import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import {
  defaultLocale,
  isLocale,
  localizedPath,
  type Locale,
} from "@/lib/i18n";
import { getSupabaseConfig } from "@/lib/supabase/env";

function copyCookies(from: NextResponse, to: NextResponse) {
  from.cookies.getAll().forEach((c) => {
    to.cookies.set(c.name, c.value);
  });
}

function redirectWithCookies(
  request: NextRequest,
  supabaseResponse: NextResponse,
  pathname: string,
) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  const redirect = NextResponse.redirect(url);
  copyCookies(supabaseResponse, redirect);
  return redirect;
}

function nextWithRequestHeaders(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const { pathname } = request.nextUrl;
  const segment = pathname.split("/")[1] ?? "";
  if (isLocale(segment)) {
    requestHeaders.set("x-locale", segment);
    requestHeaders.set("x-pathname", pathname);
  }
  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export async function updateSession(request: NextRequest) {
  try {
    return await updateSessionInner(request);
  } catch {
    return applyPublicRouting(request, nextWithRequestHeaders(request), null);
  }
}

async function updateSessionInner(request: NextRequest) {
  let supabaseResponse = nextWithRequestHeaders(request);
  const { url: supabaseUrl, publishableKey } = getSupabaseConfig();
  const supabase = createServerClient(supabaseUrl, publishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        supabaseResponse = nextWithRequestHeaders(request);
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        );
      },
    },
  });

  let user: { id: string; user_metadata?: Record<string, unknown>; app_metadata?: Record<string, unknown> } | null =
    null;
  try {
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch {
    return applyPublicRouting(request, supabaseResponse, null);
  }

  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  ) {
    return supabaseResponse;
  }

  let role =
    (user?.user_metadata?.role as string | undefined) ??
    (user?.app_metadata?.role as string | undefined);

  if (user && !role) {
    try {
      const { data } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();
      role = data?.role;
    } catch {
      role = undefined;
    }
  }

  return applyPublicRouting(request, supabaseResponse, user, role);
}

function applyPublicRouting(
  request: NextRequest,
  supabaseResponse: NextResponse,
  user: { id: string } | null,
  role?: string,
) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  ) {
    return supabaseResponse;
  }

  const isAdminPath = pathname.startsWith("/admin");
  const isAdminLogin = pathname === "/admin/login";

  if (isAdminPath && !isAdminLogin && (!user || role !== "admin")) {
    return redirectWithCookies(
      request,
      supabaseResponse,
      user ? localizedPath(defaultLocale, "/") : "/admin/login",
    );
  }

  if (isAdminLogin && user && role === "admin") {
    return redirectWithCookies(request, supabaseResponse, "/admin");
  }

  if (isAdminPath) {
    return supabaseResponse;
  }

  const segment = pathname.split("/")[1] ?? "";
  const hasLocale = isLocale(segment);

  if (!hasLocale) {
    const suffix = pathname === "/" ? "" : pathname;
    return redirectWithCookies(
      request,
      supabaseResponse,
      `/${defaultLocale}${suffix}`,
    );
  }

  const locale = segment as Locale;
  supabaseResponse.headers.set("x-locale", locale);
  supabaseResponse.headers.set("x-pathname", pathname);
  supabaseResponse.cookies.set("kursi_locale", locale, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });

  const rest = pathname.slice(locale.length + 1) || "/";
  const isDashboard = rest.startsWith("/dashboard");
  const isCompany = rest.startsWith("/company");
  const isAuthPage = rest === "/login" || rest === "/register";

  if ((isDashboard || isCompany) && !user) {
    return redirectWithCookies(
      request,
      supabaseResponse,
      localizedPath(locale, "/login"),
    );
  }

  // Only bounce signed-in users off login/register. Do not bounce
  // /company ↔ /dashboard here — a JWT/profile mismatch caused a 307 loop.
  if (user && isAuthPage) {
    const home =
      role === "company"
        ? localizedPath(locale, "/company")
        : role === "admin"
          ? "/admin"
          : localizedPath(locale, "/dashboard");
    return redirectWithCookies(request, supabaseResponse, home);
  }

  return supabaseResponse;
}
