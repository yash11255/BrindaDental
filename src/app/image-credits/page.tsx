import type { Metadata } from "next";
import { imageCredits } from "@/lib/site";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Image credits", robots: { index: false } };

export default function Credits() {
  return (
    <>
      <PageHero eyebrow="Credits" title="Image credits" text="Most photos and videos on this site are the clinic's own. These explanatory images are used under open licences." />
      <section className="section">
        <ul className="container-x max-w-3xl divide-y divide-line border-y border-line">
          {imageCredits.map((c) => (
            <li key={c.file} className="flex flex-wrap justify-between gap-2 py-4 text-[15px]">
              <span className="text-ink">{c.file}</span>
              <span>{c.author} · {c.license} · <a href={c.url} target="_blank" rel="noopener" className="link">source</a></span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
