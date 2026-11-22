import type { Metadata } from "next";
import { imageCredits } from "@/lib/site";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Image credits", robots: { index: false } };

export default function Credits() {
  return (
    <>
      <PageHero eyebrow="Credits" title="Image credits" text="Representative photos used under open licences until the clinic's own photography is ready." />
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
