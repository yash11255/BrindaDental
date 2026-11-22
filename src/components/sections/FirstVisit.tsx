import { firstVisit, generalFaqs } from "@/lib/site";
import { Faq } from "@/components/ui";

/** Timeline (5 cols) beside FAQs (6 cols, offset 1). On mobile the timeline comes first: it answers the biggest unknown. */
export default function FirstVisit() {
  return (
    <section className="section bg-stone" aria-labelledby="visit-h">
      <div className="container-x">
        <p className="eyebrow">Your first visit</p>
        <h2 id="visit-h" className="h2 mt-4 max-w-[20ch]">Forty-five minutes, and you leave with a plan — not a bill.</h2>

        <div className="mt-8 grid gap-12 md:grid-cols-12 md:gap-8">
          <ol data-reveal-stagger className="relative md:col-span-5">
            <span aria-hidden className="absolute bottom-3 left-[5px] top-3 w-px bg-line" />
            {firstVisit.map((s) => (
              <li key={s.t} className="relative pb-7 pl-9 last:pb-0">
                <span aria-hidden className="absolute left-0 top-[7px] h-[11px] w-[11px] rounded-full border-2 border-clay bg-stone" />
                <p className="num text-sm text-muted">{s.t}</p>
                <h3 className="mt-1 text-[17px] font-medium text-ink">{s.title}</h3>
                <p className="mt-1.5 max-w-[42ch] leading-relaxed">{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="md:col-span-6 md:col-start-7">
            <h3 className="mb-2 text-sm text-muted">Questions people ask before booking</h3>
            <Faq items={generalFaqs} />
          </div>
        </div>
      </div>
    </section>
  );
}
