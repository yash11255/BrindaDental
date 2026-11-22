"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Adds a fade-up on scroll to any element marked data-reveal / data-reveal-stagger.
 *  Content stays visible without JS or with reduced motion (the .js-reveal gate is never added). */
export default function Reveal() {
  const pathname = usePathname();
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.documentElement.classList.add("js-reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    document.querySelectorAll("[data-reveal],[data-reveal-stagger]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
  return null;
}
