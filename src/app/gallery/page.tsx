import type { Metadata } from "next";
import { images } from "@/lib/site";
import { CtaBand, PageHero, Photo } from "@/components/ui";

export const metadata: Metadata = {
  title: "Clinic Gallery",
  description: "Photos of treatment rooms, equipment and care at Dr. Bindra Dental Care Centre, Ambala Cantt.",
  alternates: { canonical: "/gallery" },
};

const layout: { key: keyof typeof images; cls: string; pos?: string }[] = [
  { key: "clinic", cls: "md:col-span-7 aspect-[4/3]" },
  { key: "checkup", cls: "md:col-span-5 aspect-[4/3] md:aspect-auto md:h-full", pos: "60% 40%" },
  { key: "chair", cls: "md:col-span-4 aspect-[4/3]" },
  { key: "implant", cls: "md:col-span-4 aspect-[4/3]" },
  { key: "rootCanal", cls: "md:col-span-4 aspect-[4/3]" },
  { key: "smile", cls: "md:col-span-5 aspect-[4/3]" },
  { key: "facial", cls: "md:col-span-7 aspect-[4/3] md:aspect-[16/9]" },
];

export default function Gallery() {
  return (
    <>
      <PageHero eyebrow="Gallery" title="Inside the clinic" text="Treatment rooms, equipment and the care we offer. Our own photography is on its way." />
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
