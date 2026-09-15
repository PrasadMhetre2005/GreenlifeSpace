import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { serviceAreas } from "@/lib/data";

export const metadata: Metadata = {
  title: "Service Areas | Greenlife Spaces",
  description: "Localities we currently serve in Pune and Mumbai.",
};

export default function ServiceAreasPage() {
  return (
    <div className="container-page py-16 lg:py-24">
      <SectionHeading
        eyebrow="Service areas"
        title="Where we currently visit"
        intro="Don't see your locality listed? Send an inquiry — we're adding areas as the team grows."
      />

      <div className="mt-14 grid gap-14 sm:grid-cols-2">
        {serviceAreas.map((area) => (
          <div key={area.city}>
            <h2 className="font-serif text-2xl text-ink">{area.city}</h2>
            <ul className="mt-4 space-y-2 border-t border-moss/15 pt-4">
              {area.localities.map((l) => (
                <li
                  key={l}
                  className="flex items-center justify-between text-[15px] text-ink/70"
                >
                  {l}
                  <span className="text-xs text-moss">Serviced</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-16 border-t border-moss/15 pt-10">
        <p className="text-ink/70">
          Outside these areas but interested?{" "}
          <Link
            href="/contact"
            className="text-moss underline decoration-ochre decoration-2 underline-offset-4"
          >
            Send us an inquiry
          </Link>{" "}
          and we&apos;ll let you know when we expand there.
        </p>
      </div>
    </div>
  );
}
