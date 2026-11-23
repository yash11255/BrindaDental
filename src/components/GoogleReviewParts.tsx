/** Google-styled review UI pieces — shared by the server section and the client carousel. */
import type { GoogleReview } from "@/lib/googleReviews";

export function GoogleLogo({ className = "h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 272 92" className={className} role="img" aria-label="Google">
      <path fill="#EA4335" d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" />
      <path fill="#FBBC05" d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" />
      <path fill="#4285F4" d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z" />
      <path fill="#34A853" d="M225 3v65h-9.5V3h9.5z" />
      <path fill="#EA4335" d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z" />
      <path fill="#4285F4" d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z" />
    </svg>
  );
}

export function GoogleG({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}

export function Stars({ value, size = 16 }: { value: number; size?: number }) {
  return (
    <span className="inline-flex" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = Math.max(0, Math.min(1, value - (i - 1)));
        return (
          <svg key={i} width={size} height={size} viewBox="0 0 24 24" aria-hidden>
            <defs>
              <linearGradient id={`g${i}-${Math.round(fill * 100)}`}>
                <stop offset={`${fill * 100}%`} stopColor="#FBBC04" />
                <stop offset={`${fill * 100}%`} stopColor="#DADCE0" />
              </linearGradient>
            </defs>
            <path fill={`url(#g${i}-${Math.round(fill * 100)})`} d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8L12 2.5z" />
          </svg>
        );
      })}
    </span>
  );
}

const palette = ["#F4511E", "#00897B", "#5E35B1", "#1E88E5", "#E53935", "#7CB342", "#8E24AA", "#039BE5"];

export function Avatar({ r }: { r: GoogleReview }) {
  if (r.photo) {
    // Google-hosted profile photo; plain <img> so it loads exactly as Google serves it.
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={r.photo} alt="" width={40} height={40} referrerPolicy="no-referrer" loading="lazy" className="h-10 w-10 rounded-full object-cover" />;
  }
  const c = palette[r.author.charCodeAt(0) % palette.length];
  return <span className="grid h-10 w-10 place-items-center rounded-full text-base font-medium text-white" style={{ background: c }}>{r.author[0]}</span>;
}

export function ReviewCard({ r }: { r: GoogleReview }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-[#dadce0] bg-white p-5 font-[Roboto,Arial,sans-serif] shadow-[0_1px_2px_rgba(60,64,67,.15)] transition-shadow hover:shadow-[0_2px_8px_rgba(60,64,67,.25)]">
      <header className="flex items-start gap-3">
        <Avatar r={r} />
        <div className="min-w-0 flex-1">
          {r.authorUrl ? (
            <a href={r.authorUrl} target="_blank" rel="noopener nofollow" className="block truncate text-[15px] font-medium text-[#202124] hover:underline">{r.author}</a>
          ) : (
            <p className="truncate text-[15px] font-medium text-[#202124]">{r.author}</p>
          )}
          <p className="text-[12px] text-[#70757a]">{r.relativeTime}</p>
        </div>
        <GoogleG size={20} />
      </header>
      <div className="mt-3"><Stars value={r.rating} /></div>
      <p className="mt-2 line-clamp-6 flex-1 text-[14px] leading-[1.55] text-[#3c4043]">{r.text}</p>
      <footer className="mt-4 flex items-center justify-between border-t border-[#f1f3f4] pt-3 text-[12px] text-[#70757a]">
        <span className="flex items-center gap-1.5"><GoogleG size={12} /> Posted on Google</span>
        {r.url && <a href={r.url} target="_blank" rel="noopener nofollow" className="font-medium text-[#1a73e8] hover:underline">Read on Google</a>}
      </footer>
    </article>
  );
}

