import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Accessibility Statement", alternates: { canonical: "/accessibility" } };

export default function Page() {
  return (
    <LegalPage
      title="Accessibility"
      intro="We want this website and our clinic to be usable by everyone."
      sections={[
        { id: "website", heading: "This website", body: <ul>
          <li>Works with keyboard navigation, with visible focus outlines and a “skip to content” link</li>
          <li>Images have text descriptions for screen readers</li>
          <li>Colour contrast is chosen for readability</li>
          <li>Animations are reduced when your device asks for reduced motion</li>
          <li>Pages adapt to phones, tablets and desktops</li>
        </ul> },
        { id: "clinic", heading: "At the clinic", body: <p>If you need assistance getting to a treatment room, extra time, or someone to accompany you, please tell us when booking and we will help. [Confirm step-free access / lift availability.]</p> },
        { id: "feedback", heading: "Feedback", body: <p>If something on this site is hard to use, please call {site.phone} or WhatsApp us. We will try to fix it and help you in the meantime.</p> },
      ]}
    />
  );
}
