export type Role = "client" | "company" | "admin";
export type CompanyStatus = "pending" | "approved" | "rejected" | "suspended";
export type RequestStatus =
  | "pending"
  | "confirmed"
  | "rejected"
  | "cancelled"
  | "expired";

export type Profile = {
  id: string;
  role: Role;
  full_name: string;
  phone: string;
  locale: string;
  created_at: string;
};

export type Company = {
  id: string;
  owner_id: string;
  slug: string;
  name_ka: string;
  name_en: string | null;
  name_ru: string | null;
  description_ka: string;
  description_en: string | null;
  description_ru: string | null;
  logo_url: string | null;
  phone: string;
  email: string;
  website: string | null;
  city_ka: string;
  city_en: string;
  city_ru: string;
  address_ka: string;
  address_en: string | null;
  address_ru: string | null;
  nbg_registration_number: string | null;
  status: CompanyStatus;
  verified_at: string | null;
  created_at: string;
};

export type Currency = {
  code: string;
  name_ka: string;
  name_en: string;
  name_ru: string;
  symbol: string;
  decimals: number;
  quote_unit: number;
  is_active: boolean;
  sort_order: number;
};

export type Wallet = {
  id: string;
  owner_type: "user" | "company";
  owner_id: string;
  currency: string;
  available_balance: string;
  reserved_balance: string;
  updated_at: string;
};

export type LedgerEntry = {
  id: string;
  wallet_id: string;
  type: string;
  amount: string;
  currency: string;
  ref_type: string | null;
  ref_id: string | null;
  note: string | null;
  created_at: string;
};

export type CompanyRate = {
  id: string;
  company_id: string;
  base_currency: string;
  quote_currency: string;
  buy_rate: string;
  sell_rate: string;
  min_amount: string | null;
  max_amount: string | null;
  is_active: boolean;
  updated_at: string;
};

export type PublicRate = CompanyRate & {
  slug: string;
  name_ka: string;
  name_en: string | null;
  name_ru: string | null;
  city_ka: string;
  city_en: string;
  city_ru: string;
  company_status: CompanyStatus;
};

export type ExchangeRequest = {
  id: string;
  client_id: string;
  company_id: string;
  from_currency: string;
  to_currency: string;
  from_amount: string;
  to_amount: string;
  rate_used: string;
  rate_side: "buy" | "sell";
  status: RequestStatus;
  client_note: string | null;
  company_note: string | null;
  expires_at: string;
  decided_at: string | null;
  decided_by: string | null;
  created_at: string;
};

export type Notification = {
  id: string;
  user_id: string;
  type: string;
  payload: Record<string, unknown>;
  read_at: string | null;
  ref_type: string | null;
  ref_id: string | null;
  created_at: string;
};

export type SiteSettings = {
  id: number;
  phone: string;
  phone_display: string;
  email: string;
  facebook: string;
  address_street: string;
  address_street_en: string;
  address_street_ru: string;
  address_city: string;
  address_city_en: string;
  address_city_ru: string;
  address_country: string;
  address_country_en: string;
  address_country_ru: string;
  hours_weekday: string;
  hours_weekend: string;
  map_embed_query: string;
};

export const defaultSettings: SiteSettings = {
  id: 1,
  phone: "+995555000000",
  phone_display: "+995 555 00 00 00",
  email: "hello@kursi.ge",
  facebook: "",
  address_street: "რუსთაველის გამზირი",
  address_street_en: "Rustaveli Avenue",
  address_street_ru: "проспект Руставели",
  address_city: "თბილისი",
  address_city_en: "Tbilisi",
  address_city_ru: "Тбилиси",
  address_country: "საქართველო",
  address_country_en: "Georgia",
  address_country_ru: "Грузия",
  hours_weekday: "ორშ – პარ · 09:00 — 19:00",
  hours_weekend: "შაბ · 10:00 — 16:00",
  map_embed_query: "Tbilisi, Georgia",
};
