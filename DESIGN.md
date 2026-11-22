# Bindra Dental — Design System & Layout Blueprint

Written for the designers and frontend engineers working on this codebase. Everything here describes what's built in `src/`. Where the code and this document disagree, the code is correct.

## 1. Direction

**Tone:** quiet confidence and editorial warmth. It should feel like a small practice that takes its time, not a hospital and not a SaaS landing page.

**What we avoid, and what we do instead**

| Avoid | Instead |
|---|---|
| Tech gradients, glass blobs | Warm stone surfaces, one restrained accent |
| 3-up icon cards | A mosaic for services, tabs grouped by patient need, editorial lists |
| "99% happy patients" strips | One real fact at a time: rating, opening hours, same-day pain slots |
| Tooth icons, sterile blue | Real photographs, serif display type |
| Identical padding everywhere | Alternating colour bands, staggered columns, uneven image heights |

### Colour tokens (`src/app/globals.css`, `@theme`)

| Token | Hex | Role |
|---|---|---|
| `paper` | `#FBFAF7` | Page canvas |
| `stone` | `#F3EFE8` | Alternate band surface |
| `sand` | `#E8E1D5` | Image frames |
| `line` | `#E2DCD1` | Hairlines |
| `ink` | `#1C2321` | Headings, dark bands (reviews, footer) |
| `ink-soft` | `#3B4440` | Body text |
| `muted` | `#6B706A` | Meta text (5.0:1 contrast on paper) |
| `forest` | `#2C4A42` | Links, focus rings, ribbon band, monograms |
| `forest-tint` | `#E4EBE7` | Comfort band, success states |
| `clay` | `#B4513B` | **Primary CTA only**, plus small accents (italic *time*, ✦, step numbers) |
| WhatsApp green | `#1F7A4D` | Buttons that send to WhatsApp |

Clay is a softened version of the clinic's red signage. Use it sparingly: if more than one clay button is visible at once, one of them is wrong.

### Type
- **Display:** Fraunces, weight 400, tracking −0.02em. Used for h1/h2, pull quotes, fears in the Comfort section and ribbon items.
- **UI and body:** Inter at 15–18px, line-height 1.6, measure 42–62ch.
- **Numbers:** `.num` (tabular-nums) for times, durations, prices and phone numbers.
- **Scale:** 76 / 56 / 40 / 28 / 17 / 15 / 12 px.

### Rhythm
- **Container:** 1240px, gutters 20px (mobile) / 32px (desktop).
- **Section padding:** `py-12 md:py-16`.
- **Band order:** colour bands alternate down the page: paper → forest ribbon → paper → stone → forest-tint → ink → paper → stone → paper.
- **Grid:** every split uses the 12-column grid with asymmetric ratios: 7:5, 5:7, 4:8, and 5·4·3 for the gallery strip.

## 2. Homepage blueprint (`src/app/page.tsx`)

