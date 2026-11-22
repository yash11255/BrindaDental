import type { Metadata } from "next";
import { getService } from "@/lib/site";
import ServiceDetail from "@/components/ServiceDetail";

export const metadata: Metadata = {
  title: "Cosmetology, Skin & Laser Treatments in Ambala Cantt",
  description:
    "Laser hair reduction, chemical peels, HydraFacial, acne, pigmentation and anti-ageing care by Dr. Sukhmani at the Centre for Facial Aesthetics & Lasers, Ambala Cantt.",
  alternates: { canonical: "/cosmetology" },
  openGraph: { images: ["/images/facial.jpg"] },
};

export default function CosmetologyPage() {
  return <ServiceDetail s={getService("facial-aesthetics")!} aesthetics />;
}
