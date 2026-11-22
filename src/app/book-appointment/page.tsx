import type { Metadata } from "next";
import { site, whatsappLink } from "@/lib/site";
import { PageHero } from "@/components/ui";
import EnquiryForm from "@/components/EnquiryForm";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description: `Request a dental appointment at ${site.name}, Ambala Cantt. We'll call you back to confirm.`,
  alternates: { canonical: "/book-appointment" },
};

export default function Book() {
  return (
    <>
      <PageHero eyebrow="Book appointment" title="Request an appointment" text="Answer three quick questions — your request opens in WhatsApp, ready to send. Prefer to talk? Call or WhatsApp us." />
      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-2xl border border-line p-6 md:p-8"><EnquiryForm showDate /></div>
          <aside className="space-y-4">
            <a href={site.phoneHref} className="card flex items-center gap-4 p-5">
              <span className="text-2xl">📞</span><span><span className="block font-bold text-navy">Call the clinic</span><span className="text-sm text-gray-600">{site.phone}</span></span>
            </a>
            <a href={whatsappLink()} target="_blank" rel="noopener" className="card flex items-center gap-4 p-5">
              <span className="text-2xl">💬</span><span><span className="block font-bold text-navy">WhatsApp us</span><span className="text-sm text-gray-600">Quick replies during clinic hours</span></span>
            </a>
            <div className="rounded-[10px] bg-mint p-5 text-sm text-gray-700">
              <p className="font-bold text-navy">Clinic hours</p>
              <p className="mt-1">{site.hours}</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
