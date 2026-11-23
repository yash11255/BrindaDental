import { getGoogleReviews } from "@/lib/googleReviews";
import { GoogleLogo, Stars } from "@/components/GoogleReviewParts";
import ReviewCarousel from "@/components/ReviewCarousel";

/** Google review widget: summary header + review cards, data straight from the Google Business Profile. */
export default async function GoogleReviews({ heading = true }: { heading?: boolean }) {
  const g = await getGoogleReviews();

  return (
    <section className="section bg-[#f8f9fa]" aria-labelledby="g-reviews-h">
      <div className="container-x">
        {heading && (
          <div data-reveal className="mb-8">
            <p className="eyebrow">Patient reviews</p>
            <h2 id="g-reviews-h" className="h2 mt-2">What patients say on Google</h2>
          </div>
        )}

        {/* Summary bar — mirrors the Google Business Profile header */}
        <div data-reveal className="flex flex-col gap-5 rounded-2xl border border-[#dadce0] bg-white p-5 font-[Roboto,Arial,sans-serif] shadow-[0_1px_2px_rgba(60,64,67,.15)] sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-center gap-5">
            <GoogleLogo className="h-7 w-auto shrink-0" />
            <div className="h-10 w-px bg-[#dadce0]" />
            <div>
              <p className="text-[15px] font-medium text-[#202124]">Dr. Bindra Dental Care Centre</p>
              <div className="mt-0.5 flex items-center gap-2">
                <span className="num text-[22px] font-medium leading-none text-[#202124]">{g.rating.toFixed(1)}</span>
                <Stars value={g.rating} size={18} />
                <a href={g.mapsUrl} target="_blank" rel="noopener" className="num text-[14px] text-[#1a73e8] hover:underline">{g.total.toLocaleString("en-IN")} reviews</a>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href={g.mapsUrl} target="_blank" rel="noopener" className="rounded-full border border-[#dadce0] px-5 py-2.5 text-[14px] font-medium text-[#1a73e8] hover:bg-[#f8f9fa]">See all reviews</a>
            <a href={g.writeReviewUrl} target="_blank" rel="noopener" className="rounded-full bg-[#1a73e8] px-5 py-2.5 text-[14px] font-medium text-white hover:bg-[#1765cc]">Write a review</a>
          </div>
        </div>

        {g.reviews.length > 0 ? (
          <ReviewCarousel reviews={g.reviews} />
        ) : (
          <p className="mt-5 text-center text-[14px] text-[#70757a]">
            Read what {g.total.toLocaleString("en-IN")} patients have written on{" "}
            <a href={g.mapsUrl} target="_blank" rel="noopener" className="font-medium text-[#1a73e8] hover:underline">Google Maps</a>.
          </p>
        )}

      </div>
    </section>
  );
}
