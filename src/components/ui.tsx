import Image from "next/image";
import Link from "next/link";
import { images, serviceHref, site, type Service } from "@/lib/site";

export function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <section className="border-b border-line">
      <div className="container-x grid gap-6 pb-12 pt-14 md:grid-cols-12 md:pb-16 md:pt-20">
        <p className="eyebrow md:col-span-3 md:pt-3">{eyebrow}</p>
        <div className="md:col-span-8">
          <h1 className="display text-[2.25rem] leading-[1.08] md:text-[3.5rem]">{title}</h1>
          {text && <p className="mt-5 max-w-[56ch] text-lg leading-relaxed">{text}</p>}
        </div>
      </div>
    </section>
  );
}

export function Stars({ n = 5 }: { n?: number }) {
  return <span className="tracking-[0.1em] text-clay" aria-label={`${n} out of 5 stars`}>{"★".repeat(n)}</span>;
}

export function RatingBadge() {
  return (
    <span className="inline-flex items-center gap-2 text-sm text-ink-soft">
      <Stars /> <span className="num">{site.rating}</span> from <span className="num">{site.reviewCount}</span> Google reviews
    </span>
  );
}

export function ServiceCard({ s }: { s: Service }) {
  return (
    <Link href={serviceHref(s.slug)} className="lift group flex flex-col overflow-hidden rounded-[20px] bg-white ring-1 ring-line">
      <Photo src={images[s.image].src} label={images[s.image].alt} className="aspect-[16/10] rounded-none" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-2xl text-ink group-hover:text-forest">{s.name}</h3>
        <p className="mt-1.5 flex-1 text-[15px]">{s.short}</p>
        <p className="num mt-4 text-xs text-muted">{s.facts.slice(0, 2).map((f) => `${f.label}: ${f.value}`).join(" · ")}</p>
        <span className="mt-3 text-sm text-forest">Read about it <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">→</span></span>
      </div>
    </Link>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="border-t border-line">
      {items.map((f) => (
        <details key={f.q} className="group border-b border-line">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-5 text-[17px] text-ink [&::-webkit-details-marker]:hidden">
            {f.q}
            <span aria-hidden className="relative h-3 w-3 shrink-0">
              <span className="absolute inset-x-0 top-1/2 h-px bg-ink" />
              <span className="absolute inset-y-0 left-1/2 w-px bg-ink transition-transform duration-300 group-open:scale-y-0" />
            </span>
          </summary>
          <p className="max-w-[62ch] pb-6 leading-relaxed">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/** Image frame. With `src` it renders an optimised next/image; without, a warm sand placeholder with caption. */
export function Photo({ label, src, className = "", sizes = "(min-width: 768px) 50vw, 100vw", priority = false, position = "center" }:
  { label: string; src?: string; className?: string; sizes?: string; priority?: boolean; position?: string }) {
  return (
    <figure className={`relative overflow-hidden rounded-[20px] bg-sand ${className}`}>
      {src ? (
        <Image src={src} alt={label} fill sizes={sizes} priority={priority} className="object-cover" style={{ objectPosition: position }} />
      ) : (
        <>
          <div aria-hidden className="absolute inset-0 opacity-[0.35] [background:repeating-linear-gradient(135deg,transparent_0_14px,rgba(28,35,33,0.06)_14px_15px)]" />
          <figcaption className="absolute bottom-3 left-3 rounded-full bg-paper/85 px-3 py-1 text-xs text-muted">{label}</figcaption>
        </>
      )}
    </figure>
  );
}

/** Monogram stand-in for staff portraits until real photos are supplied — reads as intentional, not empty. */
export function Monogram({ name, className = "" }: { name: string; className?: string }) {
  const initials = name.replace(/^Dr\.?\s*/, "").split(" ").map((w) => w[0]).slice(0, 2).join("");
  return (
    <div className={`grid place-items-center rounded-[20px] bg-forest text-paper ${className}`}>
      <span className="font-serif text-6xl tracking-[-0.02em] md:text-7xl">{initials}</span>
    </div>
  );
}

export function CtaBand({ title = "Come in for a conversation first.", text = "A first visit is a talk and a check — no treatment unless you ask for it." }) {
  return (
    <section className="bg-stone">
      <div className="container-x grid gap-8 py-16 md:grid-cols-12 md:items-end md:py-20">
        <div className="md:col-span-7">
          <h2 className="h2">{title}</h2>
          <p className="mt-3 max-w-[48ch] text-lg">{text}</p>
        </div>
        <div className="flex flex-wrap gap-3 md:col-span-5 md:justify-end">
          <Link href="/book-appointment" className="btn-primary">Book a visit</Link>
          <a href={site.phoneHref} className="btn-outline num">Call {site.phone}</a>
        </div>
      </div>
    </section>
  );
}
