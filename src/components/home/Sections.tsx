import Image from "next/image";
import Link from "next/link";
import { dentists, fullAddress, generalFaqs, images, mapsEmbedSrc, mapsLink, serviceHref, services, site, videos, whatsappLink } from "@/lib/site";
import { Faq, Photo } from "@/components/ui";
import Icon, { serviceIcon } from "@/components/Icon";
import QuickBook from "@/components/home/QuickBook";

function SectionHead({ eyebrow, title, text, action, center = false }: { eyebrow: string; title: string; text?: string; action?: React.ReactNode; center?: boolean }) {
  return (
    <div data-reveal className={center ? "mx-auto max-w-2xl text-center" : "flex flex-wrap items-end justify-between gap-4"}>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="h2 mt-2">{title}</h2>
        {text && <p className={`mt-3 text-[17px] leading-relaxed text-muted ${center ? "" : "max-w-[60ch]"}`}>{text}</p>}
      </div>
      {action}
    </div>
  );
}

/* ── Stats band: real facts only ── */
export function StatsBand() {
  const stats = [
    { icon: "star", value: `${site.rating}/5`, label: `${site.reviewCount} Google reviews` },
    { icon: "award", value: `${new Date().getFullYear() - site.since}+ yrs`, label: `Serving since ${site.since}` },
    { icon: "tooth", value: `${services.length - 1}`, label: "Dental treatments" },
    { icon: "face", value: "1 wing", label: "Cosmetology & lasers" },
    { icon: "calendar", value: "Mon–Sat", label: "Open six days" },
  ];
  return (
    <section className="relative z-10 -mt-px bg-white">
      <div className="container-x">
        <ul data-reveal-stagger className="grid grid-cols-2 divide-line rounded-b-2xl border-x border-b border-line sm:grid-cols-3 lg:grid-cols-5 lg:divide-x">
          {stats.map((s) => (
            <li key={s.label} className="flex items-center gap-3 px-4 py-5 last:col-span-2 sm:px-5 sm:py-6 sm:last:col-span-1">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blush text-clay sm:h-12 sm:w-12"><Icon name={s.icon} size={20} /></span>
              <span>
                <span className="num block whitespace-nowrap font-serif text-xl font-bold leading-tight text-ink sm:text-2xl">{s.value}</span>
                <span className="block text-[12px] leading-snug text-muted sm:text-[13px]">{s.label}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── "What brings you in?" icon picker ── */
export function NeedPicker() {
  const needs = [
    { label: "Regular check-up", slug: "checkup-and-cleaning", icon: "search" },
    { label: "Tooth pain", slug: "emergency-dental-care", icon: "bolt" },
    { label: "Missing teeth", slug: "dental-implants", icon: "implant" },
    { label: "Root canal", slug: "root-canal-treatment", icon: "shield" },
    { label: "Whiter teeth", slug: "teeth-whitening", icon: "sparkle" },
    { label: "Crooked teeth", slug: "clear-aligners", icon: "aligner" },
    { label: "For my child", slug: "kids-dentistry", icon: "kid" },
    { label: "Skin & laser", slug: "facial-aesthetics", icon: "face" },
  ];
  return (
    <section className="section">
      <div className="container-x">
        <SectionHead center eyebrow="Find the right care" title="What brings you in today?" text="Pick what's bothering you — we'll show you the treatment, what to expect, and how to book." />
        <ul data-reveal-stagger className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {needs.map((n) => (
            <li key={n.label}>
              <Link href={serviceHref(n.slug)} className="lift group flex h-full flex-col items-center gap-3 rounded-2xl border border-line bg-white px-3 py-6 text-center">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-forest-tint text-forest transition-colors duration-300 group-hover:bg-forest group-hover:text-white"><Icon name={n.icon} size={26} /></span>
                <span className="text-[14px] font-semibold leading-tight text-ink">{n.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── Treatments photo grid ── */
export function TreatmentGrid() {
  return (
    <section className="section bg-stone">
      <div className="container-x">
        <SectionHead eyebrow="Our treatments" title="Dental & aesthetic care we offer" text="Every treatment explained in plain language — with chair time, number of visits and aftercare."
          action={<Link href="/services" className="btn-outline !rounded-xl">View all treatments <Icon name="arrow" size={16} /></Link>} />
        <ul data-reveal-stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={serviceHref(s.slug)} className="lift group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-line">
                <div className="relative">
                  <Photo src={images[s.image].src} label={images[s.image].alt} className="aspect-[16/10] rounded-none" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
                  <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink backdrop-blur">{s.category === "Aesthetics" ? "Cosmetology" : s.category}</span>
                  <span className="absolute -bottom-6 left-5 grid h-12 w-12 place-items-center rounded-xl bg-white text-clay shadow-lg ring-1 ring-line"><Icon name={serviceIcon[s.slug]} size={22} /></span>
                </div>
                <div className="flex flex-1 flex-col p-5 pt-9">
                  <h3 className="font-serif text-lg font-semibold text-ink group-hover:text-clay">{s.name}</h3>
                  <p className="mt-1.5 flex-1 text-[15px] text-muted">{s.short}</p>
                  <div className="num mt-4 flex flex-wrap gap-2 text-[12px]">
                    {s.facts.slice(0, 2).map((f) => (
                      <span key={f.label} className="rounded-full bg-stone px-2.5 py-1 text-ink-soft"><span className="text-muted">{f.label}:</span> {f.value}</span>
                    ))}
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-forest">Know more <Icon name="arrow" size={15} className="transition-transform group-hover:translate-x-1" /></span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── Why trust us ── */
export function WhyTrust() {
  const points = [
    { icon: "shield", title: "Sterilised, every time", text: "Instruments autoclaved and opened from sealed pouches in front of you. [confirm process]" },
    { icon: "wallet", title: "Transparent pricing", text: "A written, itemised estimate before any treatment begins — no surprises." },
    { icon: "award", title: "Experienced specialists", text: "Implants and smile design by Dr. Bindra; skin and lasers by Dr. Sukhmani." },
    { icon: "heart", title: "Gentle, unhurried care", text: "We explain before we examine, numb properly, and stop when you raise your hand." },
  ];
  return (
    <section className="section">
      <div className="container-x grid items-center gap-10 lg:grid-cols-12">
        <div data-reveal className="relative lg:col-span-5">
          <div className="relative mx-auto aspect-[9/16] max-h-[620px] overflow-hidden rounded-3xl bg-ink shadow-[0_30px_70px_-30px_rgba(22,34,46,0.5)] sm:aspect-[4/5]">
            <video src={videos.patient.src} poster={videos.patient.poster} autoPlay muted loop playsInline preload="metadata"
              aria-label="Video: Dr. Bindra with a happy patient in the treatment room" className="h-full w-full object-cover" />
          </div>
          <div className="absolute -bottom-5 right-3 rounded-2xl bg-clay p-4 sm:p-5 text-white shadow-xl sm:right-6">
            <p className="num font-serif text-3xl font-bold">{site.rating}★</p>
            <p className="text-sm text-white/85">{site.reviewCount} Google reviews</p>
          </div>
        </div>
        <div className="lg:col-span-7 lg:pl-8">
          <SectionHead eyebrow="Why Bindra Dental" title="Why patients in Ambala trust us" text={`Since ${site.since}, families from Sadar Bazar and across Ambala Cantt have come to us for honest, comfortable dental care.`} />
          <ul data-reveal-stagger className="mt-8 grid gap-4 sm:grid-cols-2">
            {points.map((p) => (
              <li key={p.title} className="card p-5">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-forest-tint text-forest"><Icon name={p.icon} size={22} /></span>
                <h3 className="mt-4 font-serif text-[17px] font-semibold text-ink">{p.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{p.text}</p>
              </li>
            ))}
          </ul>
          <Link href="/about" className="mt-8 inline-flex items-center gap-1.5 font-semibold text-forest hover:underline">More about the clinic <Icon name="arrow" size={16} /></Link>
        </div>
      </div>
    </section>
  );
}

/* ── Doctors ── */
export function Doctors() {
  return (
    <section className="section bg-stone">
      <div className="container-x">
        <SectionHead eyebrow="Our doctors" title="Meet the specialists" action={<Link href="/dentists" className="btn-outline !rounded-xl">All doctors <Icon name="arrow" size={16} /></Link>} />
        <ul data-reveal-stagger className="mt-10 grid gap-5 md:grid-cols-2">
          {dentists.map((d) => (
            <li key={d.name} className="card flex flex-col gap-5 p-6 sm:flex-row sm:items-center">
              {d.photo ? (
                <span className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-stone">
                  <Image src={d.photo} alt={d.name} fill sizes="112px" className="object-cover" />
                </span>
              ) : (
                <span className="grid h-28 w-28 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-forest to-ink font-serif text-4xl font-bold text-white">
                  {d.name.replace(/^Dr\.?\s*/, "").split(" ").map((w) => w[0]).slice(0, 2).join("")}
                </span>
              )}
              <div className="flex-1">
                <h3 className="font-serif text-xl font-bold text-ink">{d.name}</h3>
                <p className="mt-0.5 text-sm font-medium text-clay">{d.role}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{d.bio}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link href="/dentists" className="text-sm font-semibold text-forest hover:underline">View profile</Link>
                  <Link href="/book-appointment" className="text-sm font-semibold text-clay hover:underline">Book with {d.name.split(" ")[0]} {d.name.split(" ")[1]}</Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── Booking band with map ── */
export function BookingBand() {
  return (
    <section className="section bg-ink">
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-center">
        <div data-reveal className="text-white/80 lg:col-span-7">
          <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#f2b8ad]">Visit us</p>
          <h2 className="mt-2 font-serif text-[1.6rem] font-bold leading-tight text-white md:text-[2.25rem]">Book your visit to Dr. Bindra Dental Care Centre</h2>
          <ul className="mt-6 space-y-3 text-[15px]">
            <li className="flex gap-3"><Icon name="pin" className="mt-0.5 shrink-0 text-[#f2b8ad]" /> {fullAddress}</li>
            <li className="flex gap-3"><Icon name="clock" className="mt-0.5 shrink-0 text-[#f2b8ad]" /> {site.hours}</li>
            <li className="flex gap-3"><Icon name="phone" className="mt-0.5 shrink-0 text-[#f2b8ad]" /> <a href={site.phoneHref} className="num hover:text-white">{site.phone}</a></li>
          </ul>
          <div className="mt-7 overflow-hidden rounded-2xl ring-1 ring-white/15">
            <iframe title="Map showing the clinic location" src={mapsEmbedSrc} loading="lazy" className="h-60 w-full" referrerPolicy="no-referrer-when-downgrade" />
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <a href={mapsLink} target="_blank" rel="noopener" className="font-semibold text-white hover:underline">Get directions →</a>
            <a href={whatsappLink()} target="_blank" rel="noopener" className="font-semibold text-white hover:underline">Chat on WhatsApp →</a>
          </div>
        </div>
        <div className="lg:col-span-5"><QuickBook title="Request a call-back" /></div>
      </div>
    </section>
  );
}

/* ── FAQs ── */
export function HomeFaq() {
  return (
    <section className="section">
      <div className="container-x grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHead eyebrow="FAQs" title="Frequently asked questions" text="Can't find your answer? Ask us on WhatsApp." />
          <a href={whatsappLink("Hello, I have a question.")} target="_blank" rel="noopener" className="btn mt-6 !rounded-xl bg-[#1f7a4d] text-white hover:bg-[#186540]">Ask on WhatsApp</a>
        </div>
        <div data-reveal className="lg:col-span-8"><Faq items={generalFaqs} /></div>
      </div>
    </section>
  );
}
