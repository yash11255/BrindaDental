"use client";

import { useState, type FormEvent } from "react";
import { bookingWhatsappLink, services } from "@/lib/site";
import { WhatsAppIcon } from "@/components/EnquiryForm";

/** Compact booking card (name · mobile · treatment) → opens WhatsApp with the request filled in. */
export default function QuickBook({ title = "Book an Appointment", dark = false }: { title?: string; dark?: boolean }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim();
    const phone = String(f.get("phone") ?? "").trim();
    const reason = String(f.get("reason") ?? "");
    const errs: Record<string, string> = {};
    if (name.length < 2) errs.name = "Enter your name";
    if (!/^[+\d][\d\s-]{8,15}$/.test(phone)) errs.phone = "Enter a valid mobile number";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    window.open(bookingWhatsappLink({ name, phone, reason: reason || "General consultation" }), "_blank", "noopener");
    setSent(true);
  };

  const field = "block w-full rounded-xl border border-line bg-white px-4 py-3.5 text-[15px] text-ink outline-none transition focus:border-forest focus:ring-4 focus:ring-forest-tint aria-[invalid=true]:border-clay";

  return (
    <div className={`rounded-2xl p-6 sm:p-7 ${dark ? "bg-white/[0.06] ring-1 ring-white/15" : "bg-white shadow-[0_30px_70px_-30px_rgba(22,34,46,0.45)] ring-1 ring-line"}`}>
      <p className={`font-serif text-xl font-bold ${dark ? "text-white" : "text-ink"}`}>{title}</p>
      <p className={`mt-1 text-sm ${dark ? "text-white/65" : "text-muted"}`}>Takes 20 seconds · we reply on WhatsApp to confirm</p>
      {sent ? (
        <div role="status" className="mt-5 rounded-xl bg-forest-tint p-4 text-[15px] text-forest">
          WhatsApp has opened with your details — just press <b>send</b> and we&apos;ll confirm your slot.
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="mt-5 space-y-3">
          <div>
            <label htmlFor="qb-name" className="sr-only">Your name</label>
            <input id="qb-name" name="name" placeholder="Your name" autoComplete="name" className={field} aria-invalid={!!errors.name} />
            {errors.name && <p className="mt-1 text-xs text-clay">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="qb-phone" className="sr-only">Mobile number</label>
            <div className="flex">
              <span className="grid place-items-center rounded-l-xl border border-r-0 border-line bg-stone px-3 text-[15px] text-muted">+91</span>
              <input id="qb-phone" name="phone" type="tel" inputMode="tel" placeholder="Mobile number" autoComplete="tel" className={`${field} num rounded-l-none`} aria-invalid={!!errors.phone} />
            </div>
            {errors.phone && <p className="mt-1 text-xs text-clay">{errors.phone}</p>}
          </div>
          <div>
            <label htmlFor="qb-reason" className="sr-only">Treatment</label>
            <select id="qb-reason" name="reason" defaultValue="" className={`${field} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2366727c%22 stroke-width=%222.4%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10`}>
              <option value="">Select treatment (optional)</option>
              {services.map((s) => <option key={s.slug} value={s.name}>{s.name}</option>)}
            </select>
          </div>
          <button type="submit" className="btn w-full !rounded-xl bg-clay text-white shadow-[0_10px_24px_-10px_rgba(198,71,58,0.7)] hover:bg-clay-deep">
            <WhatsAppIcon /> Book on WhatsApp
          </button>
          <p className={`text-center text-[12px] ${dark ? "text-white/50" : "text-muted"}`}>We&apos;ll only use your number to arrange your visit.</p>
        </form>
      )}
    </div>
  );
}
