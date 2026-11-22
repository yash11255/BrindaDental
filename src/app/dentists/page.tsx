import type { Metadata } from "next";
import { dentists } from "@/lib/site";
import { CtaBand, Monogram, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Our Dentists",
  description: "Meet Dr. Himanshu Bindra and Dr. Sukhmani — the team behind Dr. Bindra Dental Care Centre, Ambala Cantt.",
  alternates: { canonical: "/dentists" },
};

export default function Dentists() {
  return (
    <>
      <PageHero eyebrow="Our dentists" title="The people behind your care" text="Experienced clinicians who personally oversee every treatment plan." />
      <section className="section">
        <div className="container-x space-y-8">
          {dentists.map((d) => (
            <article key={d.name} className="card grid overflow-hidden md:grid-cols-[320px_1fr]">
              <Monogram name={d.name} className="aspect-square rounded-none md:aspect-auto md:h-full" />
              <div className="p-6 md:p-8">
                <h2 className="text-2xl font-extrabold text-navy">{d.name}</h2>
                <p className="mt-1 font-medium text-teal">{d.role}</p>
                <p className="mt-4 text-gray-600">{d.bio}</p>
                <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
                  <div><dt className="font-semibold text-navy">Qualifications</dt><dd className="text-gray-600">[to be confirmed]</dd></div>
                  <div><dt className="font-semibold text-navy">Registration</dt><dd className="text-gray-600">[to be confirmed]</dd></div>
                </dl>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
