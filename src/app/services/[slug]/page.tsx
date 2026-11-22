import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { getService, images, services } from "@/lib/site";
import ServiceDetail from "@/components/ServiceDetail";

// Cosmetology has its own top-level page at /cosmetology.
export function generateStaticParams() {
  return services.filter((s) => s.slug !== "facial-aesthetics").map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  return {
    title: `${s.name} in Ambala Cantt`,
    description: `${s.tagline} ${s.intro.slice(0, 110)}…`,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { images: [images[s.image].src] },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === "facial-aesthetics") permanentRedirect("/cosmetology");
  const s = getService(slug);
  if (!s) notFound();
  return <ServiceDetail s={s} />;
}
