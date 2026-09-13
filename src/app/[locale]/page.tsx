import Link from "next/link";
import { getMessages } from "@/i18n/messages";
import { localizedPath } from "@/lib/i18n";
import { readLocale } from "@/lib/locale-params";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await readLocale(params);
  const m = getMessages(locale);

  return (
    <>
      <section className="hero-grid text-white">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-gold">
            {m.home.kicker}
          </p>
          <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[1.05] sm:text-7xl">
            {m.home.title}
          </h1>
          <p className="mt-6 max-w-xl text-base text-white/75">{m.home.body}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href={localizedPath(locale, "/rates")}
              className="rounded-full bg-gold px-6 py-3 text-sm text-ink"
            >
              {m.home.ctaRates}
            </Link>
            <Link
              href={localizedPath(locale, "/register")}
              className="rounded-full border border-white/30 px-6 py-3 text-sm"
            >
              {m.home.ctaRegister}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:px-6 md:grid-cols-3">
        {[
          [m.home.stat1, m.home.stat1l],
          [m.home.stat2, m.home.stat2l],
          [m.home.stat3, m.home.stat3l],
        ].map(([v, l]) => (
          <div key={l} className="rounded-3xl border border-border bg-paper p-6">
            <p className="font-display text-4xl text-leaf">{v}</p>
            <p className="mt-2 text-sm text-muted-foreground">{l}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <h2 className="font-display text-4xl">{m.home.howTitle}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            [m.home.how1t, m.home.how1d],
            [m.home.how2t, m.home.how2d],
            [m.home.how3t, m.home.how3d],
          ].map(([t, d], i) => (
            <article key={t} className="rounded-3xl border border-border bg-paper p-6">
              <p className="font-mono text-xs text-gold">0{i + 1}</p>
              <h3 className="mt-3 font-display text-2xl">{t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </article>
          ))}
        </div>
        <div className="mt-12 rounded-3xl bg-pine px-6 py-10 text-white">
          <h2 className="font-display text-3xl">{m.home.marketTitle}</h2>
          <p className="mt-4 max-w-3xl text-white/75">{m.home.marketBody}</p>
        </div>
      </section>
    </>
  );
}