```
┌ Header (sticky) ─ Bindra · 5 links · phone · [Book a visit] ───────────┐
├ HERO  stone→paper   7 : 5 ──────────────────────────────────────────────┤
│ eyebrow                              │ ┌ photo 5:6, ken-burns ┐        │
│ Dentistry that takes its *time*…     │ │                      │        │
│ reassurance (46ch)                   │ └──────────────────────┘        │
│ [Book a visit]  First-visit link     │ └ "Open today" card (offset) ┘  │
│ ★ 4.8 · 264  •(pulse) same-day slots │                                 │
├ RIBBON  forest, marquee 40s, pauses on hover ─────────────────────────────┤
├ SERVICES MOSAIC  7 : 5 ──────────────────────────────────────────────────┤
│ ┌ Implants (2 rows, overlay text) ┐  ┌ Smile ┐ ┌ Root canal ┐          │
│ │                                 │  └───────┘ └────────────┘          │
│ └─────────────────────────────────┘  ┌ Whiten┐ ┌ Facial     ┐          │
├ CARE BY NEED  stone   4 : 8 tabs ────────────────────────────────────────┤
│ 01 Routine    │ lede                                                    │
│ 02 Smile      │ name · note          chair time | visits | cost         │
│ 03 Restore    │ …                                                       │
├ COMFORT  forest-tint  5 (sticky) : 7 ────────────────────────────────────┤
│ heading + photo │ 01 "Will it hurt?" → concrete answer   (×4)           │
├ REVIEWS  ink   7 : 4 ────────────────────────────────────────────────────┤
│ big serif pull quote          │ 3 short quotes                          │
├ TEAM  paper  5 · gap · 5 (second card drops 40px) ───────────────────────┤
├ GALLERY STRIP  5 · 4 · 3 with uneven heights ─────────────────────────────┤
├ FIRST VISIT  stone  5 : 6 ───────────────────────────────────────────────┤
│ timeline 0–45 min         │ FAQ accordion                               │
├ VISIT & BOOK  paper  5 : 7 ──────────────────────────────────────────────┤
│ address · hours · map     │ ┌ 3-step form → WhatsApp ┐                  │
├ Footer: urgent line ▸ 5·3·2·2 columns ▸ legal + image credits ─────────┤
└ Mobile: sticky [Book] [Call] [WA] bar · floating "Ask us" assistant ───┘
```

## 3. Architecture

```
src/
  app/                         routes (Server Components by default)
    page.tsx                   homepage, composed from sections
    services/[slug]/page.tsx   statically generated treatment pages
    about, dentists, gallery, testimonials, faqs, contact, book-appointment, image-credits
    sitemap.ts, robots.ts
  components/
    sections/                  homepage bands
      Hero, Marquee, ServicesShowcase, Comfort, Reviews, Team,
      GalleryStrip, FirstVisit, VisitAndBook              (server)
      CareByIntent                                        (client: tabs)
    Header                     client: drawer, Esc to close, scroll lock
    EnquiryForm                client: steps, validation, opens wa.me
    ChatAssistant              client: rule-based answers from site data
    Reveal                     client: IntersectionObserver for scroll reveals
    MobileBookBar, Footer, ui.tsx                       (server)
  lib/site.ts                  all content: clinic details, services, care groups, comfort answers, images, credits
```

**Bookings:** there is no backend. `EnquiryForm` builds a WhatsApp message with `bookingWhatsappLink()` and opens `wa.me/<number>`. The chat assistant sends every unanswered question to WhatsApp as well.

## 4. Motion & states
- **Easing:** `--ease-calm: cubic-bezier(.2,.7,.2,1)`. Nothing bounces.
- **Hero:** text rises in with a stagger (80ms steps), and the photo settles from 108% to 100% scale over 1.6s.
- **Scroll reveal:** add `data-reveal` (fade up 18px) or `data-reveal-stagger` (children follow in 80ms steps). Each element animates once.
- **Ribbon:** 40s linear loop that pauses on hover. Duplicated items are hidden from screen readers and skipped by keyboard focus.
- **Hover:** `.lift` raises cards 4px and adds a soft shadow. Images scale to 1.02.
- **Focus:** 2px forest outline, 3px offset, everywhere.
- **Accordion:** height animates through `::details-content` where the browser supports it, and opens instantly elsewhere.
- **Forms:** focus shows a forest border plus a 4px tint ring. Errors show a clay border and a message linked to the field.
- **Reduced motion:** all of the above is switched off. Content stays visible because the reveal styles only apply once JavaScript runs and the user hasn't asked for reduced motion.

## 5. Before launch
- Phone and WhatsApp numbers, hours and domain go in `src/lib/site.ts`.
- Replace the testimonials with real Google review excerpts (with permission). The current ones are samples.
- Add the clinic's own photos to `/public/images`, update `images` in `site.ts` and remove the matching entries from `imageCredits`.
- Add dentist photos. Until then, the `Monogram` component shows initials.
- Prices are null and show "Quoted after exam". Add clinic-approved figures to `careGroups`.
- Confirm every item marked `[confirm]`.
