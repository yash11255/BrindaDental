"use client";

import { useState } from "react";
import { services } from "@/lib/site";
import { ServiceCard } from "@/components/ui";

const filters = ["All", "Implants", "Cosmetic", "General", "Aesthetics"] as const;

export default function ServiceFilter() {
  const [f, setF] = useState<(typeof filters)[number]>("All");
  const list = f === "All" ? services : services.filter((s) => s.category === f);
  return (
    <>
      <div className="flex flex-wrap gap-2">
        {filters.map((x) => (
          <button key={x} onClick={() => setF(x)}
            className={`min-h-10 rounded-full px-4 text-sm font-semibold transition ${f === x ? "bg-teal text-white" : "border border-line text-gray-700 hover:border-teal"}`}>
            {x}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((s) => <ServiceCard key={s.slug} s={s} />)}
      </div>
    </>
  );
}
