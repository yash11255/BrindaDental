import { mapsLink, site, testimonials } from "@/lib/site";
import { Stars } from "@/components/ui";

/** One large pull-quote + a quieter column of short ones. Avoids the identical-card carousel. */
export default function Reviews() {
  const [lead, ...rest] = testimonials;
  return (
    <section className="section bg-ink text-paper/80" aria-labelledby="rev-h">
      <div className="container-x grid gap-12 md:grid-cols-12">
        <div data-reveal className="md:col-span-7">
          <p className="text-[12px] uppercase tracking-[0.16em] text-paper/50">From our Google reviews</p>
          <h2 id="rev-h" className="sr-only">Patient reviews</h2>
          <blockquote className="mt-6 font-serif text-[2rem] leading-[1.2] text-paper md:text-[2.75rem]">“{lead.text}”</blockquote>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
            <Stars n={lead.stars} />
            <span className="num text-paper">{site.rating} average · {site.reviewCount} reviews</span>
            <a href={mapsLink} target="_blank" rel="noopener" className="text-sm text-paper underline decoration-paper/30 underline-offset-4 hover:decoration-paper">Read them on Google</a>
          </div>
        </div>
        <ul data-reveal-stagger className="space-y-6 md:col-span-4 md:col-start-9 md:pt-14">
          {rest.map((t, i) => (
            <li key={i} className="border-t border-paper/15 pt-5">
              <p className="leading-relaxed text-paper/85">“{t.text}”</p>
              <p className="mt-2 text-xs text-paper/45">Google review</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
