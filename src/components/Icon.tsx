/** Line icons (24px grid, 1.6 stroke) used for treatments, trust points and contact details. */
const paths: Record<string, string> = {
  tooth: "M7 3c-2.2 0-4 1.8-4 4.4 0 2.4 1 4 1.6 6.3.6 2.3.8 7.3 2.8 7.3 1.6 0 1.6-4.5 2.6-6 .6-.9 1.4-.9 2 0 1 1.5 1 6 2.6 6 2 0 2.2-5 2.8-7.3.6-2.3 1.6-3.9 1.6-6.3C21 4.8 19.2 3 17 3c-1.8 0-2.8 1-5 1S8.8 3 7 3Z",
  implant: "M8 3h8l-1 4H9L8 3Zm1 4h6M9.5 10h5M10 13h4M10.5 16h3M11 19h2M12 7v14",
  sparkle: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Zm7 11 .8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14Z",
  shield: "M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6l8-3Zm-3.5 9 2.5 2.5L16 9.5",
  kid: "M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 10a7 7 0 0 1 14 0M10 7h.01M14 7h.01M10.5 9a2 2 0 0 0 3 0",
  aligner: "M4 9c0-2 1.5-3 3-3h10c1.5 0 3 1 3 3v2c0 4-3.5 7-8 7s-8-3-8-7V9Zm4 0v3m4-3v4m4-4v3",
  bolt: "M13 2 4 14h7l-1 8 9-12h-7l1-8Z",
  plus: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 5v8m-4-4h8",
  search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm9 16-4-4",
  face: "M12 3a8 8 0 0 0-8 8c0 5 3.5 10 8 10s8-5 8-10a8 8 0 0 0-8-8Zm-3 8h.01M15 11h.01M9.5 15.5a3.5 3.5 0 0 0 5 0",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2",
  clock: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 4v5l3 2",
  pin: "M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12Zm0-9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  star: "M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z",
  award: "M12 14a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm-3.5 0L7 22l5-3 5 3-1.5-8",
  wallet: "M3 7h15a3 3 0 0 1 3 3v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Zm0 0 12-3v3m2 7h.01",
  heart: "M12 20s-8-4.6-8-10.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5C20 15.4 12 20 12 20Z",
  calendar: "M4 6h16v14H4V6Zm0 4h16M8 3v4m8-4v4",
  arrow: "M5 12h14m-5-5 5 5-5 5",
  check: "M5 12.5 10 17l9-10",
};

export default function Icon({ name, size = 22, className = "" }: { name: keyof typeof paths | string; size?: number; className?: string }) {
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d={paths[name] ?? paths.tooth} />
    </svg>
  );
}

/** Icon used for each treatment slug. */
export const serviceIcon: Record<string, string> = {
  "dental-implants": "implant",
  "smile-designing": "sparkle",
  "root-canal-treatment": "shield",
  "teeth-whitening": "sparkle",
  "checkup-and-cleaning": "search",
  "kids-dentistry": "kid",
  "clear-aligners": "aligner",
  "emergency-dental-care": "bolt",
  "facial-aesthetics": "face",
};
