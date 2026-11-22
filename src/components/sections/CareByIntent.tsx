"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { careGroups, formatFrom, serviceHref } from "@/lib/site";
import { Photo } from "@/components/ui";

/**
 * WAI-ARIA tabs (manual activation via arrows/Home/End).
 * Desktop: numbered tab list (4 cols) + image & panel (8 cols).
 * Mobile: horizontal scroll chips above, image + cards stacked.
 *
 * NOTE: add an `image: { src, alt }` field to each care group in
 * @/lib/site for the crossfading photo banner. Falls back to a
 * gradient tile if missing.
 */
export default function CareByIntent() {
  const [active, setActive] = useState(0);
  const base = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  /* Parallax: write scroll progress (0 → 1 while the section crosses the viewport) to --p.
     Layers translate by different multiples of it, so they drift at different speeds.
     rAF-throttled, passive listener, and skipped entirely for reduced-motion users. */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      el.style.setProperty("--p", p.toFixed(4));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // translateY = (p − 0.5) × speed px → layer sits at rest when the section is centred
  const drift = (speed: number, extra = ""): CSSProperties => ({
    transform: `translate3d(0, calc((var(--p, 0.5) - 0.5) * ${speed}px), 0) ${extra}`,
    willChange: "transform",
  });

  const onKey = (e: KeyboardEvent) => {
    const last = careGroups.length - 1;
    const next = { ArrowDown: active + 1, ArrowRight: active + 1, ArrowUp: active - 1, ArrowLeft: active - 1, Home: 0, End: last }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    const i = (next + careGroups.length) % careGroups.length;
    setActive(i);
    tabs.current[i]?.focus();
  };

  const g = careGroups[active];

  return (
    <section ref={sectionRef} className="section relative overflow-clip" aria-labelledby={`${base}-h`}>
      {/* Background layers — slowest-moving depth */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-paper via-stone/40 to-paper" />
        <div className="absolute -left-32 top-1/4 h-[380px] w-[380px] rounded-full bg-clay/[0.10] blur-3xl" style={drift(-260)} />
        <div className="absolute -right-24 bottom-0 h-[320px] w-[320px] rounded-full bg-forest/[0.08] blur-3xl" style={drift(200)} />
        {/* oversized outline word drifting sideways */}
        <p
          className="absolute left-0 top-16 whitespace-nowrap font-serif text-[18vw] leading-none text-transparent [-webkit-text-stroke:1px_rgba(28,35,33,0.07)] md:top-24"
          style={{ transform: "translate3d(calc((var(--p, 0.5) - 0.5) * -320px), 0, 0)", willChange: "transform" }}
        >
          Care · Comfort · Care
        </p>
      </div>

      <div className="container-x relative">
        {/* ── Header ── */}
        <div data-reveal className="grid gap-4 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <div className="inline-flex items-center gap-2.5">
              <span className="h-px w-6 bg-clay/60" aria-hidden />
              <p className="eyebrow tracking-wider text-muted">Treatments</p>
            </div>
            <h2 id={`${base}-h`} className="h2 mt-3 max-w-[16ch]">
              Start with what&apos;s{" "}
              <em className="font-normal italic text-clay">bothering you</em>,
              not a list of procedures.
            </h2>
          </div>
          <p className="text-[15px] leading-relaxed text-ink/70 md:col-span-4 md:text-right">
            Honest chair time, visit counts, and prices — before you sit down.
          </p>
        </div>

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12">
          {/* ── Tab list ── */}
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-label="Care by need"
            onKeyDown={onKey}
            style={drift(-50)}
            className="no-scrollbar -mx-5 flex gap-2.5 overflow-x-auto px-5 md:col-span-4 md:mx-0 md:flex-col md:gap-0 md:overflow-visible md:px-0"
          >
            {careGroups.map((c, i) => (
              <button
                key={c.id}
                ref={(el) => { tabs.current[i] = el; }}
                role="tab"
                id={`${base}-t-${c.id}`}
                aria-selected={i === active}
                aria-controls={`${base}-p-${c.id}`}
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
                className="group relative shrink-0 rounded-full border border-ink/15 px-4 py-2.5 text-left text-[15px] transition-all duration-200 aria-selected:border-ink aria-selected:bg-ink aria-selected:text-paper aria-selected:shadow-md md:rounded-none md:border-0 md:border-l-2 md:border-l-transparent md:px-5 md:py-6 md:aria-selected:border-l-clay md:aria-selected:bg-transparent md:aria-selected:text-ink md:aria-selected:shadow-none"
              >
                <span className="flex items-center gap-3">
                  <span className="num hidden text-sm text-muted md:block">0{i + 1}</span>
                  <span className="md:font-serif md:text-[1.65rem] md:leading-tight md:text-ink/45 md:transition-colors md:duration-200 md:group-hover:text-ink/80 md:group-aria-selected:text-ink">
                    {c.label}
                  </span>
                </span>
                <span className="num ml-1 text-xs opacity-70 md:ml-9 md:mt-1 md:block md:text-muted">
                  {c.items.length} treatment{c.items.length === 1 ? "" : "s"}
                </span>
              </button>
            ))}
          </div>

          {/* ── Panel: image banner + cards ── */}
          <div
            role="tabpanel"
            id={`${base}-p-${g.id}`}
            aria-labelledby={`${base}-t-${g.id}`}
            tabIndex={0}
            data-reveal
            className="md:col-span-8"
          >
            <div className="overflow-hidden rounded-[28px] border border-line/60 bg-paper shadow-[0_28px_70px_-30px_rgba(28,35,33,0.35)]">
              {/* Image banner — crossfades on tab change */}
              <div className="relative h-52 overflow-hidden sm:h-64 md:h-80">
                {g.image ? (
                  <div className="absolute -inset-y-[18%] inset-x-0" style={drift(-140)}>
                  <Photo
                    key={g.id}
                    src={g.image.src}
                    label={g.image.alt}
                    position="50% 45%"
                    className="h-full w-full !rounded-none motion-safe:animate-[fade_.5s_var(--ease-calm)]"
                    sizes="(min-width: 768px) 60vw, 100vw"
                  />
                  </div>
                ) : (
                  <div
                    key={g.id}
                    className="h-full w-full bg-gradient-to-br from-stone via-clay/15 to-forest/10 motion-safe:animate-[fade_.5s_var(--ease-calm)]"
                  />
                )}
                {/* gradient scrim + label */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" aria-hidden />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6" style={drift(30)}>
                  <div>
                    <p className="eyebrow !text-paper/70 tracking-wider">0{active + 1} — {g.label}</p>
                    <p key={g.id} className="mt-1.5 max-w-[46ch] text-[15px] leading-relaxed text-paper/95 motion-safe:animate-[fade_.5s_var(--ease-calm)] sm:text-base">
                      {g.lede}
                    </p>
                  </div>
                  <span className="num hidden shrink-0 rounded-full bg-paper/15 px-3 py-1 text-xs font-medium text-paper backdrop-blur-sm sm:block">
                    {g.items.length} treatment{g.items.length === 1 ? "" : "s"}
                  </span>
                </div>
              </div>

              {/* Treatment cards */}
              <ul key={g.id} data-reveal-stagger className="is-in divide-y divide-line/70">
                {g.items.map((it) => (
                  <li key={it.name}>
                    <div className="group grid gap-x-8 gap-y-3 px-5 py-5 transition-colors hover:bg-stone/50 sm:grid-cols-[1fr_auto] sm:px-7 sm:py-6">
                      <div>
                        <h3 className="text-[17px] font-medium text-ink">
                          {it.slug ? (
                            <Link href={serviceHref(it.slug)} className="inline-flex items-center gap-1.5 transition-colors hover:text-forest">
                              {it.name}
                              <span aria-hidden className="text-forest transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                            </Link>
                          ) : (
                            it.name
                          )}
                        </h3>
                        <p className="mt-1.5 max-w-[54ch] text-[15px] leading-relaxed text-ink/70">{it.note}</p>
                      </div>
                      {/* fact chips */}
                      <dl className="num flex flex-wrap items-center gap-2 sm:flex-nowrap sm:items-center sm:gap-2.5">
                        <div className="flex items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1.5 text-xs text-ink sm:border-0 sm:bg-transparent sm:px-0">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden className="text-muted">
                            <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                          </svg>
                          <dt className="sr-only">Chair time</dt>
                          <dd>{it.duration}</dd>
                        </div>
                        <div className="flex items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1.5 text-xs text-ink sm:border-0 sm:bg-transparent sm:px-0">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="text-muted">
                            <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                          </svg>
                          <dt className="sr-only">Visits</dt>
                          <dd>{it.visits}</dd>
                        </div>
                        <div className="rounded-full bg-clay/10 px-3 py-1.5 text-xs font-semibold text-clay">
                          <dt className="sr-only">Starting price</dt>
                          <dd>{formatFrom(it.from)}</dd>
                        </div>
                      </dl>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Footer strip */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line/70 bg-stone/50 px-5 py-4 sm:px-7">
                <p className="text-[13px] text-muted">
                  Written, itemised estimate before treatment begins.
                </p>
                <Link
                  href="/book-appointment"
                  className="btn-primary !px-5 !py-2.5 text-sm shadow-sm transition-transform active:scale-[0.98]"
                >
                  Book a consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}