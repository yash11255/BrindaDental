import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Appointment & Cancellation Policy", alternates: { canonical: "/appointment-policy" } };

export default function Page() {
  return (
    <LegalPage
      title="Appointment & Cancellation"
      intro="How booking, rescheduling and cancellations work at the clinic."
      sections={[
        { id: "booking", heading: "Booking", body: <p>You can request an appointment through the website (which opens WhatsApp), by calling {site.phone}, or at reception. Your slot is confirmed once our team replies with a date and time.</p> },
        { id: "arrive", heading: "Arriving for your visit", body: <p>Please arrive 5–10 minutes early, bring any previous X-rays or prescriptions, and tell us about medicines you take or changes to your health.</p> },
        { id: "late", heading: "Running late", body: <p>If you are running more than 15 minutes late, please call or message us. We will try to see you, but may need to reschedule to keep other patients on time.</p> },
        { id: "cancel", heading: "Cancelling or rescheduling", body: <p>Please let us know at least 24 hours in advance if you need to cancel or move your appointment, so the slot can be offered to someone else. [Confirm any charges for missed appointments with the clinic.]</p> },
        { id: "estimates", heading: "Estimates & payment", body: <p>You will receive a written, itemised estimate before treatment begins. Payment terms for multi-visit treatments are explained in your plan. [Confirm accepted payment methods and any advance-payment policy.]</p> },
        { id: "refunds", heading: "Refunds", body: <p>Fees for consultations and treatment already carried out are not refundable. Where an advance has been paid for treatment not yet started, please discuss refunds with the clinic. [Confirm refund policy.]</p> },
        { id: "emergency", heading: "Emergencies", body: <p>For urgent dental pain, call before noon and we will aim to see you the same day.</p> },
      ]}
    />
  );
}
