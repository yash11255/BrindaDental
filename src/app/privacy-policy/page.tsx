import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy-policy" } };

export default function Page() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro={`How ${site.name} handles personal information when you use this website, contact us, or book an appointment — in line with India's Digital Personal Data Protection Act, 2023.`}
      sections={[
        { id: "who", heading: "Who we are", body: <p>{site.name} (&quot;we&quot;, &quot;us&quot;) is a dental and cosmetology clinic in Ambala Cantt, Haryana. We are the data fiduciary for personal data you share with us.</p> },
        { id: "collect", heading: "What we collect", body: <>
          <p>This website does <strong>not</strong> store booking details on our servers. When you use the booking form or chat assistant, your details are placed into a WhatsApp message that you choose to send. We receive:</p>
          <ul><li>Your name and mobile number</li><li>The reason for your visit and preferred day or time</li><li>Anything you choose to write in your message</li></ul>
          <p>At the clinic we keep clinical records (medical history, examinations, X-rays, treatment notes) needed to treat you safely.</p>
        </> },
        { id: "use", heading: "How we use it", body: <ul>
          <li>To confirm, schedule and remind you of appointments</li>
          <li>To provide treatment and maintain clinical records as required by law</li>
          <li>To answer your questions and share aftercare advice</li>
          <li>We do <strong>not</strong> sell your data or use it for third-party advertising</li>
        </ul> },
        { id: "consent", heading: "Your consent", body: <p>By sending us a message or booking a visit, you consent to us processing your details for the purposes above. You can withdraw consent at any time by contacting us; this will not affect care already provided or records we must keep by law.</p> },
        { id: "third", heading: "Third-party services", body: <>
          <p>This website uses: <strong>WhatsApp</strong> (Meta) for messages, <strong>Google Maps</strong> for the location map, <strong>Instagram</strong> embeds for videos, and <strong>Vercel</strong> for hosting. These services have their own privacy policies and may process technical data such as your IP address.</p>
        </> },
        { id: "retention", heading: "How long we keep data", body: <p>Appointment messages are kept only as long as needed to manage your visit. Clinical records are kept for the period required under applicable medical record-keeping rules. [Confirm retention period with the clinic.]</p> },
        { id: "rights", heading: "Your rights", body: <>
          <p>Under the DPDP Act, 2023 you may ask us to:</p>
          <ul><li>Access a summary of the personal data we hold about you</li><li>Correct or update inaccurate data</li><li>Erase data that is no longer needed (subject to legal retention)</li><li>Nominate another person to exercise your rights</li><li>Raise a grievance</li></ul>
        </> },
        { id: "security", heading: "Security", body: <p>The website is served over HTTPS. Clinical records are accessed only by authorised clinic staff. No method of transmission is completely secure; please avoid sending X-rays or detailed medical records over chat.</p> },
        { id: "grievance", heading: "Grievance officer", body: <p>Name: [to be confirmed] · Phone: {site.phone} · Email: {site.email}. We aim to respond within 7 working days. If unresolved, you may approach the Data Protection Board of India.</p> },
        { id: "changes", heading: "Changes to this policy", body: <p>We may update this policy from time to time. The date at the top shows when it was last revised.</p> },
      ]}
    />
  );
}
