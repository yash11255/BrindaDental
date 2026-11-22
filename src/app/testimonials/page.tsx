import type { Metadata } from "next";
import { mapsLink, site, testimonials } from "@/lib/site";
import { CtaBand, PageHero, Stars } from "@/components/ui";

export const metadata: Metadata = {
  title: "Patient Reviews",
  description: `Rated ${site.rating}★ from ${site.reviewCount} Google reviews — read what patients say about Dr. Bindra Dental Care Centre.`,
  alternates: { canonical: "/testimonials" },
};

export default function Testimonials() {
  return (
    <>
      <PageHero eyebrow="Testimonials" title={`${site.rating}★ from ${site.reviewCount} Google reviews`} text="Real words from real patients in Ambala Cantt." />
      <section className="section">
        <div className="container-x">
          <div className="grid gap-5 md:grid-cols-2">
            {testimonials.map((t, i) => (
              <figure key={i} className="card p-6">
                <Stars n={t.stars} />
                <blockquote className="mt-3 text-gray-700">“{t.text}”</blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-navy">— {t.name}, via Google</figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href={mapsLink} target="_blank" rel="noopener" className="btn-outline">Read all reviews on Google</a>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
