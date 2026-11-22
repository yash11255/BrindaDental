"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { images, site } from "@/lib/site";
import QuickBook from "@/components/home/QuickBook";
import Icon from "@/components/Icon";

const slides = [
  {
    img: images.clinic,
    tag: `Trusted in Ambala Cantt since ${site.since}`,
    title: "Complete dental care, under one roof",
    text: "Check-ups, implants, root canals, smile design and cosmetology — with honest advice and a written estimate before treatment.",
    cta: { label: "Explore treatments", href: "/services" },
  },
  {
    img: images.implant,
    tag: "Dr. Bindra Institute for Dental Implants",
    title: "Fixed teeth that look and feel natural",
    text: "Implants planned from X-rays and a scan, and placed by Dr. Bindra himself.",
    cta: { label: "About dental implants", href: "/services/dental-implants" },
  },
  {
    img: images.rootCanal,
    tag: "Same-day slots for tooth pain",
    title: "Gentle root canal treatment",
    text: "Stop the pain and save your tooth — under local anaesthesia, usually in one or two visits.",
    cta: { label: "About root canal", href: "/services/root-canal-treatment" },
  },
  {
    img: images.facial,
    tag: "Centre for Facial Aesthetics & Lasers",
    title: "Skin & laser care by Dr. Sukhmani",
    text: "Laser hair reduction, peels, HydraFacial and more — in the clinic's dedicated cosmetology wing.",
    cta: { label: "Explore cosmetology", href: "/cosmetology" },
  },
];

/** Full-bleed image carousel (8 cols) with a booking card (4 cols) floating on the right. Autoplays, pauses on hover/focus. */
export default function HeroCarousel() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [paused]);

  const go = (n: number) => setI((n + slides.length) % slides.length);

  return (
    <section className="relative bg-ink" aria-roledescription="carousel" aria-label="Highlights"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      {/* Slides */}
      <div className="absolute inset-0 overflow-hidden">
        {slides.map((s, n) => (
          <div key={s.title} aria-hidden={n !== i} className={`absolute inset-0 transition-opacity duration-1000 ${n === i ? "opacity-100" : "opacity-0"}`}>
            <Image src={s.img.src} alt="" fill priority={n === 0} sizes="100vw" className={`object-cover transition-transform duration-[7000ms] ease-out ${n === i ? "scale-100" : "scale-110"}`} />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
      </div>

      <div className="container-x relative grid gap-10 py-12 md:py-16 lg:grid-cols-12 lg:items-center lg:py-20">
        <div className="lg:col-span-7" aria-live="polite">
          {slides.map((s, n) => n === i && (
            <div key={s.title} className="hero-rise">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[13px] font-medium text-white ring-1 ring-white/20 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" /> {s.tag}
              </p>
              <h1 className="mt-5 max-w-[16ch] font-serif text-[2.4rem] font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-5xl lg:text-[3.5rem]">{s.title}</h1>
              <p className="mt-5 max-w-[50ch] text-lg leading-relaxed text-white/80">{s.text}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={s.cta.href} className="btn-primary !rounded-xl">{s.cta.label} <Icon name="arrow" size={18} /></Link>
                <a href={site.phoneHref} className="btn !rounded-xl border border-white/30 text-white hover:bg-white/10"><Icon name="phone" size={18} /> Call now</a>
              </div>
            </div>
          ))}

          {/* Controls */}
          <div className="mt-10 flex items-center gap-4">
            <button onClick={() => go(i - 1)} aria-label="Previous slide" className="grid h-10 w-10 place-items-center rounded-full border border-white/25 text-white hover:bg-white/10"><Icon name="arrow" size={16} className="rotate-180" /></button>
            <div className="flex gap-2">
              {slides.map((s, n) => (
                <button key={s.title} onClick={() => go(n)} aria-label={`Slide ${n + 1}: ${s.title}`} aria-current={n === i}
                  className={`h-1.5 rounded-full transition-all duration-500 ${n === i ? "w-10 bg-clay" : "w-4 bg-white/35 hover:bg-white/60"}`} />
              ))}
            </div>
            <button onClick={() => go(i + 1)} aria-label="Next slide" className="grid h-10 w-10 place-items-center rounded-full border border-white/25 text-white hover:bg-white/10"><Icon name="arrow" size={16} /></button>
          </div>
        </div>

        <div className="lg:col-span-5 lg:pl-6 xl:pl-12">
          <QuickBook />
        </div>
      </div>
    </section>
  );
}
