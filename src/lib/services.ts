// Treatment content for every internal service page.
// Clinic-specific claims marked [confirm] must be checked with the clinic before publishing.

export type Category = "Implants" | "Cosmetic" | "General" | "Aesthetics";
export type ImageKey = "clinic" | "chair" | "checkup" | "smile" | "implant" | "rootCanal" | "facial" | "implantRoom" | "implantRoom2" | "cosmetologyBed" | "whitening" | "aligner";

export type Service = {
  slug: string;
  name: string;
  icon: string;
  category: Category;
  image: ImageKey;
  short: string;
  tagline: string;
  intro: string;
  facts: { label: string; value: string }[];
  signs: string[];
  benefits: { title: string; text: string }[];
  process: { title: string; text: string }[];
  comparison?: { caption: string; head: string[]; rows: string[][] };
  subTreatments?: { name: string; text: string; duration?: string; image?: string }[];
  aftercare: string[];
  performedBy: string;
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  /* ───────────── Dental implants ───────────── */
  {
    slug: "dental-implants",
    name: "Dental Implants",
    icon: "🦷",
    category: "Implants",
    image: "implantRoom",
    short: "Single-tooth & full-arch solutions",
    tagline: "A fixed tooth that looks, feels and chews like your own.",
    intro:
      "A dental implant replaces a missing tooth root with a small titanium post, topped with a natural-looking crown. At the Dr. Bindra Institute for Dental Implants, every case is planned from X-rays and a scan, and placed by Dr. Bindra himself.",
    facts: [
      { label: "Chair time", value: "60–90 min" },
      { label: "Visits", value: "3–4" },
      { label: "Total time", value: "~3 months" },
      { label: "Anaesthesia", value: "Local" },
    ],
    signs: [
      "You've lost one or more teeth to decay, gum disease or injury",
      "Your removable denture feels loose or makes eating difficult",
      "You'd rather not grind down healthy neighbouring teeth for a bridge",
      "A gap is affecting your confidence when you smile or speak",
    ],
    benefits: [
      { title: "Fixed, not removable", text: "No adhesives, no taking it out at night — it stays put like a natural tooth." },
      { title: "Protects the jawbone", text: "The implant stimulates bone where a tooth was lost, helping keep your face shape." },
      { title: "Leaves other teeth alone", text: "Unlike a bridge, neighbouring healthy teeth don't need to be cut down." },
    ],
    process: [
      { title: "Consultation & scan", text: "We examine the area, take X-rays and check bone height so we know an implant will hold." },
      { title: "Implant placement", text: "Under local anaesthesia, the titanium post is placed in the jaw. Most patients describe pressure, not pain." },
      { title: "Healing period", text: "Over 8–12 weeks the bone bonds to the implant. A temporary tooth can fill the gap meanwhile." },
      { title: "Crown fitting", text: "A custom crown, shade-matched to your teeth, is fixed on top. You leave with a complete smile." },
    ],
    comparison: {
      caption: "Implant compared with other ways to replace a missing tooth",
      head: ["", "Implant", "Bridge", "Removable denture"],
      rows: [
        ["Fixed in place", "Yes", "Yes", "No"],
        ["Affects neighbouring teeth", "No", "Yes — they're trimmed", "Clasps can wear them"],
        ["Preserves jawbone", "Yes", "No", "No"],
        ["Typical lifespan", "Many years with care", "10–15 years", "5–8 years"],
        ["Treatment time", "~3 months", "2–3 weeks", "2–4 weeks"],
      ],
    },
    aftercare: [
      "Soft, cool foods for the first 2–3 days",
      "Avoid smoking — it slows healing and raises failure risk",
      "Brush gently around the site; we'll give you a mouth rinse",
      "Mild swelling usually settles within 48 hours",
      "Review visit at one week, then routine check-ups every six months",
    ],
    performedBy: "Dr. Himanshu Bindra",
    faqs: [
      { q: "Does getting an implant hurt?", a: "The procedure is done under local anaesthesia. Most patients report mild soreness for a few days, manageable with ordinary painkillers." },
      { q: "Am I too old for an implant?", a: "Age itself isn't a barrier. What matters is general health and enough jawbone, which we check at the consultation." },
      { q: "How long does the full treatment take?", a: "Usually around three months, allowing the implant to bond with the bone before the crown is fitted. You'll get a personal timeline." },
      { q: "How much do dental implants cost in Ambala?", a: "Cost depends on the number of implants and whether bone grafting is needed. You'll receive a written, itemised estimate after the consultation." },
      { q: "What if I don't have enough bone?", a: "Bone grafting can often rebuild the area first. We'll explain whether it's needed after reviewing your X-rays." },
    ],
  },

  /* ───────────── Smile designing ───────────── */
  {
    slug: "smile-designing",
    name: "Smile Designing",
    icon: "✨",
    category: "Cosmetic",
    image: "smile",
    short: "Veneers, whitening & alignment",
    tagline: "A smile planned around your face — previewed before anything changes.",
    intro:
      "Smile designing combines treatments such as veneers, whitening, contouring and gum shaping into one plan built around your facial proportions, so the result looks balanced and natural rather than 'done'.",
    facts: [
      { label: "Consultation", value: "60 min" },
      { label: "Visits", value: "2–4" },
      { label: "Total time", value: "2–6 weeks" },
      { label: "Preview", value: "Before starting" },
    ],
    signs: [
      "Chipped, worn or uneven teeth",
      "Gaps between your front teeth",
      "Stains that whitening alone hasn't shifted",
      "A 'gummy' smile or uneven gum line",
      "You simply want to feel better about smiling in photos",
    ],
    benefits: [
      { title: "One coordinated plan", text: "Instead of piecemeal fixes, every change works together." },
      { title: "See it first", text: "We discuss and preview the planned result with you before any tooth is touched." },
      { title: "Conservative first", text: "We favour the least invasive option that achieves your goal." },
    ],
    process: [
      { title: "Smile consultation", text: "We photograph your smile, talk through what bothers you, and examine teeth and gums." },
      { title: "Design & preview", text: "A proposed design is shared with you — shape, length and shade — and adjusted until you're happy." },
      { title: "Treatment", text: "The agreed treatments are carried out over a few visits: whitening, veneers, bonding or contouring." },
      { title: "Review & polish", text: "A final check of bite and appearance, with small refinements if needed." },
    ],
    aftercare: [
      "Avoid biting hard objects (pens, ice, nails) with veneered teeth",
      "Limit tea, coffee and tobacco to keep the shade bright",
      "Use a soft brush and non-abrasive toothpaste",
      "Six-monthly check-ups to keep everything in good order",
    ],
    performedBy: "Dr. Himanshu Bindra",
    faqs: [
      { q: "Can I see the result before treatment?", a: "Yes. We discuss and preview the planned result with you before starting, and nothing proceeds until you approve it." },
      { q: "Are veneers permanent?", a: "Veneers are long-lasting but may need replacing after many years. Some options require removing a thin layer of enamel, which we'll explain." },
      { q: "Will it look natural?", a: "That's the aim. Shape and shade are chosen to suit your face and skin tone, not a one-size template." },
    ],
  },

  /* ───────────── Root canal ───────────── */
  {
    slug: "root-canal-treatment",
    name: "Root Canal Treatment",
    icon: "🛡",
    category: "General",
    image: "rootCanal",
    short: "Save an infected or painful tooth",
    tagline: "Stop the pain and keep your own tooth.",
    intro:
      "Root canal treatment removes infection from inside a tooth, relieving pain and saving the tooth instead of extracting it. With modern rotary instruments and good anaesthesia, it's far more comfortable than its reputation suggests.",
    facts: [
      { label: "Chair time", value: "60–90 min" },
      { label: "Visits", value: "1–2" },
      { label: "Anaesthesia", value: "Local" },
      { label: "Back to work", value: "Same day" },
    ],
    signs: [
      "Lingering pain to hot or cold that lasts after the food is gone",
      "Throbbing toothache, especially at night",
      "Pain when biting or touching the tooth",
      "Swelling or a small 'pimple' on the gum",
      "A tooth that has darkened after an injury",
    ],
    benefits: [
      { title: "Relieves the pain", text: "Removing infected pulp takes away the source of the ache." },
      { title: "Keeps your natural tooth", text: "Nothing chews quite like your own tooth — this avoids extraction and replacement." },
      { title: "Stops infection spreading", text: "Treating early prevents abscesses and damage to surrounding bone." },
    ],
    process: [
      { title: "Diagnosis & X-ray", text: "We confirm which tooth is affected and see the shape of its roots." },
      { title: "Numbing & cleaning", text: "Once fully numb, the infected pulp is removed and the canals are cleaned and shaped." },
      { title: "Sealing", text: "Canals are filled and sealed to keep bacteria out." },
      { title: "Crown", text: "A crown is usually recommended to protect the treated tooth from cracking." },
    ],
    aftercare: [
      "The tooth may feel tender for a few days — normal painkillers help",
      "Avoid chewing hard food on that side until the crown is fitted",
      "Don't skip the crown: treated back teeth can crack without one",
      "Contact us if swelling increases or pain worsens after 3 days",
    ],
    performedBy: "Dr. Himanshu Bindra",
    faqs: [
      { q: "Is root canal treatment painful?", a: "It's performed under local anaesthesia and most patients feel little more than during a regular filling. The pain you had before usually goes." },
      { q: "How many visits are needed?", a: "Often one to two visits, depending on the tooth and the level of infection." },
      { q: "Is extraction cheaper?", a: "Extraction can cost less upfront, but replacing the tooth later (implant or bridge) usually costs more. Saving the tooth is generally the better long-term choice." },
    ],
  },

  /* ───────────── Teeth whitening ───────────── */
  {
    slug: "teeth-whitening",
    name: "Teeth Whitening",
    icon: "😁",
    category: "Cosmetic",
    image: "whitening",
    short: "Professional, safe in-clinic whitening",
    tagline: "Visibly brighter in a single visit — with your gums protected.",
    intro:
      "Professional whitening lifts stains from tea, coffee, tobacco and age — safely, under a dentist's supervision. It's stronger and more even than shop-bought kits, with gums shielded throughout.",
    facts: [
      { label: "Chair time", value: "60–75 min" },
      { label: "Visits", value: "1" },
      { label: "Results", value: "Same day" },
      { label: "Lasts", value: "Months–years" },
    ],
    signs: [
      "Yellowing from tea, coffee or paan",
      "Teeth that have darkened with age",
      "An important event coming up — a wedding, interview or photos",
      "Healthy teeth and gums (we check this first)",
    ],
    benefits: [
      { title: "Fast, visible change", text: "A noticeably brighter smile in one sitting." },
      { title: "Supervised & safe", text: "Gums are protected and the gel strength is controlled by your dentist." },
      { title: "Even results", text: "Professional application avoids the patchy look of home kits." },
    ],
    process: [
      { title: "Shade check", text: "We record your current shade and check for decay or sensitivity first." },
      { title: "Gum protection", text: "A protective barrier is painted over your gums." },
      { title: "Whitening session", text: "Whitening gel is applied in short cycles until the target shade is reached." },
      { title: "Aftercare advice", text: "We share what to avoid for 48 hours so the result settles well." },
    ],
    aftercare: [
      "For 48 hours avoid tea, coffee, colas, turmeric-heavy food and tobacco",
      "Temporary sensitivity is normal and usually settles within a day or two",
      "Use a sensitivity toothpaste if needed",
      "Touch-up sessions can maintain the shade",
    ],
    performedBy: "Dr. Himanshu Bindra",
    faqs: [
      { q: "How long does whitening last?", a: "Results can last from several months to a couple of years, depending on diet and habits." },
      { q: "Will it make my teeth sensitive?", a: "Some temporary sensitivity is possible; it usually settles within a day or two." },
      { q: "Does whitening work on crowns or fillings?", a: "No — whitening only changes natural enamel. We'll point out any restorations that may need replacing to match." },
    ],
  },

  /* ───────────── Check-up & cleaning ───────────── */
  {
    slug: "checkup-and-cleaning",
    name: "Check-up & Cleaning",
    icon: "🪥",
    category: "General",
    image: "clinic",
    short: "Exam, scaling & polishing",
    tagline: "The 45 minutes that save you from bigger treatment later.",
    intro:
      "A routine check-up catches small problems while they're still small. We examine teeth, gums and soft tissues, remove tartar that brushing can't, and polish away surface stains — then tell you honestly if anything needs attention.",
    facts: [
      { label: "Chair time", value: "40–50 min" },
      { label: "Visits", value: "1" },
      { label: "Recommended", value: "Every 6 months" },
      { label: "Discomfort", value: "Minimal" },
    ],
    signs: [
      "It's been more than six months since your last visit",
      "Gums bleed when you brush or floss",
      "Bad breath that doesn't go away",
      "Visible tartar or staining near the gum line",
    ],
    benefits: [
      { title: "Catch problems early", text: "Small cavities are quicker, cheaper and more comfortable to fix." },
      { title: "Healthier gums", text: "Scaling removes tartar that causes bleeding and gum disease." },
      { title: "Fresher, brighter smile", text: "Polishing lifts surface stains from tea and coffee." },
    ],
    process: [
      { title: "Chat & history", text: "Any concerns, medical changes or sensitivity you've noticed." },
      { title: "Examination", text: "Teeth, gums, bite and soft tissues — X-rays only if there's a reason." },
      { title: "Scaling & polishing", text: "Tartar is removed with an ultrasonic scaler, then teeth are polished." },
      { title: "Advice & plan", text: "What we found, what (if anything) needs doing, and home-care tips." },
    ],
    aftercare: [
      "Gums may feel tender for a day after scaling",
      "Brush twice daily for two minutes with fluoride toothpaste",
      "Clean between teeth daily — floss or interdental brushes",
      "Book your next check-up in six months",
    ],
    performedBy: "Dr. Himanshu Bindra & team",
    faqs: [
      { q: "Does scaling damage enamel?", a: "No. Scaling removes hardened deposits from the tooth surface; it doesn't wear away enamel." },
      { q: "Why do my gums bleed during cleaning?", a: "Bleeding usually means inflamed gums from tartar build-up. It typically improves within a couple of weeks of a cleaning and good home care." },
      { q: "Will I always need X-rays?", a: "No. We take them only when they're needed to answer a specific question, such as checking between teeth or below the gum." },
    ],
  },

  /* ───────────── Kids dentistry ───────────── */
  {
    slug: "kids-dentistry",
    name: "Children's Dentistry",
    icon: "🧒",
    category: "General",
    image: "checkup",
    short: "Gentle, unhurried visits for children",
    tagline: "Good first experiences make for confident adult patients.",
    intro:
      "We keep children's visits short, friendly and explained in words they understand. Parents stay in the room. The goal is healthy teeth — and a child who isn't afraid of coming back. [confirm offered]",
    facts: [
      { label: "Visit length", value: "~30 min" },
      { label: "First visit", value: "By age 1–2" },
      { label: "Parents", value: "Stay in room" },
      { label: "Check-ups", value: "Every 6 months" },
    ],
    signs: [
      "Your child's first teeth have come through and they haven't seen a dentist",
      "White or brown spots on baby teeth",
      "Your child complains of tooth pain or avoids chewing on one side",
      "Thumb-sucking or crowding you're unsure about",
    ],
    benefits: [
      { title: "Prevent decay early", text: "Fluoride and sealants protect newly erupted teeth." },
      { title: "Spot growth issues", text: "We keep an eye on how teeth and jaws are developing." },
      { title: "Build trust", text: "Tell-show-do: we explain each step before doing it." },
    ],
    process: [
      { title: "Meet & play", text: "Your child sits in the chair, rides it up and down, and meets the team." },
      { title: "Gentle check", text: "A quick look and count of teeth, often on a parent's lap for little ones." },
      { title: "Prevention", text: "Cleaning, fluoride varnish or sealants where helpful." },
      { title: "Parent tips", text: "Brushing technique, diet and when to come back." },
    ],
    aftercare: [
      "Brush twice daily — a smear of toothpaste under 3, pea-sized after",
      "Limit sugary snacks and drinks between meals",
      "No bottles of milk or juice in bed",
      "Bring them for check-ups every six months",
    ],
    performedBy: "Dr. Himanshu Bindra & team",
    faqs: [
      { q: "When should my child first see a dentist?", a: "Ideally when the first tooth appears or by their first birthday — early visits are mostly about getting comfortable." },
      { q: "Do baby teeth really matter if they fall out anyway?", a: "Yes. They hold space for adult teeth, and decay in baby teeth can cause pain and infection." },
      { q: "My child is scared. What should I do?", a: "Tell us beforehand. We'll go slowly, explain everything, and stop if needed. Avoid words like 'hurt' or 'injection' at home." },
    ],
  },

  /* ───────────── Clear aligners ───────────── */
  {
    slug: "clear-aligners",
    name: "Clear Aligners",
    icon: "🔲",
    category: "Cosmetic",
    image: "aligner",
    short: "Nearly invisible teeth straightening",
    tagline: "Straighter teeth without metal brackets.",
    intro:
      "Clear aligners are a series of thin, removable trays that move teeth gradually. They're nearly invisible, come out for eating and brushing, and suit many cases of mild to moderate crowding or spacing. [confirm offered]",
    facts: [
      { label: "Consultation", value: "45 min" },
      { label: "Wear time", value: "20–22 hrs/day" },
      { label: "Reviews", value: "Every 6–8 weeks" },
      { label: "Typical course", value: "6–18 months" },
    ],
    signs: [
      "Mild to moderate crowding or gaps",
      "Teeth that have shifted since childhood braces",
      "You want to straighten teeth discreetly at work or college",
      "You're willing to wear trays most of the day",
    ],
    benefits: [
      { title: "Nearly invisible", text: "Most people won't notice you're wearing them." },
      { title: "Removable", text: "Take them out to eat, brush and floss — no food restrictions." },
      { title: "Fewer emergencies", text: "No brackets to break or wires to poke." },
    ],
    process: [
      { title: "Assessment", text: "We check whether aligners suit your case — some need fixed braces instead." },
      { title: "Scan & plan", text: "Impressions or a scan create a step-by-step plan of tooth movement." },
      { title: "Wear & switch", text: "You change to a new set of trays every 1–2 weeks." },
      { title: "Retain", text: "Retainers keep teeth in their new position once treatment ends." },
    ],
    aftercare: [
      "Wear aligners 20–22 hours a day — results depend on it",
      "Remove them for anything other than water",
      "Brush before putting trays back in",
      "Wear retainers as advised to stop teeth drifting back",
    ],
    performedBy: "Dr. Himanshu Bindra",
    faqs: [
      { q: "Are aligners as effective as braces?", a: "For suitable mild to moderate cases, yes. Complex bite problems may still need fixed braces; we'll tell you honestly at the assessment." },
      { q: "Do they hurt?", a: "Expect pressure for a day or two with each new set — a sign teeth are moving. It's usually mild." },
      { q: "Can I eat with them in?", a: "No. Take them out to eat or drink anything but water, then brush before putting them back." },
    ],
  },

  /* ───────────── Emergency ───────────── */
  {
    slug: "emergency-dental-care",
    name: "Emergency Dental Care",
    icon: "⚡",
    category: "General",
    image: "chair",
    short: "Same-day help for pain & injuries",
    tagline: "In pain? Call before noon for a same-day slot.",
    intro:
      "Severe toothache, a broken tooth, swelling or a knocked-out tooth need prompt care. We keep time free each day for urgent cases, aim to relieve pain at the first visit, and then plan any further treatment calmly.",
    facts: [
      { label: "Same-day", value: "Call before noon" },
      { label: "Visit", value: "30–45 min" },
      { label: "Aim", value: "Pain relief first" },
      { label: "Follow-up", value: "Planned calmly" },
    ],
    signs: [
      "Severe or throbbing toothache",
      "Facial or gum swelling",
      "A chipped, cracked or broken tooth",
      "A knocked-out tooth (come in within an hour if you can)",
      "A lost filling or crown",
    ],
    benefits: [
      { title: "Seen quickly", text: "Daily slots held back for urgent cases." },
      { title: "Relief first", text: "We focus on stopping the pain, then discuss options." },
      { title: "No pressure", text: "You won't be pushed into a big treatment plan on a painful day." },
    ],
    process: [
      { title: "Call us", text: "Describe what's happened and we'll find the earliest slot." },
      { title: "Assess", text: "Quick exam and X-ray to find the cause." },
      { title: "Relieve", text: "Treatment to stop pain — draining infection, temporary filling or starting a root canal." },
      { title: "Plan", text: "We explain what's needed next and book it when it suits you." },
    ],
    aftercare: [
      "Knocked-out tooth: hold it by the crown, rinse gently, keep it in milk, and come straight in",
      "Swelling: a cold compress outside the cheek — never heat",
      "Take painkillers as directed; don't place aspirin on the gum",
      "If swelling spreads to the eye or neck, or you have trouble breathing or swallowing, go to a hospital emergency department",
    ],
    performedBy: "Dr. Himanshu Bindra",
    faqs: [
      { q: "Can I be seen today?", a: "Call before noon and we'll aim to see you the same day. Calling is faster than the booking form for emergencies." },
      { q: "What if it's after hours?", a: "Call or WhatsApp us and we'll advise. For severe swelling or breathing difficulty, go to the nearest hospital emergency department. [confirm after-hours policy]" },
      { q: "Will I need a root canal?", a: "Not necessarily. We'll find the cause first and explain all options, including the simplest one." },
    ],
  },

  /* ───────────── Cosmetology ───────────── */
  {
    slug: "facial-aesthetics",
    name: "Facial Aesthetics & Lasers",
    icon: "💧",
    category: "Aesthetics",
    image: "facial",
    short: "Cosmetology by Dr. Sukhmani",
    tagline: "Clinical skin care, in the same trusted building.",
    intro:
      "The Centre for Facial Aesthetics & Lasers, led by Dr. Sukhmani, offers medical-grade skin and laser treatments right next to the dental clinic — with the same standards of hygiene, honest advice and easy booking.",
    facts: [
      { label: "Consultation", value: "30 min" },
      { label: "Sessions", value: "Varies" },
      { label: "Led by", value: "Dr. Sukhmani" },
      { label: "Location", value: "Next door" },
    ],
    signs: [
      "Acne, acne scars or open pores",
      "Pigmentation, tanning or uneven skin tone",
      "Unwanted facial or body hair",
      "Fine lines and dull, tired-looking skin",
      "You want advice from a qualified professional, not a salon",
    ],
    subTreatments: [
      { name: "Laser hair reduction", text: "Long-term reduction of unwanted hair on face and body.", duration: "15–60 min · 6–8 sessions", image: "/images/treatments/laser-hair-reduction.jpg" },
      { name: "Chemical peels", text: "Controlled exfoliation for pigmentation, acne and dullness.", duration: "30 min · 4–6 sessions", image: "/images/treatments/chemical-peel.jpg" },
      { name: "HydraFacial & medi-facials", text: "Deep cleansing, extraction and hydration with no downtime.", duration: "45–60 min", image: "/images/treatments/medi-facial.jpg" },
      { name: "Acne & scar treatment", text: "Combined medical and procedure-based plans for active acne and scarring.", duration: "Plan-based", image: "/images/treatments/acne-scar.jpg" },
      { name: "Pigmentation & tan removal", text: "Targeted treatments for melasma, sun spots and uneven tone.", duration: "Plan-based", image: "/images/treatments/pigmentation.jpg" },
      { name: "Anti-ageing care", text: "Treatments to soften fine lines and improve skin texture.", duration: "Consultation first", image: "/images/treatments/anti-ageing.jpg" },
    ],
    benefits: [
      { title: "Medical supervision", text: "Treatments planned and overseen by Dr. Sukhmani, not a beautician." },
      { title: "Honest advice", text: "If a treatment won't help your skin type, we'll say so." },
      { title: "Shared trust", text: "The same hygiene standards and booking desk as the dental clinic." },
    ],
    process: [
      { title: "Skin consultation", text: "We assess your skin type, concerns, history and any medicines you take." },
      { title: "Personal plan", text: "A written plan with the number of sessions, expected results and cost." },
      { title: "Treatment sessions", text: "Carried out in the dedicated aesthetics room, spaced as your skin needs." },
      { title: "Review & maintain", text: "Progress photos and a maintenance routine to keep results." },
    ],
    aftercare: [
      "Use sunscreen (SPF 30+) daily, especially after peels and laser",
      "Avoid direct sun, saunas and swimming for 48 hours after laser",
      "Skip scrubs and active creams for a few days after a peel",
      "Keep skin moisturised and follow the home-care routine given",
    ],
    performedBy: "Dr. Sukhmani",
    faqs: [
      { q: "Is this part of the dental clinic?", a: "It's a dedicated cosmetology wing in the same building, sharing reception and booking." },
      { q: "Is laser hair reduction safe for Indian skin?", a: "Yes, when settings are chosen for your skin type. Dr. Sukhmani assesses this at the consultation. [confirm device]" },
      { q: "How many sessions will I need?", a: "It depends on the treatment and your skin. You'll get an estimate in your written plan after the consultation." },
      { q: "Is there any downtime?", a: "Most treatments have little or none. Some peels cause mild flaking for a few days — we'll tell you beforehand." },
    ],
    comparison: undefined,
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

/** Cosmetology lives at its own top-level URL; every other treatment is under /services. */
export const serviceHref = (slug: string) => (slug === "facial-aesthetics" ? "/cosmetology" : `/services/${slug}`);

/** The five headline treatments featured on the homepage mosaic. */
export const featuredSlugs = ["dental-implants", "smile-designing", "root-canal-treatment", "teeth-whitening", "facial-aesthetics"];
