import { updateCompanyProfileAction } from "@/app/actions/company";
import { getMessages } from "@/i18n/messages";
import { requireRole } from "@/lib/auth";
import { readLocale } from "@/lib/locale-params";

export default async function CompanyProfilePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const locale = await readLocale(params);
  const { company } = await requireRole(locale, ["company"]);
  const q = await searchParams;
  const m = getMessages(locale);
  if (!company) {
    return (
      <div className="rounded-2xl border border-gold bg-gold-soft p-6">
        <h1 className="font-display text-3xl">{m.company.profileTitle}</h1>
        <p className="mt-3 text-sm">{m.company.missingCompany}</p>
      </div>
    );
  }

  return (
    <form action={updateCompanyProfileAction} className="space-y-4 rounded-2xl border border-border bg-paper p-6">
      <h1 className="font-display text-3xl">{m.company.profileTitle}</h1>
      {q.saved && <p className="text-sm text-success">{m.company.saved}</p>}
      {q.error && <p className="text-sm text-danger">{q.error}</p>}
      <input type="hidden" name="locale" value={locale} />
      {[
        ["name_ka", m.company.nameKa, company.name_ka],
        ["name_en", m.company.nameEn, company.name_en ?? ""],
        ["name_ru", m.company.nameRu, company.name_ru ?? ""],
        ["description_ka", m.company.descKa, company.description_ka],
        ["phone", m.auth.phone, company.phone],
        ["email", m.auth.email, company.email],
        ["city_ka", m.company.city, company.city_ka],
        ["city_en", "City EN", company.city_en],
        ["city_ru", "Город", company.city_ru],
        ["address_ka", m.company.address, company.address_ka],
        ["nbg_registration_number", m.company.nbg, company.nbg_registration_number ?? ""],
      ].map(([name, label, value]) => (
        <label key={name} className="block text-sm">
          <span>{label}</span>
          <input
            name={name}
            defaultValue={value}
            className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2"
          />
        </label>
      ))}
      <button type="submit" className="rounded-full bg-pine px-6 py-2 text-white">
        {m.company.save}
      </button>
    </form>
  );
}
