import Link from "next/link";
import { featuredSlugs, images, serviceHref, serviceImage, services } from "@/lib/site";
import { Photo } from "@/components/ui";

/** Editorial mosaic: one large lead treatment (implants) + four smaller, each with its own photo.
 *  Desktop: 12-col grid, lead spans 7 cols × 2 rows; the rest fill 5 cols as a 2×2. Mobile: single column. */
export default function ServicesShowcase() {
  const [lead, ...rest] = featuredSlugs.map((slug) => services.find((s) => s.slug === slug)!);
  const leadImg = images[serviceImage[lead.slug]];
  return (
    <section className="section" aria-labelledby="svc-h">
      <div className="container-x">
        <div data-reveal className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="eyebrow">What we offer</p>
            <h2 id="svc-h" className="h2 mt-4">Five kinds of care, one building, one booking desk.</h2>
          </div>
          <p className="md:col-span-4 md:col-start-9">Dental treatment on the ground floor, implants and smile design upstairs, and Dr. Sukhmani&apos;s aesthetics wing next door.</p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-12 md:grid-rows-2">
          <Link href={serviceHref(lead.slug)} data-reveal className="lift group relative overflow-hidden rounded-[24px] md:col-span-7 md:row-span-2">
            <Photo src={leadImg.src} label={leadImg.alt} className="aspect-[4/3] h-full rounded-[24px] transition-transform duration-700 group-hover:scale-[1.02] md:aspect-auto" sizes="(min-width: 768px) 58vw, 100vw" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent p-6 pt-24 md:p-8 md:pt-32">
              <p className="text-xs uppercase tracking-[0.16em] text-paper/70">Most asked about</p>
              <h3 className="mt-2 font-serif text-3xl text-paper md:text-4xl">{lead.name}</h3>
              <p className="mt-2 max-w-[42ch] text-paper/85">{lead.short}. Planned from a 3D scan and placed by Dr. Bindra.</p>
              <span className="mt-4 inline-block text-sm text-paper underline decoration-paper/40 underline-offset-4 group-hover:decoration-paper">Read about implants →</span>
            </div>
          </Link>

          <div data-reveal-stagger className="grid gap-5 sm:grid-cols-2 md:col-span-5 md:row-span-2">
            {rest.map((s) => {
              const img = images[serviceImage[s.slug]];
              return (
                <Link key={s.slug} href={serviceHref(s.slug)} className="lift group flex flex-col rounded-[20px] bg-white p-2 pb-4 ring-1 ring-line">
                  <Photo src={img.src} label={img.alt} className="aspect-[4/3] transition-transform duration-500 group-hover:scale-[1.015]" sizes="(min-width: 768px) 20vw, (min-width: 640px) 50vw, 100vw"
                    position={s.slug === "teeth-whitening" ? "50% 35%" : "center"} />
                  <h3 className="mt-3 px-2 text-[17px] font-medium text-ink group-hover:text-forest">{s.name}</h3>
                  <p className="mt-0.5 px-2 text-sm text-muted">{s.short}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
