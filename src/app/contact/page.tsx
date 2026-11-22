import type { Metadata } from "next";
import { fullAddress, mapsEmbedSrc, mapsLink, site, whatsappLink } from "@/lib/site";
import { PageHero } from "@/components/ui";
import EnquiryForm from "@/components/EnquiryForm";

export const metadata: Metadata = {
  title: "Contact Us — Dentist in Ambala Cantt",
  description: `Contact ${site.name}: ${fullAddress}. Call, WhatsApp or send an enquiry.`,
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Get in touch" text="Send an enquiry, call, or WhatsApp us — we'll get back to you quickly." />
      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <EnquiryForm />
          <iframe title="Clinic location map" src={mapsEmbedSrc} loading="lazy" className="h-80 w-full rounded-xl border border-line lg:h-full" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </section>
      <section className="bg-mint py-10">
        <div className="container-x grid gap-6 md:grid-cols-3">
          <div><p className="eyebrow">Address</p><p className="mt-2 text-gray-700">{fullAddress}</p><a href={mapsLink} target="_blank" rel="noopener" className="text-sm font-semibold text-teal hover:underline">Get directions →</a></div>
          <div><p className="eyebrow">Hours</p><p className="mt-2 text-gray-700">{site.hours}</p></div>
          <div><p className="eyebrow">Phone</p><p className="mt-2 text-gray-700">{site.phone}</p></div>
        </div>
        <div className="container-x mt-8 grid gap-3 sm:grid-cols-2">
          <a href={whatsappLink()} target="_blank" rel="noopener" className="btn bg-[#25D366] text-white hover:opacity-90">WhatsApp Us</a>
          <a href={site.phoneHref} className="btn bg-teal text-white hover:opacity-90">Call Clinic</a>
        </div>
      </section>
    </>
  );
}
