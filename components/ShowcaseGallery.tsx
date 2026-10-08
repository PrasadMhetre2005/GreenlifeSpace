"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getJSON } from "@/lib/api";
import type { Project } from "@/lib/data";
import glassDecorationView from "../photos/glass decoration veiw.jpg";

type ShowcaseRecord = {
  id: string;
  clientName: string;
  location: string;
  duration: string;
  summary: string;
  visualTone: Project["tone"];
  services: string[];
};

function formatService(slug: string) {
  return slug.split("-").map((word) => word[0].toUpperCase() + word.slice(1)).join(" ");
}

export default function ShowcaseGallery() {
  const [items, setItems] = useState<Project[]>([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getJSON<ShowcaseRecord[]>("/api/showcase")
      .then((records) => setItems(records.map((record) => ({
        client: record.clientName,
        location: record.location,
        duration: record.duration,
        summary: record.summary,
        servicesPerformed: record.services.map(formatService),
        tone: record.visualTone,
      }))))
      .catch(() => setError("The showcase could not be loaded. Please try again later."))
      .finally(() => setLoading(false));
  }, []);

  const filters = ["All", ...Array.from(new Set(items.flatMap((item) => item.servicesPerformed)))];
  const visible = filter === "All" ? items : items.filter((item) => item.servicesPerformed.includes(filter));

  return (
    <>
      <div className="mt-8 flex flex-wrap gap-2">
        {filters.map((item) => (
          <button key={item} type="button" onClick={() => setFilter(item)} className={`border px-3 py-2 text-xs transition-colors ${filter === item ? "border-moss bg-moss text-greige" : "border-moss/20 text-ink/70 hover:border-moss"}`}>
            {item}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-12 sm:grid-cols-3">
        {loading && <p className="text-sm text-ink/60">Loading projects...</p>}
        {!loading && error && <p role="alert" className="text-sm text-red-700">{error}</p>}
        {!loading && !error && visible.length === 0 && <p className="text-sm text-ink/60">No published projects yet.</p>}
        {visible.map((project) => (
          <article key={`${project.client}-${project.location}`}>
            <div className="overflow-hidden rounded-2xl border border-moss/10 bg-sage/10">
              <Image
                src={project.image ?? glassDecorationView}
                alt={`${project.client} project in ${project.location}`}
                className="aspect-[4/5] h-full w-full object-cover"
              />
            </div>
            <h3 className="mt-4 font-serif text-xl text-ink">{project.client}</h3>
            <p className="mt-1 text-sm text-ink/60">{project.location} — {project.duration}</p>
            <p className="mt-3 text-sm leading-relaxed text-ink/70">{project.summary}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.servicesPerformed.map((service) => <li key={service} className="bg-sage px-2.5 py-1 text-xs text-moss-dark">{service}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </>
  );
}