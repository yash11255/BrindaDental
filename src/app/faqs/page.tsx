import type { Metadata } from "next";
import { generalFaqs, services } from "@/lib/site";
import { CtaBand, Faq, PageHero } from "@/components/ui";
import FirstVisit from "@/components/sections/FirstVisit";

export const metadata: Metadata = {
  title: "Dental FAQs",
  description: "Answers to common questions about visiting Dr. Bindra Dental Care Centre and our treatments.",
  alternates: { canonical: "/faqs" },
};

export default function Faqs() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: generalFaqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <PageHero eyebrow="Patient resources" title="Frequently asked questions" />
      <section className="section">
        <div className="container-x max-w-3xl space-y-12">
          <div>
            <h2 className="h2 mb-4">Visiting the clinic</h2>
            <Faq items={generalFaqs} />
          </div>
          {services.map((s) => (
            <div key={s.slug}>
              <h2 className="h2 mb-4">{s.icon} {s.name}</h2>
              <Faq items={s.faqs} />
            </div>
          ))}
        </div>
      </section>
      <FirstVisit />
      <CtaBand />
    </>
  );
}
