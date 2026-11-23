import Link from "next/link";
import { legalPages } from "@/components/LegalPage";
import { fullAddress, instagram, mapsLink, serviceHref, services, site, whatsappLink } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-ink text-[15px] text-white/70">
      {/* Urgent line sits above the grid: the one thing someone in pain needs */}
      <div className="border-b border-white/10">
        <div className="container-x flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-white">In pain right now? <span className="text-white/60">Call before noon for a same-day slot.</span></p>
          <a href={site.phoneHref} className="num text-lg text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">{site.phone}</a>
        </div>
      </div>

      <div className="container-x grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-serif text-3xl tracking-[-0.02em] text-white">Bindra Dental Care</p>
          <p className="mt-3 max-w-sm">Unhurried dentistry in Sadar Bazar, Ambala Cantt — since {site.since}.</p>
          <address className="mt-8 not-italic leading-relaxed">{fullAddress}</address>
          <a href={mapsLink} target="_blank" rel="noopener" className="mt-2 inline-block text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">Directions</a>
        </div>
        <div className="md:col-span-3">
          <p className="mb-4 text-xs uppercase tracking-[0.16em] text-white/45">Treatments</p>
          <ul className="space-y-2.5">
            {services.map((s) => (
              <li key={s.slug}><Link href={serviceHref(s.slug)} className="hover:text-white">{s.name}</Link></li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="mb-4 text-xs uppercase tracking-[0.16em] text-white/45">Clinic</p>
          <ul className="space-y-2.5">
            {[["Care team", "/dentists"], ["First visit", "/faqs"], ["About", "/about"], ["Gallery", "/gallery"], ["Reviews", "/testimonials"]].map(([l, h]) => (
              <li key={h}><Link href={h} className="hover:text-white">{l}</Link></li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="mb-4 text-xs uppercase tracking-[0.16em] text-white/45">Hours</p>
          <p className="num">{site.hours}</p>
          <p className="mt-1">Sunday closed</p>
          <a href={whatsappLink()} target="_blank" rel="noopener" className="mt-4 inline-block hover:text-white">WhatsApp →</a>
          <a href={instagram.url} target="_blank" rel="noopener" className="mt-2 block hover:text-white">Instagram →</a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-6 text-[13px] text-white/45 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. Information on this site is general and not a substitute for an in-person examination.</p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {legalPages.map((p) => (
                <li key={p.href}><Link href={p.href} className="hover:text-white">{p.label}</Link></li>
              ))}
              <li><Link href="/image-credits" className="hover:text-white">Image credits</Link></li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/20">
        <div className="container-x py-4 text-center text-[13px] text-white/55">
          Powered by{" "}
          <a href="https://onehandlabs.in/" target="_blank" rel="noopener" className="font-semibold text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white">
            ONE Hand Labs
          </a>
        </div>
      </div>
    </footer>
  );
}
