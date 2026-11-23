import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Medical Disclaimer", alternates: { canonical: "/medical-disclaimer" } };

export default function Page() {
  return (
    <LegalPage
      title="Medical Disclaimer"
      intro="Please read this before relying on any health information on this website."
      sections={[
        { id: "general", heading: "General information only", body: <p>Information about dental and cosmetology treatments on this site is for general education. It is not a diagnosis and does not replace an in-person examination by a qualified professional.</p> },
        { id: "individual", heading: "Results vary", body: <p>Every patient is different. Treatment suitability, duration, comfort and outcomes depend on your individual health, and no specific result is guaranteed. Photos are representative unless stated otherwise.</p> },
        { id: "emergency", heading: "Emergencies", body: <p>For severe dental pain, call us on {site.phone}. If you have facial swelling spreading to the eye or neck, difficulty breathing or swallowing, uncontrolled bleeding or a serious injury, go to the nearest hospital emergency department immediately.</p> },
        { id: "relationship", heading: "No doctor–patient relationship", body: <p>Using this website, the chat assistant or sending a WhatsApp message does not by itself create a doctor–patient relationship. That begins with your consultation at the clinic.</p> },
        { id: "medication", heading: "Medicines", body: <p>Do not start, stop or change any medicine based on information on this site. Always follow the advice of your doctor or dentist.</p> },
      ]}
    />
  );
}
