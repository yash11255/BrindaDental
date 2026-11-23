import "server-only";
import { site } from "@/lib/site";

/**
 * Live Google Business Profile reviews via the Google Places API (New).
 *
 * Setup (once):
 *   1. Google Cloud console → enable "Places API (New)" → create an API key
 *      (restrict it to the Places API).
 *   2. Add to .env.local and to Vercel → Settings → Environment Variables:
 *        GOOGLE_PLACES_API_KEY=...
 *        GOOGLE_PLACE_ID=...        (optional — looked up by name if missing)
 *
 * Google returns the overall rating, total review count and up to 5 reviews
 * ("most relevant"). Results are cached and refreshed every 12 hours.
 * Without a key, the site shows the rating badge and a link to Google — never invented reviews.
 */

export type GoogleReview = {
  author: string;
  authorUrl?: string;
  photo?: string;
  rating: number;
  text: string;
  relativeTime: string;
  publishTime?: string;
  url?: string;
};

export type GoogleReviewsData = {
  rating: number;
  total: number;
  mapsUrl: string;
  writeReviewUrl: string;
  reviews: GoogleReview[];
  live: boolean;
};

const REVALIDATE = 60 * 60 * 12;
const QUERY = "Dr. Bindra Dental Care Centre, Ram Bagh Road, Sadar Bazar, Ambala Cantt";

type PlaceReview = {
  rating?: number;
  text?: { text?: string };
  originalText?: { text?: string };
  relativePublishTimeDescription?: string;
  publishTime?: string;
  googleMapsUri?: string;
  authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
};

async function findPlaceId(key: string): Promise<string | null> {
  const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Goog-Api-Key": key, "X-Goog-FieldMask": "places.id" },
    body: JSON.stringify({ textQuery: QUERY, languageCode: "en", regionCode: "IN" }),
    next: { revalidate: 60 * 60 * 24 * 7 },
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { places?: { id: string }[] };
  return data.places?.[0]?.id ?? null;
}

/**
 * Real reviews copied verbatim from the clinic's Google Business Profile (captured 23 Nov 2026).
 * Shown until a Places API key is configured. Text cut off with "…" on Google is kept cut off —
 * each card links to Google for the full review. `date` is approximate (from "N months ago").
 */
const CURATED: (Omit<GoogleReview, "relativeTime"> & { date: string })[] = [
  { author: "DHRUV MALHOTRA", rating: 5, date: "2026-07-20", text: "Had my wisdom tooth removed here, and the entire procedure was quick, smooth, and painless. The staff was incredibly supportive, and their recovery advice made the healing process much easier than I expected." },
  { author: "jaspreet kaur", rating: 5, date: "2026-08-20", text: "Amazing experience! The service was excellent, and the entire treatment was completely pain-free. Dr Himanshu carefully listened to my concerns and recommended the best treatment based on my needs without any unnecessary procedures. The …" },
  { author: "Gurpal Singh", rating: 5, date: "2026-09-20", text: "I had a great experience with deep cleaning at Dr. Bindra Dental Care Centre. The procedure was done very professionally and comfortably. My teeth feel much cleaner, smoother, and fresher now. The doctor explained everything clearly and took great care throughout the treatment." },
  { author: "Shaurya Jaiswal", rating: 5, date: "2026-07-20", text: "My mother had my tooth extraction done at Dr. Bindra Dental Care Centre, and the entire experience was much better than I expected. The procedure was quick, painless, and handled with great care. Dr. Bindra explained everything clearly …" },
  { author: "vibhu kumar", rating: 5, date: "2024-11-20", text: "I had an excellent experience with Dr.Himanshu at Bindra Dental. Their professionalism and …" },
];

function relative(dateIso: string) {
  const months = Math.max(0, Math.round((Date.now() - new Date(dateIso).getTime()) / (30.44 * 864e5)));
  if (months < 1) return "a few weeks ago";
  if (months === 1) return "a month ago";
  if (months < 12) return `${months} months ago`;
  const y = Math.round(months / 12);
  return y === 1 ? "a year ago" : `${y} years ago`;
}

const fallback = (): GoogleReviewsData => {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(QUERY)}`;
  return {
    rating: site.rating,
    total: site.reviewCount,
    mapsUrl,
    writeReviewUrl: mapsUrl,
    live: false,
    reviews: CURATED.map(({ date, ...r }) => ({ ...r, publishTime: date, relativeTime: relative(date), url: mapsUrl })),
  };
};

export async function getGoogleReviews(): Promise<GoogleReviewsData> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) return fallback();

  try {
    const placeId = process.env.GOOGLE_PLACE_ID || (await findPlaceId(key));
    if (!placeId) return fallback();

    const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}?languageCode=en`, {
      headers: {
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "rating,userRatingCount,googleMapsUri,reviews",
      },
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) {
      console.error("Google Places error", res.status, await res.text());
      return fallback();
    }
    const p = (await res.json()) as { rating?: number; userRatingCount?: number; googleMapsUri?: string; reviews?: PlaceReview[] };

    return {
      rating: p.rating ?? site.rating,
      total: p.userRatingCount ?? site.reviewCount,
      mapsUrl: p.googleMapsUri ?? fallback().mapsUrl,
      writeReviewUrl: `https://search.google.com/local/writereview?placeid=${placeId}`,
      live: true,
      reviews: (p.reviews ?? [])
        .filter((r) => (r.text?.text || r.originalText?.text) && r.authorAttribution?.displayName)
        .map((r) => ({
          author: r.authorAttribution!.displayName!,
          authorUrl: r.authorAttribution?.uri,
          photo: r.authorAttribution?.photoUri,
          rating: r.rating ?? 5,
          text: (r.text?.text || r.originalText?.text || "").trim(),
          relativeTime: r.relativePublishTimeDescription ?? "",
          publishTime: r.publishTime,
          url: r.googleMapsUri,
        })),
    };
  } catch (e) {
    console.error("Google reviews fetch failed", e);
    return fallback();
  }
}
