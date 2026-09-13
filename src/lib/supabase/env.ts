function trim(value: string | undefined) {
  return value?.trim() || "";
}

// Public project values. Used when Vercel env is missing so Edge
// middleware cannot crash the whole site. Override via NEXT_PUBLIC_*.
const FALLBACK_URL = "https://rgrjwircfrlqcprladue.supabase.co";
const FALLBACK_KEY = "sb_publishable_LKClAm0DsFKfH6LaCfuSJw_VvIAuQPS";

export function getSupabaseUrl() {
  return trim(process.env.NEXT_PUBLIC_SUPABASE_URL) || FALLBACK_URL;
}

export function getSupabasePublishableKey() {
  return (
    trim(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) ||
    trim(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) ||
    FALLBACK_KEY
  );
}

export function getSupabaseConfig() {
  return {
    url: getSupabaseUrl(),
    publishableKey: getSupabasePublishableKey(),
  };
}
