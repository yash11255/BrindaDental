// Central clinic data. Items marked TODO must be confirmed with the clinic before publishing.

export const site = {
  name: "Dr. Bindra Dental Care Centre",
  shortName: "Bindra Dental",
  tagline: "Centre for Dental Excellence since 2015",
  url: "https://bindradentalcare.com", // TODO: confirm domain
  rating: 4.8,
  reviewCount: 265,
  since: 2015,
  phone: "+91 00000 00000", // TODO: real clinic phone from GMB
  phoneDisplay: "+91 00000 00000", // TODO: formatted for display
  phoneHref: "tel:+910000000000",
  whatsapp: "910000000000", // TODO: WhatsApp number, digits only with country code
  email: "info@bindradentalcare.com", // TODO
  address: {
    street: "Parkash Sweets Chowk, Ram Bagh Road, Housing Board Colony, Sadar Bazar",
    city: "Ambala Cantt",
    region: "Haryana",
    postalCode: "133001",
    country: "IN",
  },
  hours: "Mon–Sat, 9 AM – 5 PM", // TODO: confirm
  mapsQuery: "Dr. Bindra Dental Care Centre, Ram Bagh Road, Ambala Cantt",
};

export const whatsappLink = (text = "Hello, I'd like to book an appointment.") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`;

export const mapsEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&output=embed`;
export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapsQuery)}`;

export const nav = [
  { href: "/services", label: "Treatments" },
  { href: "/cosmetology", label: "Cosmetology" },
  { href: "/dentists", label: "Our Doctors" },
  { href: "/about", label: "Why Bindra" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export * from "./services";
import { services } from "./services";

export const dentists = [
  {
    name: "Dr. Himanshu Bindra",
    photo: "/images/clinic/dr-bindra-portrait.jpg" as string | undefined,
    role: "Founder · Dental Implants & Smile Designing",
    bio: "Leads the practice and personally oversees every treatment plan, from consultation through aftercare.",
  },
  {
    name: "Dr. Sukhmani",
    photo: "/images/clinic/dr-sukhmani-portrait.jpg" as string | undefined,
    role: "Cosmetologist · Facial Aesthetics & Lasers",
    bio: "Heads the Centre for Facial Aesthetics & Lasers.",
  },
];

// Reviews now come live from Google (see lib/googleReviews.ts). Kept empty so no invented reviews are ever shown.
export const testimonials: { name: string; text: string; stars: number }[] = [];

export const generalFaqs = [
  { q: "Where is the clinic located?", a: `We are at ${"Parkash Sweets Chowk, Ram Bagh Road, Sadar Bazar, Ambala Cantt"}.` },
  { q: "Do I need an appointment?", a: "Appointments are recommended so we can keep waiting time short, but walk-ins are welcome when slots are free." },
  { q: "What happens at my first visit?", a: "A check-up, any X-rays needed, and a clear explanation of your options and costs before any treatment begins." },
  { q: "Do you handle dental emergencies?", a: "Please call us directly for urgent pain or injury and we will see you as soon as possible." },
  { q: "Which payment methods do you accept?", a: "Cash, UPI and cards. [confirm]" },
];

// ── Care grouped by patient intent (homepage + /services) ──
// `from` is a starting price in INR. null = "quoted after exam". TODO: fill with clinic-approved figures.
export type CareItem = { name: string; slug?: string; duration: string; visits: string; from: number | null; note: string };
export type CareGroup = { id: string; label: string; lede: string; image?: { src: string; alt: string }; items: CareItem[] };

export const careGroups: CareGroup[] = [
  {
    id: "routine",
    image: { src: "/images/checkup.jpg", alt: "A dentist gently examining a young boy's teeth" },
    label: "Routine & prevention",
    lede: "For when nothing hurts and you'd like to keep it that way.",
    items: [
      { name: "Check-up & cleaning", slug: "checkup-and-cleaning", duration: "40–50 min", visits: "1 visit", from: null, note: "Exam, scaling and polish, with X-rays only if your dentist sees a reason." },
      { name: "Fillings", duration: "30–45 min", visits: "1 visit", from: null, note: "Tooth-coloured composite, matched to the shade around it." },
      { name: "Children's dentistry", slug: "kids-dentistry", duration: "30 min", visits: "1 visit", from: null, note: "Short, unhurried visits. Parents stay in the room." },
    ],
  },
  {
    id: "smile",
    image: { src: "/images/smile.jpg", alt: "A woman with a natural, confident smile" },
    label: "Smile & alignment",
    lede: "Changes you'll see in the mirror — planned, previewed, never rushed.",
    items: [
      { name: "Smile designing", slug: "smile-designing", duration: "60 min consult", visits: "2–4 visits", from: null, note: "A plan built around your face, previewed with you before anything is changed." },
      { name: "Teeth whitening", slug: "teeth-whitening", duration: "60–75 min", visits: "1 visit", from: null, note: "In-clinic, with your gums protected throughout." },
      { name: "Clear aligners", slug: "clear-aligners", duration: "45 min consult", visits: "Every 6–8 weeks", from: null, note: "Removable trays for mild to moderate crowding." },
      { name: "Facial aesthetics & lasers", slug: "facial-aesthetics", duration: "30–60 min", visits: "Varies", from: null, note: "Skin and laser care by Dr. Sukhmani, in the wing next door." },
    ],
  },
  {
    id: "restore",
    image: { src: "/images/root-canal.jpg", alt: "Dentist pointing to a root canal on a dental X-ray" },
    label: "Restorative & urgent",
    lede: "Pain, a broken tooth, or a gap you've been living with.",
    items: [
      { name: "Same-day pain relief", slug: "emergency-dental-care", duration: "30–45 min", visits: "1 visit", from: null, note: "Call before noon and we'll aim to see you the same day." },
      { name: "Root canal treatment", slug: "root-canal-treatment", duration: "60–90 min", visits: "1–2 visits", from: null, note: "Under local anaesthesia; most patients compare it to a long filling." },
      { name: "Dental implants", slug: "dental-implants", duration: "60 min consult", visits: "3–4 over ~3 months", from: null, note: "Planned from X-rays and a 3D scan, placed by Dr. Bindra." },
    ],
  },
];

export const formatFrom = (n: number | null) =>
  n == null ? "Quoted after exam" : `From ₹${n.toLocaleString("en-IN")}`;

// ── Comfort commitments: each answers one specific fear ──
export const comfort = [
  {
    fear: "“Will it hurt?”",
    answer: "We numb with a topical gel before any injection, and we stop the moment you raise your hand. You'll agree a signal with your dentist before we start.",
  },
  {
    fear: "“Will I be kept waiting?”",
    answer: "Appointments are spaced so one running long doesn't push everyone else. If we're more than 15 minutes behind, reception will message you.",
  },
  {
    fear: "“Am I being sold something I don't need?”",
    answer: "You get a written plan with what's urgent, what can wait, and what's optional — and a price against each line before you decide.",
  },
  {
    fear: "“Are the instruments really clean?”",
    answer: "Instruments are autoclaved and sealed in pouches that are opened in front of you. Ask to see the sterilisation room — we're glad to show it. [confirm process]",
  },
];

// ── What happens in the first visit ──
export const firstVisit = [
  { t: "0–5 min", title: "Arrive & settle", text: "A short form about your health and any worries. Tell us if you're nervous — it changes how we pace things." },
  { t: "5–15 min", title: "Talk first", text: "Your dentist asks what brought you in before looking at anything. No instruments yet." },
  { t: "15–30 min", title: "Examination", text: "A gentle check of teeth and gums, and X-rays only if they're needed to answer a real question." },
  { t: "30–45 min", title: "Your plan, in writing", text: "What we found, the options, and the cost of each. You decide later — nothing is booked on the spot." },
];

// ── Images ──
// Real clinic photography lives in /public/images/clinic. A few explanatory stock images remain
// (implant illustration, X-ray, smile, child check-up) — credits on /image-credits.
const c = (f: string) => `/images/clinic/${f}.jpg`;
export const images = {
  // clinic photos
  building: { src: c("building"), alt: "Dr. Bindra Dental Care Centre building — Centre for Dental Excellence since 2015" },
  building2: { src: c("building-2"), alt: "Clinic building with the cosmetology and implant institute signage" },
  team: { src: c("team"), alt: "Dr. Bindra and the clinic team" },
  teamWide: { src: c("team-3"), alt: "The Dr. Bindra Dental Care Centre team at the clinic entrance" },
  drBindra: { src: c("dr-bindra"), alt: "Dr. Himanshu Bindra in the implant treatment room" },
  clinic: { src: c("operatory"), alt: "Dental treatment room with a modern chair and ring light" },
  chair: { src: c("operatory-wide"), alt: "Treatment room with dental chair, sink and instruments" },
  implantRoom: { src: c("implant-room"), alt: "Implant treatment room at the Dr. Bindra Institute" },
  implantRoom2: { src: c("implant-room-2"), alt: "Implant suite with dental chair and overhead light" },
  implantSign: { src: c("implantologist-sign"), alt: "Implantologist Dr. Bindra sign in the treatment room" },
  facial: { src: c("cosmetology-room"), alt: "Cosmetology treatment room with aesthetic bed and ring light" },
  cosmetologyBed: { src: c("cosmetology-bed"), alt: "Aesthetic treatment bed in the cosmetology wing" },
  reception: { src: c("reception"), alt: "Reception with the clinic logo and product shelves" },
  consultation: { src: c("consultation"), alt: "Consultation desk at the clinic" },
  // explanatory stock
  checkup: { src: "/images/checkup.jpg", alt: "A dentist gently examining a young boy's teeth" },
  smile: { src: "/images/smile.jpg", alt: "A woman with a natural, confident smile" },
  implant: { src: "/images/implant.jpg", alt: "Illustration of a dental implant and crown seated in the jawbone" },
  rootCanal: { src: "/images/root-canal.jpg", alt: "Dentist pointing to a root canal on a dental X-ray" },
  whitening: { src: "/images/treatments/whitening-shade-guide.jpg", alt: "Dental shade guide used to measure tooth whiteness" },
  aligner: { src: "/images/treatments/clear-aligner.jpg", alt: "A transparent clear aligner tray" },
} as const;

export const videos = {
  intro: { src: "/videos/brand-intro.mp4", poster: "/videos/brand-intro-poster.jpg", title: "Dr. Bindra Dental Care Centre", vertical: false },
  patient: { src: "/videos/doctor-patient.mp4", poster: "/videos/doctor-patient-poster.jpg", title: "A happy patient after treatment", vertical: true },
} as const;

export const serviceImage: Record<string, keyof typeof images> = Object.fromEntries(services.map((s) => [s.slug, s.image]));

export const imageCredits = [
  { file: "checkup.jpg", author: "Frederick Noronha", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:An_Indian_dentist_at_work.jpg" },
  { file: "smile.jpg", author: "Yosarian", license: "CC BY-SA 2.5", url: "https://commons.wikimedia.org/wiki/File:Indian_woman_smiles.jpg" },
  { file: "implant.jpg", author: "Wikimedia Commons contributor", license: "CC BY-SA", url: "https://commons.wikimedia.org/wiki/File:Dental-implant-illustration.jpg" },
  { file: "treatments/whitening-shade-guide.jpg", author: "Shaimaa Abdellatif", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Shade_guide.jpg" },
  { file: "treatments/clear-aligner.jpg", author: "Smikey Io", license: "CC BY-SA 3.0", url: "https://commons.wikimedia.org/wiki/File:Invisalign_aligner.jpg" },
  { file: "treatments/laser-hair-reduction.jpg", author: "Amaregenmed (Alice Pien, MD)", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Laser-hair-removal-face-ama-regenerative-medicine.jpg" },
  { file: "treatments/medi-facial.jpg", author: "Keyfwellness", license: "CC0", url: "https://commons.wikimedia.org/wiki/File:SPA_SKIN_CARE.jpg" },
  { file: "treatments/acne-scar.jpg", author: "NewAgeAesthetics", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Microdermabrasion_cosmetic_procedure.jpg" },
  { file: "treatments/chemical-peel.jpg", author: "Shixart1985", license: "CC BY 2.0", url: "https://commons.wikimedia.org/wiki/File:Woman_applying_serum_on_her_face_closeup.jpg" },
  { file: "treatments/pigmentation.jpg", author: "Shixart1985", license: "CC BY 2.0", url: "https://commons.wikimedia.org/wiki/File:Woman_applies_skin_cream_at_home_closeup.jpg" },
  { file: "treatments/anti-ageing.jpg", author: "Shixart1985", license: "CC BY 2.0", url: "https://commons.wikimedia.org/wiki/File:Cucumber_slices_placed_beside_a_green_facial_mask_and_a_skincare_applicator_on_a_light_pink_background.jpg" },
  { file: "root-canal.jpg", author: "Dr. Alan Carr (Flickr)", license: "CC BY 2.0", url: "https://www.flickr.com/photo.gne?id=6219931567" },
];

// Clinic photos and videos in /public/images/clinic and /public/videos are the clinic's own.

// ── Booking → WhatsApp ──
export type BookingDetails = { name: string; phone: string; reason?: string; date?: string; window?: string; message?: string };
export const bookingWhatsappLink = (d: BookingDetails) =>
  whatsappLink(
    [
      `Hello ${site.name}, I'd like to book an appointment.`,
      ``,
      `Name: ${d.name}`,
      `Phone: ${d.phone}`,
      d.reason && `Reason: ${d.reason}`,
      d.date && `Preferred day: ${d.date}`,
      d.window && `Time of day: ${d.window}`,
      d.message && `Note: ${d.message}`,
    ]
      .filter((l) => l !== undefined && l !== "")
      .join("\n"),
  );

// ── Instagram ──
// Paste reel/post links from https://www.instagram.com/bindra_dental_care_centre/ below
// (open a reel → ⋯ → "Copy link"). They're shown via Instagram's official embed — nothing is re-hosted.
export const instagram = {
  handle: "bindra_dental_care_centre",
  url: "https://www.instagram.com/bindra_dental_care_centre/",
  reels: [
    // "https://www.instagram.com/reel/XXXXXXXXXXX/",
  ] as string[],
};

/** Turns any reel/post URL into its embed URL; returns null for anything that isn't an Instagram post. */
export const instagramEmbed = (url: string) => {
  const m = url.match(/instagram\.com\/(?:[\w.]+\/)?(reel|reels|p|tv)\/([A-Za-z0-9_-]+)/);
  if (!m) return null;
  const kind = m[1] === "reels" ? "reel" : m[1];
  return `https://www.instagram.com/${kind}/${m[2]}/embed/`;
};
