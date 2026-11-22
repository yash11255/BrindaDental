import Link from "next/link";
import { site, whatsappLink } from "@/lib/site";

/** Persistent thumb-reach bar on small screens. Hidden on lg+, where the header CTA is always visible. */
export default function MobileBookBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 px-4 pb-[max(env(safe-area-inset-bottom),12px)] pt-3 backdrop-blur-md lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-[1fr_auto_auto] gap-2">
        <Link href="/book-appointment" className="btn-primary">Book a visit</Link>
        <a href={site.phoneHref} aria-label="Call the clinic" className="btn-outline w-12 px-0">
          <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>
        </a>
        <a href={whatsappLink()} target="_blank" rel="noopener" aria-label="Message us on WhatsApp" className="btn-outline w-12 px-0">
          <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z" /></svg>
        </a>
      </div>
    </div>
  );
}
