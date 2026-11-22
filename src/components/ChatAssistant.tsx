"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { careGroups, fullAddress, mapsLink, serviceHref, services, site, whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "@/components/EnquiryForm";

type Msg = { from: "bot" | "me"; text: string; links?: { label: string; href: string; external?: boolean }[] };

const quick = ["Book an appointment", "Treatments", "Timings", "Location", "Cost", "Tooth pain"];

/** Rule-based helper: answers from site data, no external AI or storage. Anything it can't answer goes to WhatsApp. */
function reply(input: string): Msg {
  const q = input.toLowerCase();
  const has = (...w: string[]) => w.some((x) => q.includes(x));

  const keywords: Record<string, string[]> = {
    "dental-implants": ["implant", "missing tooth", "missing teeth"],
    "smile-designing": ["smile design", "smile makeover", "veneer"],
    "root-canal-treatment": ["root canal", "rct"],
    "teeth-whitening": ["whiten", "yellow teeth", "stain"],
    "facial-aesthetics": ["facial", "skin", "laser", "cosmetolog", "sukhmani"],
  };
  const svc = services.find((s) => has(...(keywords[s.slug] ?? [])));
  if (svc && !has("book")) {
    return {
      from: "bot",
      text: `${svc.name}: ${svc.intro.split(". ")[0]}.`,
      links: [
        { label: `Read about ${svc.name}`, href: serviceHref(svc.slug) },
        { label: "Ask on WhatsApp", href: whatsappLink(`Hello, I have a question about ${svc.name}.`), external: true },
      ],
    };
  }
  if (has("book", "appoint", "slot", "visit", "consult"))
    return {
      from: "bot",
      text: "Happy to help you book. Send us a WhatsApp message and we'll confirm a time with you — or use the 3-step form.",
      links: [
        { label: "Book on WhatsApp", href: whatsappLink("Hello, I'd like to book an appointment."), external: true },
        { label: "Use the booking form", href: "/book-appointment" },
      ],
    };
  if (has("pain", "hurt", "emergency", "urgent", "swelling", "broken", "ache"))
    return {
      from: "bot",
      text: "Sorry you're in pain. Call before noon and we'll aim to see you the same day. Calling is quickest.",
      links: [
        { label: `Call ${site.phone}`, href: site.phoneHref, external: true },
        { label: "WhatsApp us", href: whatsappLink("Hello, I have tooth pain and need an urgent appointment."), external: true },
      ],
    };
  if (has("time", "timing", "hour", "open", "close", "sunday"))
    return { from: "bot", text: `We're open ${site.hours}.` };
  if (has("where", "location", "address", "direction", "map", "reach"))
    return { from: "bot", text: fullAddress, links: [{ label: "Open in Google Maps", href: mapsLink, external: true }] };
  if (has("cost", "price", "fee", "charge", "rate", "₹", "rs"))
    return {
      from: "bot",
      text: "Costs depend on what your dentist finds, so we give you a written, itemised estimate after the exam — before any treatment starts.",
      links: [{ label: "Ask for a rough idea on WhatsApp", href: whatsappLink("Hello, could you tell me the approximate cost for "), external: true }],
    };
  if (has("treatment", "service", "offer", "do you"))
    return {
      from: "bot",
      text: careGroups.map((g) => `${g.label}: ${g.items.map((i) => i.name).join(", ")}`).join("\n"),
      links: [{ label: "See all treatments", href: "/services" }],
    };
  if (has("hi", "hello", "hey", "namaste"))
    return { from: "bot", text: "Namaste! Ask me about treatments, timings, location, or booking." };
  return {
    from: "bot",
    text: "I'm not sure about that one — our team can answer on WhatsApp.",
    links: [{ label: "Ask on WhatsApp", href: whatsappLink(`Hello, ${input}`), external: true }],
  };
}

