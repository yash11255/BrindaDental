import Link from "next/link";
import { fullAddress, site } from "@/lib/site";

export const legalPages = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
  { href: "/medical-disclaimer", label: "Medical Disclaimer" },
  { href: "/cookie-policy", label: "Cookie Policy" },
  { href: "/appointment-policy", label: "Appointment & Cancellation" },
  { href: "/accessibility", label: "Accessibility" },
];

export const LEGAL_UPDATED = "23 November 2026";

/** Shared layout for compliance pages: title band, sticky table of contents, readable prose. */
export default function LegalPage({ title, intro, sections }: {
  title: string;
  intro: string;
  sections: { id: string; heading: string; body: React.ReactNode }[];
}) {
  return (
    <>
      <section className="border-b border-line bg-stone">
        <div className="container-x py-12 md:py-16">
          <nav aria-label="Breadcrumb" className="text-sm text-muted"><Link href="/" className="hover:underline">Home</Link> / Legal</nav>
          <h1 className="mt-3 font-serif text-3xl font-bold text-ink md:text-[2.75rem]">{title}</h1>
          <p className="mt-3 max-w-[70ch] text-[17px] leading-relaxed text-muted">{intro}</p>
          <p className="mt-4 text-sm text-muted">Last updated: {LEGAL_UPDATED}</p>
        </div>
      </section>
      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow">On this page</p>
              <ol className="mt-3 space-y-2 text-[15px]">
                {sections.map((s, i) => (
                  <li key={s.id}><a href={`#${s.id}`} className="text-ink-soft hover:text-forest"><span className="num text-muted">{i + 1}.</span> {s.heading}</a></li>
                ))}
              </ol>
              <p className="eyebrow mt-8">Other policies</p>
              <ul className="mt-3 space-y-2 text-[15px]">
                {legalPages.filter((p) => p.label !== title).map((p) => (
                  <li key={p.href}><Link href={p.href} className="text-forest hover:underline">{p.label}</Link></li>
                ))}
              </ul>
            </div>
          </aside>
          <article className="max-w-[72ch] lg:col-span-8 lg:col-start-5">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-28 border-b border-line py-7 first:pt-0 last:border-0">
                <h2 className="font-serif text-xl font-bold text-ink"><span className="num text-clay">{i + 1}.</span> {s.heading}</h2>
                <div className="mt-3 space-y-3 text-[16px] leading-relaxed text-ink-soft [&_a]:text-forest [&_a]:underline [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-1.5">{s.body}</div>
              </section>
            ))}
            <div className="mt-8 rounded-2xl bg-forest-tint p-6 text-[15px] leading-relaxed">
              <p className="font-semibold text-ink">Questions about this policy?</p>
              <p className="mt-1">Contact {site.name}, {fullAddress} · <a href={site.phoneHref} className="num text-forest underline">{site.phone}</a> · <a href={`mailto:${site.email}`} className="text-forest underline">{site.email}</a></p>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
