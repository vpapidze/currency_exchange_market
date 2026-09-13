import { contactAction } from "@/app/actions/admin";
import { getMessages } from "@/i18n/messages";
import { getSiteSettings } from "@/lib/data";
import { readLocale } from "@/lib/locale-params";

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ sent?: string; error?: string }>;
}) {
  const locale = await readLocale(params);
  const { sent, error } = await searchParams;
  const [m, s] = [getMessages(locale), await getSiteSettings()];

  return (
    <div className="mx-auto grid max-w-5xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2">
      <div>
        <h1 className="font-display text-5xl">{m.contact.title}</h1>
        <p className="mt-4 text-muted-foreground">{m.contact.body}</p>
        <p className="mt-8 text-sm">
          {s.phone_display}
          <br />
          {s.email}
        </p>
      </div>
      <form action={contactAction} className="rounded-3xl border border-border bg-paper p-6">
        <input type="hidden" name="locale" value={locale} />
        {sent && <p className="mb-4 text-sm text-success">{m.contact.sent}</p>}
        {error && <p className="mb-4 text-sm text-danger">{error}</p>}
        <label className="block text-sm">
          <span>{m.contact.name}</span>
          <input
            name="name"
            required
            className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2"
          />
        </label>
        <label className="mt-3 block text-sm">
          <span>{m.contact.email}</span>
          <input
            name="email"
            type="text"
            required
            className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2"
          />
        </label>
        <label className="mt-3 block text-sm">
          <span>{m.contact.message}</span>
          <textarea
            name="message"
            required
            rows={5}
            className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2"
          />
        </label>
        <button type="submit" className="mt-5 w-full rounded-full bg-pine py-2.5 text-white">
          {m.contact.send}
        </button>
      </form>
    </div>
  );
}
