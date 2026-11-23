import type { Metadata } from "next";
import { dentists, images, site } from "@/lib/site";
import { CtaBand, Monogram, Photo, RatingBadge } from "@/components/ui";

export const metadata: Metadata = {
  title: "About Us — Dental Clinic in Ambala",
  description: `Learn about ${site.name}, a multi-specialty dental and aesthetics clinic serving Ambala Cantt since ${site.since}.`,
  alternates: { canonical: "/about" },
};

const values = [
  { icon: "🦷", title: "Clinical excellence", text: "Modern techniques and equipment, applied with care." },
  { icon: "🛡", title: "Honest advice", text: "Clear options and costs explained before treatment." },
  { icon: "❤", title: "Patient comfort", text: "A calm environment and gentle, painless care." },
];

export default function About() {
  return (
    <>
      <section className="relative">
        <Photo src={images.building.src} label={images.building.alt} priority sizes="100vw" position="50% 30%" className="h-64 rounded-none md:h-[28rem]" />
      </section>
      <section className="section">
        <div className="container-x max-w-4xl">
          <p className="eyebrow">About us</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-navy md:text-4xl">A centre for dental excellence since {site.since}</h1>
          <p className="mt-4 text-lg text-gray-600">
            What began as a neighbourhood dental practice in Sadar Bazar has grown into a multi-specialty clinic — home to the Dr. Bindra
            Institute for Dental Implants &amp; Smile Designing and the Centre for Facial Aesthetics &amp; Lasers. [founding story to confirm]
          </p>
        </div>
      </section>

      <section className="pb-16">
        <div className="container-x">
          <p className="eyebrow">Our philosophy</p>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="card p-6">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-mint text-xl">{v.icon}</span>
                <h3 className="mt-4 font-bold text-navy">{v.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="container-x">
          <p className="eyebrow">Our team</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {dentists.map((d) => (
              <div key={d.name} className="card overflow-hidden">
                {d.photo ? <Photo src={d.photo} label={d.name} className="aspect-[4/3] rounded-none" position="50% 25%" sizes="(min-width: 1024px) 33vw, 50vw" /> : <Monogram name={d.name} className="aspect-[4/3] rounded-none" />}
                <div className="p-5">
                  <p className="font-bold text-navy">{d.name}</p>
                  <p className="text-sm text-gray-600">{d.role}</p>
                </div>
              </div>
            ))}
          </div>
          <Photo src={images.teamWide.src} label={images.teamWide.alt} className="mt-8 aspect-[16/9] md:aspect-[21/9]" sizes="100vw" />
          <div className="mt-10"><RatingBadge /></div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <p className="eyebrow">Clinic environment</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <Photo src={images.clinic.src} label={images.clinic.alt} className="aspect-[4/3]" sizes="(min-width: 640px) 33vw, 100vw" />
            <Photo src={images.implantRoom.src} label={images.implantRoom.alt} className="aspect-[4/3]" sizes="(min-width: 640px) 33vw, 100vw" />
            <Photo src={images.facial.src} label={images.facial.alt} className="aspect-[4/3]" sizes="(min-width: 640px) 33vw, 100vw" />
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
