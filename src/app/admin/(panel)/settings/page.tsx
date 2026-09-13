import { updateSettingsAction } from "@/app/actions/admin";
import { getSiteSettings } from "@/lib/data";

export default async function AdminSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const s = await getSiteSettings();
  const q = await searchParams;
  const fields: Array<[string, string, string]> = [
    ["phone", "Phone", s.phone],
    ["phone_display", "Phone display", s.phone_display],
    ["email", "Email", s.email],
    ["facebook", "Facebook", s.facebook],
    ["address_street", "Street KA", s.address_street],
    ["address_street_en", "Street EN", s.address_street_en],
    ["address_street_ru", "Street RU", s.address_street_ru],
    ["address_city", "City KA", s.address_city],
    ["address_city_en", "City EN", s.address_city_en],
    ["address_city_ru", "City RU", s.address_city_ru],
    ["hours_weekday", "Hours week", s.hours_weekday],
    ["hours_weekend", "Hours weekend", s.hours_weekend],
  ];

  return (
    <form action={updateSettingsAction} className="space-y-3 rounded-2xl border border-border bg-paper p-6">
      <h1 className="font-display text-3xl">პარამეტრები</h1>
      {q.saved && <p className="text-success">შენახულია</p>}
      {q.error && <p className="text-danger">{q.error}</p>}
      {fields.map(([name, label, value]) => (
        <label key={name} className="block text-sm">
          {label}
          <input
            name={name}
            defaultValue={value}
            className="mt-1 w-full rounded-xl border border-border px-3 py-2"
          />
        </label>
      ))}
      <button className="rounded-full bg-pine px-6 py-2 text-white">შენახვა</button>
    </form>
  );
}
