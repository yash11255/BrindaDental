import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, CtaBand } from "@/components/ui";
import ServiceFilter from "@/components/ServiceFilter";
import CareByIntent from "@/components/sections/CareByIntent";

export const metadata: Metadata = {
  title: "Dental Services in Ambala Cantt",
  description: "Dental implants, smile designing, root canal, teeth whitening and facial aesthetics at Dr. Bindra Dental Care Centre, Ambala Cantt.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Our services" title="Dental & aesthetic treatments" text="Find the treatment you need — each explained in plain language, with what to expect at every step." />
      <section className="section">
        <div className="container-x">
          <ServiceFilter />
          <div className="mt-12 text-center">
            <Link href="/book-appointment" className="btn-primary">Not sure which treatment? Book a consultation</Link>
          </div>
        </div>
      </section>
      <CareByIntent />
      <CtaBand />
    </>
  );
}
