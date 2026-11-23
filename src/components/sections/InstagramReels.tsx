"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { images, instagram, instagramEmbed, videos } from "@/lib/site";

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Clinic video in a phone-shaped card. Muted preview plays on hover/when tapped; tap again for sound. */
function VideoTile({ src, poster, title }: { src: string; poster: string; title: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [sound, setSound] = useState(false);
  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (!playing) { v.play(); setPlaying(true); }
    else if (!sound) { v.muted = false; setSound(true); }
    else { v.pause(); v.muted = true; setPlaying(false); setSound(false); }
  };
  return (
    <div className="lift group relative block aspect-[9/16] w-[220px] overflow-hidden rounded-[22px] bg-ink sm:w-[240px]"
      onMouseEnter={() => { if (!playing) ref.current?.play(); }} onMouseLeave={() => { if (!playing) ref.current?.pause(); }}>
      <video ref={ref} src={src} poster={poster} muted loop playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink/85" />
      <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-clay px-2.5 py-1 text-[11px] font-semibold text-white">● Clinic video</span>
      <button type="button" onClick={toggle} aria-label={!playing ? `Play: ${title}` : !sound ? "Turn sound on" : "Pause"}
        className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-paper/90 text-ink shadow-lg transition-transform duration-300 hover:scale-110">
        {!playing ? <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
          : !sound ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 5 6 9H3v6h3l5 4V5Zm5.5 3.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" /></svg>
          : <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M7 5h4v14H7zM13 5h4v14h-4z" /></svg>}
      </button>
      <span className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
        <span className="block font-serif text-lg leading-snug text-paper">{title}</span>
        <span className="mt-1 block text-xs text-paper/70">{!playing ? "Tap to play" : !sound ? "Tap for sound" : "Tap to pause"}</span>
      </span>
    </div>
  );
}

/** Reels strip shown right under the hero. Each reel is Instagram's official iframe embed (lazy-loaded).
 *  Desktop: row of phone-shaped cards with prev/next buttons. Mobile: swipeable, snap-scrolling.
 *  With no reels configured it falls back to a compact "follow us" band, so the page never shows an empty block. */
export default function InstagramReels() {
  const embeds = instagram.reels.map(instagramEmbed).filter((u): u is string => !!u);
  const track = useRef<HTMLUListElement>(null);
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});

  const scroll = (dir: 1 | -1) => track.current?.scrollBy({ left: dir * 340, behavior: "smooth" });

  const header = (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="eyebrow flex items-center gap-2"><InstagramIcon size={14} /> @{instagram.handle}</p>
        <h2 className="h2 mt-3">See the clinic in motion.</h2>
      </div>
      <div className="flex items-center gap-2">
        {embeds.length > 2 && (
          <>
            <button onClick={() => scroll(-1)} aria-label="Previous reels" className="hidden h-11 w-11 place-items-center rounded-full border border-ink/15 text-ink transition-colors hover:border-ink/50 hover:bg-white md:grid">←</button>
            <button onClick={() => scroll(1)} aria-label="Next reels" className="hidden h-11 w-11 place-items-center rounded-full border border-ink/15 text-ink transition-colors hover:border-ink/50 hover:bg-white md:grid">→</button>
          </>
        )}
        <a href={instagram.url} target="_blank" rel="noopener" className="btn-outline">
          <InstagramIcon /> Follow on Instagram
        </a>
      </div>
    </div>
  );

  if (!embeds.length) {
    // Preview tiles until real reel links are added in site.ts — each opens the Instagram profile.
    const previews = [
      { img: images.implantRoom, title: "Our implant suite" },
      { img: images.facial, title: "The cosmetology wing" },
      { img: images.teamWide, title: "Meet the team" },
      { img: images.reception, title: "Welcome to the clinic" },
    ];
    return (
      <section className="bg-paper py-12 md:py-14" aria-label="Instagram">
        <div className="container-x">{header}</div>
        <ul data-reveal-stagger
          className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:px-8 xl:px-[max(2rem,calc((100vw-1240px)/2+2rem))]">
          <li className="shrink-0 snap-start"><VideoTile {...videos.patient} /></li>
          <li className="shrink-0 snap-start"><VideoTile {...videos.intro} title="Precision. Confidence. Your smile." /></li>
          {previews.map((v) => (
            <li key={v.title} className="shrink-0 snap-start">
              <a href={instagram.url} target="_blank" rel="noopener" aria-label={`${v.title} — watch on Instagram`}
                className="lift group relative block aspect-[9/16] w-[220px] overflow-hidden rounded-[22px] bg-ink sm:w-[240px]">
                <Image src={v.img.src} alt="" fill sizes="240px" className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink/85" />
                <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-ink/50 px-2.5 py-1 text-[11px] font-medium text-paper backdrop-blur-sm">
                  <InstagramIcon size={12} /> Reel
                </span>
                <span aria-hidden className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-paper/90 text-ink shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                </span>
                <span className="absolute inset-x-0 bottom-0 p-4">
                  <span className="block font-serif text-lg leading-snug text-paper">{v.title}</span>
                  <span className="mt-1 block text-xs text-paper/70">Watch on Instagram →</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section className="bg-paper py-12 md:py-14" aria-labelledby="ig-h">
      <div className="container-x">
        <span id="ig-h" className="sr-only">Instagram reels</span>
        {header}
      </div>
      <ul ref={track} data-reveal-stagger
        className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-2 sm:px-8 xl:px-[max(2rem,calc((100vw-1240px)/2+2rem))]">
        {embeds.map((src, i) => (
          <li key={src} className="relative w-[280px] shrink-0 snap-start overflow-hidden rounded-[22px] bg-white ring-1 ring-line sm:w-[320px]">
            {!loaded[i] && (
              <div aria-hidden className="absolute inset-0 animate-pulse bg-gradient-to-b from-stone to-sand" />
            )}
            <iframe
              src={src}
              title={`Instagram reel ${i + 1} from @${instagram.handle}`}
              loading="lazy"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
              scrolling="no"
              onLoad={() => setLoaded((l) => ({ ...l, [i]: true }))}
              className="relative block h-[560px] w-full border-0 sm:h-[620px]"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
