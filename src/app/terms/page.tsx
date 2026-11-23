import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Terms of Use", alternates: { canonical: "/terms" } };

export default function Page() {
  return (
    <LegalPage
      title="Terms of Use"
      intro={`The terms that apply when you use the ${site.name} website.`}
      sections={[
        { id: "accept", heading: "Using this website", body: <p>By using this website you agree to these terms. If you do not agree, please do not use the site.</p> },
        { id: "info", heading: "Information only", body: <p>Content on this site is general information about our clinic and treatments. It is not medical advice. See our <Link href="/medical-disclaimer">Medical Disclaimer</Link>.</p> },
        { id: "booking", heading: "Booking requests", body: <p>Submitting the booking form or chatting with the assistant creates a <strong>request</strong>, not a confirmed appointment. An appointment is confirmed only when our team replies to confirm a time. See our <Link href="/appointment-policy">Appointment &amp; Cancellation Policy</Link>.</p> },
        { id: "prices", heading: "Prices & estimates", body: <p>Durations, visit counts and any prices shown are indicative. Your final treatment plan and itemised estimate are provided after an in-person examination.</p> },
        { id: "chat", heading: "Chat assistant", body: <p>The on-site assistant gives automated, general answers based on information on this website. It cannot diagnose conditions. For anything specific, please speak to our team.</p> },
        { id: "ip", heading: "Content & trademarks", body: <p>Text, clinic photographs, videos and branding on this site belong to {site.name} unless credited otherwise (see <Link href="/image-credits">Image credits</Link>). Please do not reuse them without permission.</p> },
        { id: "links", heading: "Third-party links", body: <p>Links to WhatsApp, Google Maps, Instagram and other sites are provided for convenience. We are not responsible for their content or practices.</p> },
        { id: "liability", heading: "Limitation of liability", body: <p>We work to keep information accurate but do not guarantee it is complete or current. To the extent permitted by law, we are not liable for losses arising from use of this website.</p> },
        { id: "law", heading: "Governing law", body: <p>These terms are governed by the laws of India. Courts at Ambala, Haryana shall have jurisdiction.</p> },
      ]}
    />
  );
}
