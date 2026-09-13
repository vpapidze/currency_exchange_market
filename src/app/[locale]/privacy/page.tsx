import { getMessages } from "@/i18n/messages";
import { readLocale } from "@/lib/locale-params";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await readLocale(params);
  const m = getMessages(locale);
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-5xl">{m.privacy.title}</h1>
      <p className="mt-3 text-sm text-muted-foreground">{m.privacy.updated}</p>
      <div className="mt-8 space-y-4 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
        {m.privacy.body}
      </div>
    </article>
  );
}
