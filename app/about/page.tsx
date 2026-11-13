import type { Metadata } from "next";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import { StatBlock } from "@/components/Testimonial";
import { projects, stats } from "@/lib/data";

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

      <section aria-labelledby="about-work-title" className="container-page mt-20 lg:mt-24">
        <div className="flex flex-wrap items-end justify-between gap-5 border-t border-moss/15 pt-10">
          <div>
            <p className="specimen-tag">Our work</p>
            <h2 id="about-work-title" className="mt-3 font-serif text-3xl text-ink sm:text-4xl">
              A few spaces we care for
            </h2>
          </div>
          <a
            href="/our-work"
            className="inline-flex w-fit items-center gap-3 border-b border-moss pb-2 text-sm text-moss transition-colors hover:text-moss-dark"
          >
            Explore all projects <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <a
              key={`${project.client}-${project.location}`}
              href="/our-work"
              className="group overflow-hidden rounded-xl border border-moss/15 bg-white/45 transition-transform duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-moss"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-sage/30">
                {project.image && (
                  <Image
                    src={project.image}
                    alt={`${project.client} greenery project in ${project.location}`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                )}
              </div>
              <div className="p-4">
                <p className="text-[10px] uppercase tracking-[0.16em] text-moss">
                  {project.location}
                </p>
                <h3 className="mt-2 font-serif text-xl text-ink">{project.client}</h3>
                <p className="mt-1 text-xs text-ink/55">{project.duration}</p>
                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink/70">
                  {project.summary}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

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
