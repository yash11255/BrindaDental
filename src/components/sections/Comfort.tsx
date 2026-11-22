import { comfort, images } from "@/lib/site";
import { Photo } from "@/components/ui";

/** Editorial list: each row pairs a patient's actual worry (serif, large) with a concrete answer. 5:7 split with a sticky intro column. */
export default function Comfort() {
  return (
    <section className="section bg-forest-tint" aria-labelledby="comfort-h">
      <div className="container-x grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <div data-reveal className="md:sticky md:top-28">
            <p className="eyebrow">Comfort, specifically</p>
            <h2 id="comfort-h" className="h2 mt-4">Most people don&apos;t fear dentists. They fear not knowing what&apos;s about to happen.</h2>
            <p className="mt-5 max-w-[42ch] text-lg leading-relaxed">So here are the four things patients ask us most, and exactly what we do about each.</p>
            <Photo src={images.clinic.src} label={images.clinic.alt} className="mt-8 hidden aspect-[5/4] md:block" />
          </div>
        </div>
        <ol data-reveal-stagger className="md:col-span-7 md:pl-8">
          {comfort.map((c, i) => (
            <li key={c.fear} className="grid gap-3 border-t border-forest/15 py-6 first:border-t-0 first:pt-0 sm:grid-cols-[3rem_1fr] md:py-7">
              <span className="num font-serif text-2xl text-clay">0{i + 1}</span>
              <div>
                <p className="font-serif text-[1.65rem] leading-snug text-ink md:text-[2rem]">{c.fear}</p>
                <p className="mt-3 max-w-[54ch] text-[17px] leading-relaxed">{c.answer}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
