import HeroCarousel from "@/components/home/HeroCarousel";
import { BookingBand, Doctors, HomeFaq, NeedPicker, StatsBand, TreatmentGrid, WhyTrust } from "@/components/home/Sections";
import GoogleReviews from "@/components/GoogleReviews";
import InstagramReels from "@/components/sections/InstagramReels";

// Layout inspired by large Indian dental-chain sites: banner + booking card, trust stats,
// symptom picker, treatment cards, social proof, doctors, booking band, FAQs.
// Re-render daily so review dates ("3 months ago") stay current.
export const revalidate = 86400;

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <StatsBand />
      <NeedPicker />
      <TreatmentGrid />
      <InstagramReels />
      <GoogleReviews />
      <WhyTrust />
      <Doctors />
      <BookingBand />
      <HomeFaq />
    </>
  );
}
