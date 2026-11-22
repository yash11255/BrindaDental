"use client";

import { useRef, useState, type FormEvent } from "react";
import { bookingWhatsappLink } from "@/lib/site";

const reasons = [
  { v: "Check-up & cleaning", hint: "Nothing hurts" },
  { v: "Pain or urgent problem", hint: "Same-day if possible" },
  { v: "Smile / cosmetic", hint: "Whitening, smile design" },
  { v: "Missing tooth / implant", hint: "Consultation" },
  { v: "Root canal", hint: "Sensitivity, deep decay" },
  { v: "Facial aesthetics", hint: "With Dr. Sukhmani" },
];
const windows = [
  { v: "Morning", t: "9 – 12" },
  { v: "Midday", t: "12 – 2" },
  { v: "Afternoon", t: "2 – 5" },
];
const steps = ["Reason", "Timing", "Your details"];

/** Three-step request that ends in WhatsApp: on submit we compose the message and open wa.me
 *  so the clinic receives it in the chat they already use. Nothing is stored on our side. */
export default function EnquiryForm({ defaultService = "", showDate = false }: { defaultService?: string; showDate?: boolean }) {
  const first = defaultService.split(" ")[0]?.toLowerCase();
  const matched = reasons.find((r) => first && r.v.toLowerCase().includes(first));
  const [step, setStep] = useState(defaultService ? 1 : 0);
  const [reason, setReason] = useState(matched?.v ?? defaultService);
  const [win, setWin] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState<string | null>(null);
  const panel = useRef<HTMLDivElement>(null);

  const go = (n: number) => {
    if (n > 0 && !reason) return setErrors({ reason: "Choose the closest option — you can explain more later." });
    setErrors({});
    setStep(n);
    requestAnimationFrame(() => panel.current?.querySelector<HTMLElement>("[data-step-focus]")?.focus());
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim();
    const phone = String(f.get("phone") ?? "").trim();
    const errs: Record<string, string> = {};
    if (name.length < 2) errs.name = "Please enter your name";
    if (!/^[+\d][\d\s-]{8,15}$/.test(phone)) errs.phone = "Please enter a valid mobile number";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const url = bookingWhatsappLink({
      name, phone, reason,
      date: String(f.get("date") ?? ""),
      window: win,
      message: String(f.get("message") ?? "").trim(),
    });
    setSent(url);
    window.open(url, "_blank", "noopener");
  };

  if (sent) {
    return (
      <div role="status" className="rounded-2xl border border-forest/25 bg-forest-tint p-6">
        <p className="font-serif text-2xl text-ink">Almost done — send it on WhatsApp.</p>
        <p className="mt-2 leading-relaxed">We&apos;ve opened WhatsApp with your request filled in. Just press send, and we&apos;ll reply to confirm a time.</p>
        <a href={sent} target="_blank" rel="noopener" className="btn mt-5 bg-[#1f7a4d] text-white hover:bg-[#186540]">Open WhatsApp again</a>
      </div>
    );
  }

  const field =
    "mt-2 block w-full rounded-xl border border-line bg-white px-4 py-3 text-base text-ink outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-muted/70 focus:border-forest focus:shadow-[0_0_0_4px_var(--color-forest-tint)] aria-[invalid=true]:border-clay";
  const err = (k: string) => (errors[k] ? <p id={`${k}-err`} className="mt-1.5 text-sm text-clay-deep">{errors[k]}</p> : null);
  const chip =
    "flex min-h-14 cursor-pointer flex-col justify-center rounded-xl border border-line bg-white px-4 py-3 transition-colors hover:border-ink/40 has-[:checked]:border-ink has-[:checked]:bg-ink has-[:checked]:text-paper has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-forest";

  return (
    <form onSubmit={onSubmit} noValidate>
      <ol className="mb-8 grid grid-cols-3 gap-2" aria-label="Booking steps">
        {steps.map((s, i) => (
          <li key={s} aria-current={i === step ? "step" : undefined}>
            <span className={`block h-[3px] rounded-full transition-colors duration-300 ${i <= step ? "bg-forest" : "bg-line"}`} />
            <span className={`mt-2 block text-xs ${i === step ? "text-ink" : "text-muted"}`}>{i + 1}. {s}</span>
          </li>
        ))}
      </ol>

      <div ref={panel}>
        <fieldset hidden={step !== 0}>
          <legend data-step-focus tabIndex={-1} className="text-[17px] text-ink outline-none">What&apos;s the visit for?</legend>
          <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {reasons.map((r) => (
              <label key={r.v} className={chip}>
                <input type="radio" name="reason" value={r.v} checked={reason === r.v} onChange={() => setReason(r.v)} className="sr-only" />
                <span className="text-[15px] font-medium">{r.v}</span>
                <span className="text-xs opacity-70">{r.hint}</span>
              </label>
            ))}
          </div>
          {errors.reason && <p className="mt-3 text-sm text-clay-deep" role="alert">{errors.reason}</p>}
          <div className="mt-8 flex justify-end">
            <button type="button" onClick={() => go(1)} className="btn-primary">Continue</button>
          </div>
        </fieldset>

        <fieldset hidden={step !== 1}>
          <legend data-step-focus tabIndex={-1} className="text-[17px] text-ink outline-none">When suits you?</legend>
          {reason === "Pain or urgent problem" && (
            <p className="mt-3 rounded-xl bg-clay/10 px-4 py-3 text-sm text-clay-deep">If you&apos;re in pain now, calling is faster than this form.</p>
          )}
          {showDate && (
            <label className="mt-4 block text-sm text-ink-soft">Preferred day <span className="text-muted">(optional)</span>
              <input name="date" type="date" className={field} min={new Date().toISOString().slice(0, 10)} />
            </label>
          )}
          <p className="mt-6 text-sm text-ink-soft">Time of day</p>
          <div className="mt-2 grid grid-cols-3 gap-2.5">
            {windows.map((w) => (
              <label key={w.v} className={`${chip} items-center text-center`}>
                <input type="radio" name="window" value={w.v} checked={win === w.v} onChange={() => setWin(w.v)} className="sr-only" />
                <span className="text-[15px] font-medium">{w.v}</span>
                <span className="num text-xs opacity-70">{w.t}</span>
              </label>
            ))}
          </div>
          <div className="mt-8 flex items-center justify-between">
            <button type="button" onClick={() => go(0)} className="text-[15px] text-muted hover:text-ink">← Back</button>
            <button type="button" onClick={() => go(2)} className="btn-primary">Continue</button>
          </div>
        </fieldset>

        <fieldset hidden={step !== 2} className="space-y-5">
          <legend data-step-focus tabIndex={-1} className="mb-1 text-[17px] text-ink outline-none">How do we reach you?</legend>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm text-ink-soft">Full name
              <input name="name" autoComplete="name" className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined} />
              {err("name")}
            </label>
            <label className="block text-sm text-ink-soft">Mobile number
              <input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="98xxx xxxxx" className={`${field} num`} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-err" : undefined} />
              {err("phone")}
            </label>
          </div>
          <label className="block text-sm text-ink-soft">Anything we should know? <span className="text-muted">(optional)</span>
            <textarea name="message" rows={3} className={field} placeholder="e.g. lower left tooth sensitive to cold for a week; quite nervous about injections" />
          </label>
          <div className="flex flex-col-reverse items-stretch justify-between gap-4 pt-2 sm:flex-row sm:items-center">
            <button type="button" onClick={() => go(1)} className="text-[15px] text-muted hover:text-ink">← Back</button>
            <button type="submit" className="btn bg-[#1f7a4d] text-white hover:bg-[#186540]">
              <WhatsAppIcon /> Send on WhatsApp
            </button>
          </div>
          <p className="text-xs leading-relaxed text-muted">This opens WhatsApp with your request ready to send. Please don&apos;t share X-rays or medical records in chat.</p>
        </fieldset>
      </div>
    </form>
  );
}

export function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3a.4.4 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.3.8 3.2.7a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.5-.3Z" />
    </svg>
  );
}
