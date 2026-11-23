import Image from "next/image";
import Link from "next/link";
import { dentists, images, serviceHref, services, site, whatsappLink, type Service } from "@/lib/site";
import { Faq, Photo } from "@/components/ui";
import EnquiryForm, { WhatsAppIcon } from "@/components/EnquiryForm";
import Icon from "@/components/Icon";

/** Full internal page for one treatment. `aesthetics` switches to the darker cosmetology identity. */
export default function ServiceDetail({ s, aesthetics = false }: { s: Service; aesthetics?: boolean }) {
  const img = images[s.image];
  const doctor = dentists.find((d) => s.performedBy.startsWith(d.name));
  // Same-category treatments first, then fill up to three with the rest.
  const others = services.filter((x) => x.slug !== s.slug);
  const related = [...others.filter((x) => x.category === s.category), ...others.filter((x) => x.category !== s.category)].slice(0, 3);
  const sections = [
    ["overview", "Overview"],
    ...(s.subTreatments ? [["treatments", "Treatments"]] : []),
    ["process", "Process"],
    ...(s.comparison ? [["compare", "Compare"]] : []),
    ["aftercare", "Aftercare"],
    ["faqs", "FAQs"],
    ["book", "Book"],
  ];

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: s.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  const dark = aesthetics;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* ── HERO ─ 7:5 ── */}
      <section className={`relative overflow-hidden ${dark ? "bg-ink text-paper/80" : "bg-gradient-to-b from-stone to-paper"}`}>
        {dark && (
          <div aria-hidden className="absolute inset-0 opacity-40">
            <Image src={img.src} alt="" fill sizes="100vw" className="object-cover blur-2xl" />
            <div className="absolute inset-0 bg-ink/70" />
          </div>
        )}
        <div className="container-x relative grid gap-10 pb-12 pt-8 md:grid-cols-12 md:gap-8 md:pb-16 md:pt-10">
          <div className="hero-rise flex flex-col justify-center md:col-span-7 md:pr-8">
            <nav aria-label="Breadcrumb" className={`text-sm ${dark ? "text-paper/55" : "text-muted"}`}>
              <Link href="/" className="hover:underline">Home</Link>
              <span aria-hidden> / </span>
              {dark ? <span>Cosmetology</span> : <><Link href="/services" className="hover:underline">Treatments</Link><span aria-hidden> / </span><span className="text-ink">{s.name}</span></>}
            </nav>
            <p className={`mt-6 text-[12px] font-medium uppercase tracking-[0.16em] ${dark ? "text-[#e7b8a0]" : "text-clay"}`}>
              {dark ? "Centre for Facial Aesthetics & Lasers · Dr. Sukhmani" : `${s.category === "Implants" ? "Dr. Bindra Institute for Dental Implants" : s.category + " dentistry"}`}
            </p>
            <h1 className={`mt-3 font-serif text-[2.4rem] leading-[1.06] tracking-[-0.02em] md:text-[3.6rem] ${dark ? "text-paper" : "text-ink"}`}>
              {dark ? "Cosmetology & Laser Treatments" : s.name}
              <span className={`block text-[0.55em] leading-tight ${dark ? "text-paper/60" : "text-muted"}`}>in Ambala Cantt</span>
            </h1>
            <p className={`mt-5 max-w-[48ch] text-lg leading-relaxed ${dark ? "text-paper/85" : ""}`}>{s.tagline}</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a href="#book" className="btn-primary">{dark ? "Book a skin consultation" : "Book this treatment"}</a>
              <a href={whatsappLink(`Hello, I'd like to know more about ${s.name}.`)} target="_blank" rel="noopener"
                className={`btn border ${dark ? "border-paper/30 text-paper hover:bg-white/10" : "border-ink/20 text-ink hover:bg-white"}`}>
                <WhatsAppIcon /> Ask a question
              </a>
            </div>
            <dl className={`num mt-9 grid grid-cols-2 gap-x-6 gap-y-4 border-t pt-6 sm:grid-cols-4 ${dark ? "border-paper/15" : "border-line"}`}>
              {s.facts.map((f) => (
                <div key={f.label}>
                  <dt className={`text-xs ${dark ? "text-paper/50" : "text-muted"}`}>{f.label}</dt>
                  <dd className={`mt-1 text-[15px] font-medium ${dark ? "text-paper" : "text-ink"}`}>{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative motion-safe:animate-[rise_1s_var(--ease-calm)_both] md:col-span-5">
            <Photo src={img.src} label={img.alt} priority className="kenburns aspect-[4/5] w-full" sizes="(min-width: 768px) 42vw, 100vw" />
            <div className="absolute -bottom-5 left-4 right-10 flex items-center gap-3 rounded-2xl border border-line bg-paper p-4 text-ink shadow-[0_12px_30px_-14px_rgba(28,35,33,0.35)] sm:-left-6 sm:right-auto">
              {doctor?.photo ? (
                <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full"><Image src={doctor.photo} alt="" fill sizes="44px" className="object-cover" /></span>
              ) : (
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-forest font-serif text-lg text-paper">
                  {s.performedBy.replace(/^Dr\.?\s*/, "").split(" ").map((w) => w[0]).slice(0, 2).join("")}
                </span>
              )}
              <span>
                <span className="block text-xs text-muted">Performed by</span>
                <span className="block text-[15px] font-medium">{s.performedBy}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sticky in-page nav ── */}
      <nav aria-label="On this page" className="sticky top-16 z-30 border-b border-line bg-paper/90 backdrop-blur-md md:top-[72px]">
        <ul className="no-scrollbar container-x flex gap-6 overflow-x-auto text-[14px]">
          {sections.map(([id, label]) => (
            <li key={id}><a href={`#${id}`} className="block whitespace-nowrap border-b-2 border-transparent py-3.5 text-ink-soft transition-colors hover:border-clay hover:text-ink">{label}</a></li>
          ))}
        </ul>
      </nav>

      {/* ── OVERVIEW: intro + signs (5) | benefits (7) ── */}
      <section id="overview" className="section scroll-mt-32">
        <div className="container-x grid gap-10 md:grid-cols-12 md:gap-8">
          <div data-reveal className="md:col-span-5">
            <p className="eyebrow">Overview</p>
            <h2 className="h2 mt-3">{dark ? "Skin care with a doctor's eye." : `What is ${s.name.toLowerCase()}?`}</h2>
            <p className="mt-4 text-[17px] leading-relaxed">{s.intro}</p>
            <div className="mt-8 rounded-2xl bg-forest-tint p-6">
              <h3 className="text-[15px] font-semibold text-ink">This may be right for you if…</h3>
              <ul className="mt-4 space-y-3">
                {s.signs.map((x) => (
                  <li key={x} className="flex gap-3 text-[15px] leading-relaxed">
                    <span aria-hidden className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-forest text-[11px] text-paper">✓</span>{x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="md:col-span-7 md:pl-6">
            <p className="eyebrow md:mt-1">Why patients choose it</p>
            <ul data-reveal-stagger className="mt-5 grid gap-4">
              {s.benefits.map((b, i) => (
                <li key={b.title} className="lift grid grid-cols-[3rem_1fr] gap-4 rounded-2xl border border-line bg-white p-6">
                  <span className="num font-serif text-3xl leading-none text-clay">0{i + 1}</span>
                  <div>
                    <h3 className="text-lg font-medium text-ink">{b.title}</h3>
                    <p className="mt-1.5 leading-relaxed">{b.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            {doctor && (
              <div data-reveal className="mt-6 flex items-start gap-4 rounded-2xl bg-stone p-6">
                {doctor.photo ? (
                  <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-white">
                    <Image src={doctor.photo} alt={doctor.name} fill sizes="64px" className="object-cover" />
                  </span>
                ) : (
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-ink font-serif text-xl text-paper">
                    {doctor.name.replace(/^Dr\.?\s*/, "").split(" ").map((w) => w[0]).slice(0, 2).join("")}
                  </span>
                )}
                <div>
                  <p className="font-medium text-ink">{doctor.name}</p>
                  <p className="text-sm text-muted">{doctor.role}</p>
                  <p className="mt-2 text-[15px] leading-relaxed">{doctor.bio}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── SUB-TREATMENTS (cosmetology) ── */}
      {s.subTreatments && (
        <section id="treatments" className="section scroll-mt-32 bg-ink text-paper/75">
          <div className="container-x">
            <div data-reveal className="grid gap-4 md:grid-cols-12 md:items-end">
              <div className="md:col-span-7">
                <p className="text-[12px] uppercase tracking-[0.16em] text-paper/50">Treatments offered</p>
                <h2 className="mt-3 font-serif text-[1.75rem] leading-[1.15] text-paper md:text-[2.5rem]">Six ways we care for your skin.</h2>
              </div>
              <p className="text-sm text-paper/50 md:col-span-4 md:col-start-9">Exact treatments and devices to be confirmed with the clinic.</p>
            </div>
            <ul data-reveal-stagger className="mt-10 grid gap-px overflow-hidden rounded-[24px] bg-paper/10 sm:grid-cols-2 lg:grid-cols-3">
              {s.subTreatments.map((t, i) => (
                <li key={t.name} className="group flex flex-col bg-ink transition-colors hover:bg-[#232b29]">
                  {t.image && (
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image src={t.image} alt={t.name} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" style={{ objectPosition: "50% 30%" }} />
                      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-7 pt-5">
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/10 text-[#f2b8ad] ring-1 ring-white/15 transition-colors group-hover:bg-clay group-hover:text-white">
                      <Icon name={["sparkle", "face", "heart", "shield", "star", "award"][i % 6]} size={22} />
                    </span>
                    <span className="num font-serif text-sm text-white/35">0{i + 1}</span>
                  </div>
                  <h3 className="mt-3 font-serif text-2xl text-paper">{t.name}</h3>
                  <p className="mt-2 leading-relaxed">{t.text}</p>
                  {t.duration && <p className="num mt-4 text-xs text-paper/45">{t.duration}</p>}
                  <a href={whatsappLink(`Hello, I'd like to book a consultation for ${t.name}.`)} target="_blank" rel="noopener"
                    className="mt-auto inline-block pt-5 text-sm text-paper underline decoration-paper/30 underline-offset-4 group-hover:decoration-paper">Enquire on WhatsApp →</a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── COSMETOLOGY: doctor feature + the wing ── */}
      {dark && doctor && (
        <section className="section scroll-mt-32">
          <div className="container-x grid items-center gap-10 lg:grid-cols-12">
            <div data-reveal className="relative lg:col-span-5">
              {doctor.photo && (
                <Photo src={doctor.photo} label={doctor.name} className="aspect-[4/5] rounded-3xl" sizes="(min-width: 1024px) 40vw, 100vw" position="50% 20%" />
              )}
              <div className="absolute -bottom-5 left-5 right-5 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-line sm:right-auto">
                <p className="font-serif text-lg font-bold text-ink">{doctor.name}</p>
                <p className="text-sm text-clay">{doctor.role}</p>
              </div>
            </div>
            <div className="lg:col-span-7 lg:pl-8">
              <div data-reveal>
                <p className="eyebrow">Meet your cosmetologist</p>
                <h2 className="h2 mt-2">Skin care planned by a doctor, not a salon.</h2>
                <p className="mt-4 text-[17px] leading-relaxed text-muted">
                  Every skin and laser treatment at the Centre for Facial Aesthetics &amp; Lasers starts with a consultation with Dr. Sukhmani — your skin type, history and goals — before a written plan is made.
                </p>
              </div>
              <ul data-reveal-stagger className="mt-6 grid gap-3 sm:grid-cols-2">
                {["Personal skin assessment", "Written plan & cost upfront", "Settings chosen for Indian skin", "Same hygiene standards as the dental clinic"].map((t) => (
                  <li key={t} className="flex items-center gap-3 rounded-xl border border-line bg-white p-4 text-[15px] font-medium text-ink">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-forest-tint text-forest"><Icon name="check" size={16} /></span>{t}
                  </li>
                ))}
              </ul>
              <a href="#book" className="btn-primary mt-8 !rounded-xl">Book a consultation with Dr. Sukhmani</a>
            </div>
          </div>

          <div className="container-x mt-20">
            <div data-reveal className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Inside the wing</p>
                <h2 className="h2 mt-2">A calm, private space for your skin.</h2>
              </div>
              <Link href="/gallery" className="btn-outline !rounded-xl">View gallery <Icon name="arrow" size={16} /></Link>
            </div>
            <div data-reveal-stagger className="mt-8 grid gap-4 md:grid-cols-12">
              <Photo src={images.facial.src} label={images.facial.alt} className="aspect-[4/3] md:col-span-7 md:aspect-auto md:h-full md:min-h-[420px]" sizes="(min-width: 768px) 58vw, 100vw" />
              <div className="grid gap-4 md:col-span-5">
                <Photo src={images.cosmetologyBed.src} label={images.cosmetologyBed.alt} className="aspect-[16/10]" sizes="(min-width: 768px) 40vw, 100vw" />
                <Photo src={images.reception.src} label={images.reception.alt} className="aspect-[16/10]" sizes="(min-width: 768px) 40vw, 100vw" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── PROCESS ── */}
      <section id="process" className="section scroll-mt-32 bg-stone">
        <div className="container-x">
          <div data-reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Step by step</p>
              <h2 className="h2 mt-3">What happens, from first visit to final result.</h2>
            </div>
          </div>
          <ol data-reveal-stagger className="relative mt-10 grid gap-6 md:grid-cols-4 md:gap-5">
            <span aria-hidden className="absolute left-0 right-0 top-6 hidden h-px bg-ink/15 md:block" />
            {s.process.map((p, i) => (
              <li key={p.title} className="relative">
                <span className="relative grid h-12 w-12 place-items-center rounded-full border-2 border-clay bg-stone font-serif text-lg text-clay">{i + 1}</span>
                <h3 className="mt-4 text-lg font-medium text-ink">{p.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── COMPARISON ── */}
      {s.comparison && (
        <section id="compare" className="section scroll-mt-32">
          <div className="container-x">
            <div data-reveal>
              <p className="eyebrow">Your options</p>
              <h2 className="h2 mt-3 max-w-[22ch]">How it compares with the alternatives.</h2>
            </div>
            <div data-reveal className="mt-8 overflow-x-auto rounded-[20px] border border-line bg-white">
              <table className="w-full min-w-[640px] text-left text-[15px]">
                <caption className="sr-only">{s.comparison.caption}</caption>
                <thead>
                  <tr className="border-b border-line bg-stone/60">
                    {s.comparison.head.map((h, i) => (
                      <th key={i} scope="col" className={`px-5 py-4 font-medium ${i === 1 ? "bg-forest text-paper" : "text-ink"}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {s.comparison.rows.map((r) => (
                    <tr key={r[0]} className="border-b border-line last:border-0">
                      {r.map((c, i) =>
                        i === 0 ? <th key={i} scope="row" className="px-5 py-4 font-normal text-muted">{c}</th>
                          : <td key={i} className={`px-5 py-4 ${i === 1 ? "bg-forest-tint font-medium text-ink" : ""}`}>{c}</td>,
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* ── AFTERCARE ── */}
      <section id="aftercare" className={`section scroll-mt-32 ${s.comparison ? "bg-forest-tint" : ""}`}>
        <div className="container-x grid gap-10 md:grid-cols-12 md:gap-8">
          <div data-reveal className="md:col-span-5">
            <p className="eyebrow">Aftercare</p>
            <h2 className="h2 mt-3">Looking after it once you&apos;re home.</h2>
            <p className="mt-4 leading-relaxed">You&apos;ll get these in writing on the day. If anything feels wrong, message us — we&apos;d rather hear early.</p>
            <a href={whatsappLink(`Hello, I had ${s.name} and have a question about aftercare.`)} target="_blank" rel="noopener" className="btn mt-6 bg-[#1f7a4d] text-white hover:bg-[#186540]">
              <WhatsAppIcon /> Aftercare question
            </a>
          </div>
          <ul data-reveal-stagger className="grid gap-3 md:col-span-7">
            {s.aftercare.map((a) => (
              <li key={a} className="flex gap-4 rounded-2xl border border-line bg-white p-5 text-[15px] leading-relaxed">
                <span aria-hidden className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-clay" />{a}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── FAQS + BOOK ── */}
      <section className="section bg-paper">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div id="faqs" data-reveal className="scroll-mt-32 lg:col-span-6">
            <p className="eyebrow">FAQs</p>
            <h2 className="h2 mb-6 mt-3">Questions patients ask.</h2>
            <Faq items={s.faqs} />
          </div>
          <div id="book" data-reveal className="scroll-mt-32 lg:col-span-6">
            <div className="rounded-[24px] bg-white p-6 shadow-[0_24px_60px_-30px_rgba(28,35,33,.35)] ring-1 ring-line sm:p-8">
              <h2 className="font-serif text-2xl text-ink">Book {dark ? "a skin consultation" : s.name.toLowerCase()}</h2>
              <p className="mb-6 mt-1.5 text-[15px]">Opens WhatsApp with your request ready to send — or call <a href={site.phoneHref} className="num text-forest underline underline-offset-4">{site.phone}</a>.</p>
              <EnquiryForm defaultService={s.name} showDate />
            </div>
          </div>
        </div>
      </section>

      {/* ── RELATED ── */}
      <section className="section bg-stone">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="h2">Related treatments</h2>
            <Link href="/services" className="link text-[15px]">All treatments</Link>
          </div>
          <ul data-reveal-stagger className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={serviceHref(r.slug)} className="lift group block overflow-hidden rounded-[20px] bg-white ring-1 ring-line">
                  <Photo src={images[r.image].src} label={images[r.image].alt} className="aspect-[16/10] rounded-none" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
                  <div className="p-5">
                    <h3 className="font-serif text-xl text-ink group-hover:text-forest">{r.name}</h3>
                    <p className="mt-1 text-sm text-muted">{r.short}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
