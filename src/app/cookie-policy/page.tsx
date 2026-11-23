import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Cookie Policy", alternates: { canonical: "/cookie-policy" } };

export default function Page() {
  return (
    <LegalPage
      title="Cookie Policy"
      intro="What cookies and similar technologies this website uses, and how to control them."
      sections={[
        { id: "what", heading: "What are cookies?", body: <p>Cookies are small files stored by your browser. They help websites work and can remember preferences.</p> },
        { id: "ours", heading: "Cookies we set", body: <p>This website does not set its own advertising or tracking cookies. It works without requiring you to accept cookies.</p> },
        { id: "third", heading: "Third-party cookies", body: <>
          <p>Some embedded content may set cookies when it loads:</p>
          <ul><li><strong>Google Maps</strong> — the location map on our contact and home pages</li><li><strong>Instagram</strong> — embedded reels, if shown</li><li><strong>WhatsApp</strong> — only when you choose to open a WhatsApp link</li></ul>
          <p>If analytics (such as Google Analytics) is added later, this policy will be updated first.</p>
        </> },
        { id: "control", heading: "Managing cookies", body: <p>You can block or delete cookies in your browser settings. Blocking third-party cookies may stop the map or embedded videos from displaying, but the rest of the site will work normally.</p> },
      ]}
    />
  );
}
