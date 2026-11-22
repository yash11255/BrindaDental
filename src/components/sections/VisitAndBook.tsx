import { fullAddress, mapsEmbedSrc, mapsLink, site } from "@/lib/site";
import EnquiryForm from "@/components/EnquiryForm";

/** Location (5 cols) + booking card (7 cols). The form is the visual weight; location details are quiet reference. */
export default function VisitAndBook() {
  return (
    <section id="book" className="section scroll-mt-20 bg-paper" aria-labelledby="book-h">
      <div className="container-x grid gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <p className="eyebrow">Visit us</p>
          <h2 id="book-h" className="h2 mt-4">Parkash Sweets Chowk, on Ram Bagh Road.</h2>
          <address className="mt-6 not-italic leading-relaxed">{fullAddress}</address>
          <dl className="num mt-8 grid grid-cols-2 gap-6 border-t border-line pt-6 text-[15px]">
            <div><dt className="text-xs text-muted">Hours</dt><dd className="mt-1 text-ink">{site.hours}</dd></div>
            <div><dt className="text-xs text-muted">Phone</dt><dd className="mt-1"><a href={site.phoneHref} className="text-ink hover:text-forest">{site.phone}</a></dd></div>
          </dl>
          <div className="mt-8 overflow-hidden rounded-[20px] border border-line">
            <iframe title="Map showing the clinic location" src={mapsEmbedSrc} loading="lazy" className="h-64 w-full grayscale-[60%]" referrerPolicy="no-referrer-when-downgrade" />
          </div>
          <a href={mapsLink} target="_blank" rel="noopener" className="link mt-4 inline-block text-[15px]">Open in Google Maps</a>
        </div>
        <div className="md:col-span-7">
          <div data-reveal className="rounded-[24px] bg-white p-6 shadow-[0_24px_60px_-30px_rgba(28,35,33,.35)] ring-1 ring-line sm:p-8">
            <h3 className="font-serif text-2xl text-ink">Request a visit</h3>
            <p className="mt-2 text-[15px]">Three short steps, then it opens WhatsApp with your request ready to send. We reply to confirm a time.</p>
            <div className="mt-8"><EnquiryForm showDate /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
