import type { Metadata } from "next";
import { images } from "@/lib/site";
import { CtaBand, PageHero, Photo } from "@/components/ui";

export const metadata: Metadata = {
  title: "Clinic Gallery",
  description: "Photos of treatment rooms, equipment and care at Dr. Bindra Dental Care Centre, Ambala Cantt.",
  alternates: { canonical: "/gallery" },
};

const layout: { key: keyof typeof images; cls: string; pos?: string }[] = [
  { key: "building", cls: "md:col-span-7 aspect-[4/3]", pos: "50% 30%" },
  { key: "team", cls: "md:col-span-5 aspect-[4/3] md:aspect-auto md:h-full" },
  { key: "clinic", cls: "md:col-span-4 aspect-[4/3]" },
  { key: "implantRoom", cls: "md:col-span-4 aspect-[4/3]" },
  { key: "facial", cls: "md:col-span-4 aspect-[4/3]" },
  { key: "drBindra", cls: "md:col-span-6 aspect-[16/9]" },
  { key: "implantSign", cls: "md:col-span-6 aspect-[16/9]" },
  { key: "chair", cls: "md:col-span-4 aspect-[4/3]" },
  { key: "cosmetologyBed", cls: "md:col-span-4 aspect-[4/3]" },
  { key: "reception", cls: "md:col-span-4 aspect-[4/3]" },
  { key: "implantRoom2", cls: "md:col-span-5 aspect-[4/3]" },
  { key: "building2", cls: "md:col-span-7 aspect-[4/3] md:aspect-auto md:h-full", pos: "50% 30%" },
];

export default function Gallery() {
  return (
    <>
      <PageHero eyebrow="Gallery" title="Inside the clinic" text="Our building, treatment rooms, implant suite, cosmetology wing — and the team you'll meet." />
      <section className="section">
        <div className="container-x grid gap-4 md:grid-cols-12">
          {layout.map(({ key, cls, pos }) => (
            <Photo key={key} src={images[key].src} label={images[key].alt} className={cls} position={pos} sizes="(min-width: 768px) 50vw, 100vw" />
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