export default function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "bot", text: `Hi! I'm the ${site.shortName} assistant. How can I help?` },
  ]);
  const [text, setText] = useState("");
  const log = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => { log.current?.scrollTo({ top: log.current.scrollHeight, behavior: "smooth" }); }, [msgs]);
  useEffect(() => {
    if (!open) return;
    input.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const send = (t: string) => {
    const v = t.trim();
    if (!v) return;
    setMsgs((m) => [...m, { from: "me", text: v }, reply(v)]);
    setText("");
  };
  const onSubmit = (e: FormEvent) => { e.preventDefault(); send(text); };

  return (
    <div className="fixed bottom-[88px] right-4 z-40 lg:bottom-6 lg:right-6">
      {open && (
        <div role="dialog" aria-label="Clinic assistant"
          className="mb-3 flex h-[min(540px,calc(100dvh-180px))] w-[min(360px,calc(100vw-32px))] flex-col overflow-hidden rounded-[22px] border border-line bg-paper shadow-[0_24px_60px_-20px_rgba(28,35,33,0.35)] motion-safe:animate-[fade_.25s_var(--ease-calm)]">
          <div className="flex items-center justify-between bg-ink px-5 py-4 text-paper">
            <div>
              <p className="font-serif text-lg leading-none">Ask Bindra Dental</p>
              <p className="mt-1 text-xs text-paper/60">Quick answers · replies on WhatsApp</p>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close assistant" className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/10">✕</button>
          </div>

          <div ref={log} aria-live="polite" className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {msgs.map((m, i) => (
              <div key={i} className={m.from === "me" ? "flex justify-end" : ""}>
                <div className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-[14.5px] leading-relaxed ${m.from === "me" ? "rounded-br-md bg-forest text-paper" : "rounded-bl-md bg-white text-ink ring-1 ring-line"}`}>
                  {m.text}
                  {m.links && (
                    <div className="mt-2.5 flex flex-col gap-1.5">
                      {m.links.map((l) =>
                        l.external ? (
                          <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noopener" className="font-medium text-forest underline underline-offset-4">{l.label} →</a>
                        ) : (
                          <Link key={l.label} href={l.href} onClick={() => setOpen(false)} className="font-medium text-forest underline underline-offset-4">{l.label} →</Link>
                        ),
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 overflow-x-auto px-4 pb-2">
            {quick.map((q) => (
              <button key={q} onClick={() => send(q)} className="shrink-0 rounded-full border border-line bg-white px-3 py-1.5 text-[13px] text-ink-soft hover:border-ink/40">{q}</button>
            ))}
          </div>
          <form onSubmit={onSubmit} className="flex gap-2 border-t border-line p-3">
            <label className="sr-only" htmlFor="chat-input">Type your question</label>
            <input id="chat-input" ref={input} value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a question…"
              className="min-h-11 flex-1 rounded-full border border-line bg-white px-4 text-[15px] outline-none focus:border-forest" />
            <button type="submit" aria-label="Send" className="grid h-11 w-11 place-items-center rounded-full bg-ink text-paper">↑</button>
          </form>
          <a href={whatsappLink()} target="_blank" rel="noopener" className="flex items-center justify-center gap-2 bg-[#1f7a4d] py-2.5 text-sm font-medium text-white">
            <WhatsAppIcon size={16} /> Chat with the clinic on WhatsApp
          </a>
        </div>
      )}

      <button onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label={open ? "Close assistant" : "Open clinic assistant"}
        className="ml-auto flex h-14 items-center gap-2 rounded-full bg-ink pl-4 pr-5 text-paper shadow-[0_12px_30px_-10px_rgba(28,35,33,0.5)] transition-transform hover:-translate-y-0.5">
        <span aria-hidden className="relative grid h-7 w-7 place-items-center rounded-full bg-paper/15">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 5h16v11H8l-4 4z" /></svg>
          <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-ink bg-[#3ccf7e]" />
        </span>
        <span className="text-[15px] font-medium">{open ? "Close" : "Ask us"}</span>
      </button>
    </div>
  );
}
