import { getMessages } from "@/i18n/messages";
import { readLocale } from "@/lib/locale-params";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await readLocale(params);
  const m = getMessages(locale);
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-5xl">{m.about.title}</h1>
      <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground">
        <p>{m.about.body1}</p>
        <p>{m.about.body2}</p>
        <p>{m.about.body3}</p>
      </div>
    </article>
  );
}
