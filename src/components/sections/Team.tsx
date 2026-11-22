import Link from "next/link";
import { Monogram } from "@/components/ui";

const team = [
  {
    name: "Dr. Himanshu Bindra",
    role: "Founder · Implants & smile design",
    focus: ["Dental implants", "Smile designing", "Root canal treatment"],
    aside: "Plans every implant case himself, from the first scan to the final crown.",
    portrait: "aspect-[16/10]",
  },
  {
    name: "Dr. Sukhmani",
    role: "Cosmetologist · Facial aesthetics & lasers",
    focus: ["Skin treatments", "Laser care"],
    aside: "Runs the aesthetics wing next door, with the same booking desk.",
    portrait: "aspect-[16/10] md:mt-10",
  },
];

/** Two editorial portraits, deliberately staggered (second drops 96px) so the pair reads as people, not a grid. */
export default function Team() {
  return (
    <section className="section" aria-labelledby="team-h">
      <div className="container-x">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <h2 id="team-h" className="h2 md:col-span-7">The people you&apos;ll actually see.</h2>
          <p className="md:col-span-4 md:col-start-9">Small team, same faces each visit. Credentials and registrations are on each profile. [confirm]</p>
        </div>
        <div data-reveal-stagger className="mt-8 grid gap-10 md:grid-cols-12 md:gap-8">
          {team.map((p, i) => (
            <article key={p.name} className={i === 0 ? "md:col-span-5" : "md:col-span-5 md:col-start-8"}>
              <Monogram name={p.name} className={p.portrait} />
              <h3 className="mt-6 font-serif text-2xl text-ink">{p.name}</h3>
              <p className="mt-1 text-sm text-muted">{p.role}</p>
              <p className="mt-4 max-w-[40ch] leading-relaxed">{p.aside}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {p.focus.map((f) => <li key={f} className="rounded-full bg-stone px-3 py-1 text-[13px] text-ink-soft">{f}</li>)}
              </ul>
            </article>
          ))}
        </div>
        <Link href="/dentists" className="link mt-8 inline-block">Full profiles &amp; qualifications</Link>
      </div>
    </section>
  );
}
