import type { MetadataRoute } from "next";
import { serviceHref, services, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/dentists", "/services", "/gallery", "/testimonials", "/faqs", "/contact", "/book-appointment", "/cosmetology", "/privacy-policy", "/terms", "/medical-disclaimer", "/cookie-policy", "/appointment-policy", "/accessibility"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, lastModified: new Date() })),
    ...services.filter((s) => s.slug !== "facial-aesthetics").map((s) => ({ url: `${site.url}${serviceHref(s.slug)}`, lastModified: new Date() })),
  ];
}
