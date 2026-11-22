import HeroCarousel from "@/components/home/HeroCarousel";
import { BookingBand, Doctors, HomeFaq, NeedPicker, ReviewCards, StatsBand, TreatmentGrid, WhyTrust } from "@/components/home/Sections";
import InstagramReels from "@/components/sections/InstagramReels";

// Layout inspired by large Indian dental-chain sites: banner + booking card, trust stats,
// symptom picker, treatment cards, social proof, doctors, booking band, FAQs.
export default function Home() {
  return (
    <>
      <HeroCarousel />
      <StatsBand />
      <NeedPicker />
      <TreatmentGrid />
      <InstagramReels />
      <WhyTrust />
      <Doctors />
      <ReviewCards />
      <BookingBand />
      <HomeFaq />
    </>
  );
}
