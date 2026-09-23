import type { Metadata } from "next";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import { StatBlock } from "@/components/Testimonial";
import { stats } from "@/lib/data";

export const metadata: Metadata = {
  title: "About | Greenlife Spaces",
  description: "Who we are and how we work.",
};

export default function AboutPage() {
  return (
    <div className="py-16 lg:py-24">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <SectionHeading
            eyebrow="About Greenlife Spaces"
            title="We started with one office lobby that kept losing its plants"
          />
          <div className="mt-6 max-w-prose space-y-4 text-[15px] leading-relaxed text-ink/70">
            <p>
              Greenlife Spaces began as a small plant-maintenance round in
              Pune, visiting a handful of offices that had given up on
              keeping greenery alive between waterings. Word of mouth grew
              the list of addresses; a proper schedule and a small team
              followed.
            </p>
            <p>
              Today we look after homes, offices, cafés and event venues
              across Pune and Mumbai, from a single desk plant to a
              full-floor styling program. The job hasn&apos;t really changed —
              we still show up, water what needs watering, and leave a
              space looking like someone cares about it.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-moss/15 pt-8">
            {stats.map((s) => (
              <StatBlock key={s.label} value={s.value} label={s.label} />
            ))}
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="overflow-hidden rounded-[2rem] border border-moss/15 bg-sage/20 shadow-[0_24px_55px_rgba(28,47,38,0.14)]">
            <Image
              src="/img1.jpg"
              alt="The Greenlife Spaces team on a maintenance visit"
              width={768}
              height={960}
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="block aspect-[4/5] w-full object-cover saturate-[1.12] contrast-[1.04]"
            />
          </div>
        </div>
      </div>

      <div className="container-page mt-24 border-t border-moss/15 pt-14">
        <SectionHeading eyebrow="How we work" title="A few things we hold to" />
        <div className="mt-10 grid gap-10 sm:grid-cols-3">
          <div>
            <p className="specimen-tag">Reliability</p>
            <p className="mt-3 text-[15px] leading-relaxed text-ink/70">
              Every request moves through a clear status, from submitted to
              completed, so nothing is forgotten between visits.
            </p>
          </div>
          <div>
            <p className="specimen-tag">Straight talk</p>
            <p className="mt-3 text-[15px] leading-relaxed text-ink/70">
              If a plant isn&apos;t right for a spot, we say so before selling it
              to you — a healthy plant in the right place beats a doomed one.
            </p>
          </div>
          <div>
            <p className="specimen-tag">Low friction</p>
            <p className="mt-3 text-[15px] leading-relaxed text-ink/70">
              No accounts or apps to manage bookings. A short form and a
              confirmation is all it takes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
