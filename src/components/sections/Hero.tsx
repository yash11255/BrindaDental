import Link from "next/link";
import { images, site } from "@/lib/site";
import { Photo } from "@/components/ui";

/**
 * Modern clinic hero — asymmetric split with floating glass card,
 * ambient gradient mesh, Google 5-star rating, trust-first hierarchy.
 */
export default function Hero() {
  return (
    <section className="relative overflow-x-clip">
      {/* ── Ambient background: soft glows + faint grid texture ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-stone via-paper/60 to-paper" />
        <div className="absolute -top-32 right-0 h-[420px] w-[420px] rounded-full bg-clay/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-[360px] w-[360px] rounded-full bg-forest/10 blur-3xl" />
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(28,35,33,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(28,35,33,0.03)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_0%,black_40%,transparent_100%)]" />
      </div>

      <div className="container-x relative grid items-center gap-12 pb-20 pt-12 md:grid-cols-12 md:gap-10 md:pb-24 md:pt-20">

        {/* ══ Left: Content ═══════════════════════════════ */}
        <div className="hero-rise flex flex-col md:col-span-7 lg:pr-16">

          {/* Availability pill */}
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-forest/20 bg-forest/[0.07] px-3.5 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-forest opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-forest" />
            </span>
            <span className="text-[13px] font-medium text-forest">
              Open today · Walk-ins welcome
            </span>
          </div>

          {/* Eyebrow */}
          <div className="mt-6 inline-flex items-center gap-2.5">
            <span className="h-px w-6 bg-clay/60" aria-hidden />
            <p className="eyebrow tracking-wider text-muted">
              Sadar Bazar, Ambala Cantt · Est. {site.since}
            </p>
          </div>

          {/* Headline */}
          <h1 className="display mt-5 text-[2.5rem] leading-[1.06] tracking-tight text-ink sm:text-[3.25rem] md:text-[3.75rem] lg:text-[4.25rem]">
            Dentistry that takes
            <br className="hidden sm:block" /> its{" "}
            <em className="font-normal italic text-clay">time</em> with you.
          </h1>

          <p className="mt-6 max-w-[46ch] text-base leading-relaxed text-ink/80 sm:text-lg">
            We explain before we examine, and we price before we treat.
            If you&apos;ve been putting off the dentist, this is a calm
            place to start again.
          </p>

          {/* CTA row */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/book-appointment"
              className="btn-primary shadow-lg shadow-clay/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-clay/25 active:translate-y-0 active:scale-[0.98]"
            >
              Book a visit
            </Link>
            <a
              href={`tel:${site.phone}`}
              className="group inline-flex items-center gap-2.5 rounded-xl border border-line bg-paper px-4 py-2.5 text-[15px] font-medium text-ink/90 transition-all hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-sm"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-clay" aria-hidden>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>{site.phoneDisplay ?? "Call the clinic"}</span>
            </a>
          </div>

          <Link
            href="/faqs"
            className="group mt-4 inline-flex w-fit items-center gap-1.5 text-[15px] font-medium text-ink/70 transition-colors hover:text-clay"
          >
            <span>What happens at a first visit</span>
            <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>

          {/* Trust footer */}
          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-line/80 pt-5 text-sm text-ink/85">
            {/* Google 5-star rating (all sizes) */}
            <span className="flex items-center gap-2.5">
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
                <path fill="#4285F4" d="M23.5 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.45a5.52 5.52 0 0 1-2.4 3.62v3h3.86c2.27-2.09 3.59-5.17 3.59-8.81z" />
                <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.86-3c-1.07.72-2.44 1.15-4.08 1.15-3.13 0-5.79-2.12-6.73-4.96H1.29v3.09A12 12 0 0 0 12 24z" />
                <path fill="#FBBC05" d="M5.27 14.28A7.2 7.2 0 0 1 4.9 12c0-.79.14-1.56.37-2.28v-3.1H1.29a12 12 0 0 0 0 10.76l3.98-3.1z" />
                <path fill="#EA4335" d="M12 4.77c1.76 0 3.35.61 4.6 1.8l3.42-3.42A11.97 11.97 0 0 0 12 0 12 12 0 0 0 1.29 6.62l3.98 3.1C6.21 6.88 8.87 4.77 12 4.77z" />
              </svg>
              <span className="font-semibold text-ink">5.0</span>
              <span className="flex gap-0.5 text-[#FBBC05]" aria-label="5 out of 5 stars on Google">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 2l2.9 6.26 6.6 1.04-4.9 4.5 1.3 6.7L12 17.8l-5.9 3.7 1.3-6.7-4.9-4.5 6.6-1.04z" />
                  </svg>
                ))}
              </span>
              <span className="text-ink/60">on Google</span>
            </span>

            <span className="hidden h-4 w-px bg-line sm:inline-block" aria-hidden />
            <span className="hidden items-center gap-2 text-ink/70 md:flex">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-forest" aria-hidden>
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Same-day slots for pain — call before noon
            </span>
          </div>
        </div>

        {/* ══ Right: Photo + floating glass card ══════════ */}
        <div className="relative motion-safe:animate-[rise_1s_var(--ease-calm)_both] md:col-span-5">
          <div className="group overflow-hidden rounded-3xl border border-line/50 shadow-[0_24px_60px_-24px_rgba(28,35,33,0.25)] transition-shadow duration-500 hover:shadow-[0_32px_80px_-24px_rgba(28,35,33,0.32)]">
            <Photo
              src={images.checkup.src}
              label={images.checkup.alt}
              priority
              position="60% 40%"
              className="kenburns aspect-[4/5] w-full object-cover md:aspect-[5/6]"
              sizes="(min-width: 768px) 42vw, 100vw"
            />
          </div>

          {/* Floating glass info card */}
          <div className="relative z-10 -mt-12 mx-4 rounded-2xl border border-white/60 bg-paper/80 p-5 shadow-[0_16px_40px_-12px_rgba(28,35,33,0.25)] backdrop-blur-xl sm:absolute sm:-bottom-6 sm:-left-10 sm:mx-0 sm:w-72">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wider text-muted">Open today</p>
              <span className="rounded-full bg-forest/10 px-2.5 py-1 text-[11px] font-medium text-forest">
                Walk-ins welcome
              </span>
            </div>
            <p className="num mt-2 text-base font-medium text-ink">{site.hours}</p>
            <div className="mt-3 h-px bg-line/70" />
            <p className="mt-3 text-[13px] leading-relaxed text-ink/60">
              Sterilized instruments, transparent pricing, gentle hands.
            </p>
          </div>

          {/* Floating Google rating chip (desktop) */}
          <div className="absolute -right-3 -top-4 hidden animate-[rise_1.2s_var(--ease-calm)_0.3s_both] rounded-2xl border border-line/60 bg-paper/90 px-4 py-3 shadow-lg backdrop-blur-md md:block">
            <div className="flex items-center gap-3">
              <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
                <path fill="#4285F4" d="M23.5 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.45a5.52 5.52 0 0 1-2.4 3.62v3h3.86c2.27-2.09 3.59-5.17 3.59-8.81z" />
                <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.86-3c-1.07.72-2.44 1.15-4.08 1.15-3.13 0-5.79-2.12-6.73-4.96H1.29v3.09A12 12 0 0 0 12 24z" />
                <path fill="#FBBC05" d="M5.27 14.28A7.2 7.2 0 0 1 4.9 12c0-.79.14-1.56.37-2.28v-3.1H1.29a12 12 0 0 0 0 10.76l3.98-3.1z" />
                <path fill="#EA4335" d="M12 4.77c1.76 0 3.35.61 4.6 1.8l3.42-3.42A11.97 11.97 0 0 0 12 0 12 12 0 0 0 1.29 6.62l3.98 3.1C6.21 6.88 8.87 4.77 12 4.77z" />
              </svg>
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-semibold text-ink">5.0</p>
                  <span className="flex gap-0.5 text-[#FBBC05]" aria-label="5 out of 5 stars">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M12 2l2.9 6.26 6.6 1.04-4.9 4.5 1.3 6.7L12 17.8l-5.9 3.7 1.3-6.7-4.9-4.5 6.6-1.04z" />
                      </svg>
                    ))}
                  </span>
                </div>
                <p className="mt-0.5 text-[11px] leading-tight text-ink/60">Google Reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}