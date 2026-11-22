"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { instagram, nav, serviceHref, services, site, whatsappLink } from "@/lib/site";
import Icon, { serviceIcon } from "@/components/Icon";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);
  const active = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  useEffect(() => { setOpen(false); setMega(false); }, [pathname]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    drawerRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [open]);

  const dental = services.filter((s) => s.category !== "Aesthetics");

  return (
    <>
      {/* ── Top info bar ── */}
      <div className="hidden bg-ink text-[13px] text-paper/80 md:block">
        <div className="container-x flex h-10 items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5"><Icon name="clock" size={15} /> {site.hours}</span>
            <span className="flex items-center gap-1.5"><Icon name="pin" size={15} /> Ram Bagh Road, Sadar Bazar, Ambala Cantt</span>
          </div>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5"><span className="text-amber-400">★</span> {site.rating} · {site.reviewCount} Google reviews</span>
            <a href={whatsappLink()} target="_blank" rel="noopener" className="hover:text-paper">WhatsApp</a>
            <a href={instagram.url} target="_blank" rel="noopener" className="hover:text-paper">Instagram</a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-line bg-white/95 shadow-[0_4px_20px_-12px_rgba(22,34,46,0.25)] backdrop-blur-md">
        <div className="container-x flex h-[72px] items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3" aria-label={`${site.name} — home`}>
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-clay font-serif text-lg font-bold text-white">B</span>
            <span className="leading-tight">
              <span className="block font-serif text-[17px] font-bold text-ink">Dr. Bindra</span>
              <span className="block text-[12px] font-medium uppercase tracking-[0.08em] text-clay">Dental Care Centre</span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) =>
                item.href === "/services" ? (
                  <li key={item.href} className="relative" onMouseEnter={() => setMega(true)} onMouseLeave={() => setMega(false)}>
                    <button type="button" aria-expanded={mega} aria-controls="mega" onClick={() => setMega((v) => !v)}
                      className={`flex items-center gap-1 whitespace-nowrap rounded-lg px-3 py-2.5 text-[15px] font-medium transition-colors hover:bg-stone hover:text-forest ${active("/services") ? "text-forest" : "text-ink"}`}>
                      {item.label}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className={`transition-transform ${mega ? "rotate-180" : ""}`}><path d="m6 9 6 6 6-6" /></svg>
                    </button>
                    {/* Mega menu */}
                    <div id="mega" hidden={!mega} className="absolute left-1/2 top-full w-[720px] -translate-x-1/2 pt-3">
                      <div className="grid grid-cols-[1fr_220px] overflow-hidden rounded-2xl border border-line bg-white shadow-[0_24px_60px_-20px_rgba(22,34,46,0.35)]">
                        <ul className="grid grid-cols-2 gap-1 p-4">
                          {dental.map((s) => (
                            <li key={s.slug}>
                              <Link href={serviceHref(s.slug)} className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-stone">
                                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-forest-tint text-forest transition-colors group-hover:bg-forest group-hover:text-white"><Icon name={serviceIcon[s.slug]} size={20} /></span>
                                <span>
                                  <span className="block text-[14px] font-semibold text-ink">{s.name}</span>
                                  <span className="block text-[12.5px] leading-snug text-muted">{s.short}</span>
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <div className="flex flex-col justify-between bg-ink p-5 text-paper/80">
                          <div>
                            <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#f2b8ad]">Cosmetology</p>
                            <p className="mt-2 font-serif text-lg text-white">Skin & laser care by Dr. Sukhmani</p>
                            <Link href="/cosmetology" className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-white hover:underline">Explore <Icon name="arrow" size={15} /></Link>
                          </div>
                          <Link href="/services" className="mt-6 rounded-lg bg-white/10 px-3 py-2.5 text-center text-sm font-medium text-white hover:bg-white/15">All treatments</Link>
                        </div>
                      </div>
                    </div>
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link href={item.href} aria-current={active(item.href) ? "page" : undefined}
                      className="whitespace-nowrap rounded-lg px-3 py-2.5 text-[15px] font-medium text-ink transition-colors hover:bg-stone hover:text-forest aria-[current=page]:text-forest">
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a href={site.phoneHref} className="hidden items-center gap-2.5 2xl:flex">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-forest-tint text-forest"><Icon name="phone" size={18} /></span>
              <span className="leading-tight">
                <span className="block text-[11px] font-medium uppercase tracking-wide text-muted">Call us</span>
                <span className="num block text-[15px] font-semibold text-ink">{site.phone}</span>
              </span>
            </a>
            <Link href="/book-appointment" className="btn-primary hidden whitespace-nowrap !rounded-xl shadow-[0_8px_20px_-8px_rgba(198,71,58,0.6)] sm:inline-flex">Book Appointment</Link>
            <button type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-drawer"
              onClick={() => setOpen((v) => !v)} className="relative grid h-11 w-11 place-items-center rounded-xl border border-line lg:hidden">
              <span className={`absolute h-0.5 w-5 rounded bg-ink transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[5px]"}`} />
              <span className={`absolute h-0.5 w-5 rounded bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`absolute h-0.5 w-5 rounded bg-ink transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-[5px]"}`} />
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div id="mobile-drawer" ref={drawerRef} hidden={!open} className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto bg-white lg:hidden">
          <nav aria-label="Mobile" className="container-x flex min-h-full flex-col pb-10 pt-4">
            <p className="eyebrow mb-2 mt-2">Treatments</p>
            <ul className="grid grid-cols-2 gap-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={serviceHref(s.slug)} className="flex items-center gap-2.5 rounded-xl border border-line p-3 text-[14px] font-medium text-ink">
                    <span className="text-forest"><Icon name={serviceIcon[s.slug]} size={18} /></span>{s.name}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {nav.filter((n) => n.href !== "/services").map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="flex items-center justify-between py-4 text-lg font-semibold text-ink">
                    {item.label} <Icon name="arrow" size={18} className="text-muted" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-auto space-y-3 pt-8">
              <Link href="/book-appointment" className="btn-primary w-full !rounded-xl">Book Appointment</Link>
              <a href={site.phoneHref} className="btn-outline num w-full !rounded-xl">Call {site.phone}</a>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
