import type { Metadata } from "next";
import { site } from "@/lib/site";
import { CtaBand, PageHero } from "@/components/ui";
import GoogleReviews from "@/components/GoogleReviews";

export const metadata: Metadata = {
  title: "Patient Reviews",
  description: `Rated ${site.rating}★ on Google — read real patient reviews of Dr. Bindra Dental Care Centre, Ambala Cantt.`,
  alternates: { canonical: "/testimonials" },
};

// Re-render daily so review dates ("3 months ago") stay current.
export const revalidate = 86400;

export default function Testimonials() {
  return (
    <>
      <PageHero eyebrow="Patient reviews" title="Reviews from our Google Business Profile" text="Straight from Google — what patients in Ambala Cantt say about their visits." />
      <GoogleReviews heading={false} />
      <CtaBand />
    </>
  );
}
