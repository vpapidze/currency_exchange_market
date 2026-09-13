import Link from "next/link";
import { registerAction } from "@/app/actions/auth";
import { getMessages } from "@/i18n/messages";
import { localizedPath } from "@/lib/i18n";
import { readLocale } from "@/lib/locale-params";

export default async function RegisterPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const locale = await readLocale(params);
  const { error } = await searchParams;
  const m = getMessages(locale);

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="font-display text-4xl">{m.auth.registerTitle}</h1>
      {error && (
        <p className="mt-4 text-sm text-danger">
          {error === "rateLimit" || error.toLowerCase().includes("rate limit")
            ? m.auth.rateLimit
            : error === "hasAccount"
              ? m.auth.hasAccount
              : error}
        </p>
      )}
      <form action={registerAction} className="mt-8 space-y-4 rounded-3xl border border-border bg-paper p-6">
        <input type="hidden" name="locale" value={locale} />
        <fieldset className="grid grid-cols-2 gap-2 text-sm">
          <legend className="mb-2 w-full">{m.auth.role}</legend>
          <label className="rounded-xl border border-border p-3">
            <input type="radio" name="role" value="client" defaultChecked className="mr-2" />
            {m.auth.roleClient}
          </label>
          <label className="rounded-xl border border-border p-3">
            <input type="radio" name="role" value="company" className="mr-2" />
            {m.auth.roleCompany}
          </label>
        </fieldset>
        <label className="block text-sm">
          <span>{m.auth.fullName}</span>
          <input name="full_name" required className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2" />
        </label>
        <label className="block text-sm">
          <span>{m.auth.companyName}</span>
          <input name="company_name" className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2" />
        </label>
        <label className="block text-sm">
          <span>{m.auth.phone}</span>
          <input name="phone" className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2" />
        </label>
        <label className="block text-sm">
          <span>{m.auth.email}</span>
          <input name="email" type="text" required className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2" />
        </label>
        <label className="block text-sm">
          <span>{m.auth.password}</span>
          <input name="password" type="password" minLength={6} required className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2" />
        </label>
        <button type="submit" className="w-full rounded-full bg-pine py-2.5 text-white">
          {m.auth.submitRegister}
        </button>
      </form>
      <p className="mt-4 text-sm text-muted-foreground">
        {m.auth.hasAccount}{" "}
        <Link href={localizedPath(locale, "/login")} className="text-leaf">
          {m.nav.login}
        </Link>
      </p>
    </div>
  );
}
