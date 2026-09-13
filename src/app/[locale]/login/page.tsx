import Link from "next/link";
import { loginAction } from "@/app/actions/auth";
import { getMessages } from "@/i18n/messages";
import { localizedPath } from "@/lib/i18n";
import { readLocale } from "@/lib/locale-params";

export default async function LoginPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ error?: string; checkEmail?: string }>;
}) {
  const locale = await readLocale(params);
  const { error, checkEmail } = await searchParams;
  const m = getMessages(locale);

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="font-display text-4xl">{m.auth.loginTitle}</h1>
      {checkEmail && <p className="mt-4 text-sm text-leaf">{m.auth.checkEmail}</p>}
      {error && (
        <p className="mt-4 text-sm text-danger">
          {error === "emailNotConfirmed" || error === "Email not confirmed"
            ? m.auth.emailNotConfirmed
            : error === "auth"
              ? m.errors.auth
              : error}
        </p>
      )}
      <form action={loginAction} className="mt-8 space-y-4 rounded-3xl border border-border bg-paper p-6">
        <input type="hidden" name="locale" value={locale} />
        <label className="block text-sm">
          <span>{m.auth.email}</span>
          <input
            name="email"
            type="text"
            required
            className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span>{m.auth.password}</span>
          <input
            name="password"
            type="password"
            required
            className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2"
          />
        </label>
        <button type="submit" className="w-full rounded-full bg-pine py-2.5 text-white">
          {m.auth.submitLogin}
        </button>
      </form>
      <p className="mt-4 text-sm text-muted-foreground">
        {m.auth.noAccount}{" "}
        <Link href={localizedPath(locale, "/register")} className="text-leaf">
          {m.nav.register}
        </Link>
      </p>
    </div>
  );
}
