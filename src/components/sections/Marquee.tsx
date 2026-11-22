import Link from "next/link";
import { serviceHref, services } from "@/lib/site";

const extra: string[] = [];

/** Slow, continuous ribbon of treatments — motion and colour between hero and content. Pauses on hover. */
export default function Marquee() {
  const items = [...services.map((s) => ({ label: s.name, href: serviceHref(s.slug) })), ...extra.map((label) => ({ label, href: "/services" }))];
  const row = [...items, ...items];
  return (
    <div className="group overflow-hidden bg-forest py-4 text-paper" aria-label="Treatments we offer">
      <ul className="flex w-max gap-10 motion-safe:animate-[marquee_40s_linear_infinite] group-hover:[animation-play-state:paused]">
        {row.map((it, i) => (
          <li key={i} aria-hidden={i >= items.length} className="flex items-center gap-10 whitespace-nowrap">
            <Link href={it.href} tabIndex={i >= items.length ? -1 : 0} className="font-serif text-xl hover:text-[#f3c9a8] md:text-2xl">{it.label}</Link>
            <span aria-hidden className="text-clay">✦</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
