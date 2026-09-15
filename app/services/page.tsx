import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { services } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services | Greenlife Spaces",
  description: "Plant styling, maintenance, polishing and event greenery.",
};

export default function ServicesPage() {
  return (
    <div className="container-page py-16 lg:py-24">
      <SectionHeading
        eyebrow="Services"
        title="Every way we work with plants"
        intro="Each visit is booked the same simple way — pick a service, share your address and a preferred time, and we confirm the rest."
      />

      <div className="mt-14 grid gap-5">
        {services.map((service, i) => (
          <div
            key={service.slug}
            className="grid gap-5 rounded-[24px] border border-moss/10 bg-[#f5f1e8] p-6 shadow-[0_14px_32px_rgba(28,47,38,0.04)] sm:grid-cols-12 sm:items-center"
          >
            <div className="flex items-center gap-3 sm:col-span-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-ochre/15 text-sm text-moss-dark">✦</span>
              <p className="specimen-tag">
                {String(i + 1).padStart(2, "0")} — {service.startingPrice}
              </p>
            </div>
            <div className="sm:col-span-6">
              <h2 className="font-serif text-2xl text-ink sm:text-3xl">
                {service.name}
              </h2>
              <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-ink/70">
                {service.description}
              </p>
            </div>
            <div className="sm:col-span-3 sm:justify-self-end">
              <Link
                href={`/request-service?service=${service.slug}`}
                className="inline-flex items-center gap-2 rounded-sm border border-moss px-5 py-2.5 text-sm font-medium text-moss-dark transition-colors hover:bg-moss hover:text-greige"
              >
                <span>•</span>
                Book this service
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
