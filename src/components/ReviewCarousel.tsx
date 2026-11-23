"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { GoogleReview } from "@/lib/googleReviews";
import { ReviewCard } from "@/components/GoogleReviewParts";

/** Auto-scrolling review carousel. Advances one card every 4.5s, loops, pauses on hover/focus/touch,
 *  and stops entirely for reduced-motion users. Swipeable (scroll-snap) with arrows and dots. */
export default function ReviewCarousel({ reviews }: { reviews: GoogleReview[] }) {
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [pages, setPages] = useState(reviews.length);

  const cardStep = () => {
    const el = track.current;
    const first = el?.children[0] as HTMLElement | undefined;
    if (!el || !first) return 0;
    const gap = parseFloat(getComputedStyle(el).columnGap || "0");
    return first.offsetWidth + gap;
  };

  const goTo = useCallback((i: number) => {
    const el = track.current;
    if (!el) return;
    const step = cardStep();
    const max = el.scrollWidth - el.clientWidth;
    const target = Math.min(i * step, max);
    el.scrollTo({ left: target, behavior: "smooth" });
  }, []);

  // Track which card is in view + how many "stops" exist at this width
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => {
      const step = cardStep() || 1;
      const visible = Math.max(1, Math.round(el.clientWidth / step));
      setPages(Math.max(1, reviews.length - visible + 1));
      setActive(Math.round(el.scrollLeft / step));
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { el.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [reviews.length]);

  // Autoplay
  useEffect(() => {
    if (paused || pages <= 1 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => goTo(active + 1 >= pages ? 0 : active + 1), 4500);
    return () => clearInterval(t);
  }, [active, pages, paused, goTo]);

  const arrow = "grid h-11 w-11 place-items-center rounded-full border border-[#dadce0] bg-white text-[#3c4043] shadow-[0_1px_2px_rgba(60,64,67,.2)] transition hover:bg-[#f8f9fa] disabled:opacity-40";

  return (
    <div className="relative mt-5" aria-roledescription="carousel" aria-label="Google reviews"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)} onBlurCapture={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}>
      <ul ref={track} className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-1 pb-2">
        {reviews.map((r, i) => (
          <li key={`${r.author}-${r.publishTime}`} aria-roledescription="slide" aria-label={`${i + 1} of ${reviews.length}`}
            className="w-[86%] shrink-0 snap-start sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]">
            <ReviewCard r={r} />
          </li>
        ))}
      </ul>

      {pages > 1 && (
        <div className="mt-5 flex items-center justify-center gap-4">
          <button type="button" onClick={() => goTo(active - 1 < 0 ? pages - 1 : active - 1)} aria-label="Previous review" className={arrow}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 6-6 6 6 6" /></svg>
          </button>
          <div className="flex gap-2">
            {Array.from({ length: pages }).map((_, i) => (
              <button key={i} type="button" onClick={() => goTo(i)} aria-label={`Go to review ${i + 1}`} aria-current={i === active}
                className={`h-2 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-[#1a73e8]" : "w-2 bg-[#dadce0] hover:bg-[#bdc1c6]"}`} />
            ))}
          </div>
          <button type="button" onClick={() => goTo(active + 1 >= pages ? 0 : active + 1)} aria-label="Next review" className={arrow}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 6 6 6-6 6" /></svg>
          </button>
        </div>
      )}
    </div>
  );
}
