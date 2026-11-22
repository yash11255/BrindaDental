import Link from "next/link";
import { images } from "@/lib/site";
import { Photo } from "@/components/ui";

/** Uneven 3-image strip (5 · 4 · 3 cols) with varied heights, so it reads like a photo essay rather than a grid. */
export default function GalleryStrip() {
  return (
    <section className="pb-12 md:pb-16" aria-labelledby="gal-h">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="gal-h" className="h2 max-w-[18ch]">Inside the clinic.</h2>
          <Link href="/gallery" className="link text-[15px]">See the gallery</Link>
        </div>
        <div data-reveal-stagger className="mt-6 grid gap-4 md:grid-cols-12 md:items-end">
          <Photo src={images.clinic.src} label={images.clinic.alt} className="aspect-[4/3] md:col-span-5 md:aspect-[4/5]" sizes="(min-width: 768px) 40vw, 100vw" />
          <Photo src={images.checkup.src} label={images.checkup.alt} className="aspect-[4/3] md:col-span-4" sizes="(min-width: 768px) 33vw, 100vw" position="60% 40%" />
          <Photo src={images.chair.src} label={images.chair.alt} className="aspect-[4/3] md:col-span-3 md:aspect-[3/4]" sizes="(min-width: 768px) 25vw, 100vw" />
        </div>
        <p className="mt-4 text-xs text-muted">Representative photos — the clinic&apos;s own photography is coming soon.</p>
      </div>
    </section>
  );
}
