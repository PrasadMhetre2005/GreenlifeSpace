import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import { Testimonial, StatBlock } from "@/components/Testimonial";
import { services, testimonials, stats, projects } from "@/lib/data";
import glassDecorationView from "../photos/glass decoration veiw.jpg";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="soft-grid container-page grid gap-10 pb-16 pt-14 sm:pt-20 lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-24">
        <div className="fade-up flex flex-col justify-center lg:col-span-7">
          <p className="specimen-tag">Plant care & decoration, Pune & Mumbai</p>
          <h1 className="mt-5 max-w-xl font-serif text-4xl leading-[0.96] tracking-[-0.04em] text-ink sm:text-5xl lg:text-[5rem]">
            Green spaces that <span className="italic text-moss">stay</span> green
          </h1>
          <p className="mt-6 max-w-[46ch] text-[17px] leading-relaxed text-ink/70">
            We style, water, feed and prune the plants in your home, office
            or venue — on a schedule you never have to think about. Request
            a visit in under a minute, no account required.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/request-service"
              className="rounded-sm bg-moss px-6 py-3 text-[15px] font-medium text-greige shadow-[0_18px_30px_rgba(44,74,59,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-moss-dark"
            >
              Request a service visit
            </Link>
            <Link
              href="/services"
              className="text-[15px] font-medium text-ink underline decoration-ochre decoration-2 underline-offset-4 transition-colors hover:text-moss-dark"
            >
              See what we do
            </Link>
          </div>

          <div className="mt-9 flex flex-wrap gap-2 text-xs text-ink/60">
            <span className="border border-moss/20 bg-white/55 px-3 py-1.5 backdrop-blur-sm">Homes</span>
            <span className="border border-moss/20 bg-white/55 px-3 py-1.5 backdrop-blur-sm">Offices</span>
            <span className="border border-moss/20 bg-white/55 px-3 py-1.5 backdrop-blur-sm">Hotels & events</span>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-6 border-t border-moss/15 pt-8">
            {stats.map((s) => (
              <StatBlock key={s.label} value={s.value} label={s.label} />
            ))}
          </div>
        </div>

        <div className="fade-up relative lg:col-span-5" style={{ animationDelay: "120ms" }}>
          <div className="relative overflow-hidden rounded-[2rem] border border-moss/10 bg-[#edf2e8] shadow-[0_32px_80px_rgba(27,48,38,0.16)]">
            <video
              className="aspect-[4/5] w-full object-cover"
              src="/plant-care-video.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#11231b]/90 via-[#11231b]/35 to-transparent p-5 backdrop-blur-[1px]">
              <p className="text-[10px] uppercase tracking-[0.2em] text-greige/80">Office reception</p>
              <p className="mt-2 max-w-sm font-serif text-xl text-white">
                Styled with trailing pothos &amp; fiddle-leaf fig
              </p>
            </div>
          </div>
          <PhotoPlaceholder
            label="leaf detail"
            tone="ochre"
            clip="clip-leaf-alt"
            className="absolute -bottom-8 -left-8 hidden aspect-square w-40 sm:block"
          />
        </div>
      </section>

      {/* Services preview */}
      <section className="bg-sage/40 py-16 lg:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="What we do"
            title="Six ways we keep a space green"
            intro="From a single styled corner to a full building program, every service is booked the same simple way."
          />
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Recent work */}
      <section className="py-16 lg:py-24">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Recent work"
              title="A few spaces we look after"
            />
            <Link
              href="/our-work"
              className="text-sm text-moss underline decoration-ochre decoration-2 underline-offset-4"
            >
              View all work
            </Link>
          </div>
          <div className="mt-10 grid gap-10 sm:grid-cols-3">
            {projects.map((p) => (
              <div key={p.client}>
                <div className="overflow-hidden rounded-2xl border border-moss/10 bg-sage/10">
                  <Image
                    src={p.image ?? glassDecorationView}
                    alt={`${p.client} project in ${p.location}`}
                    className="aspect-[3/4] h-full w-full object-cover"
                  />
                </div>
                <p className="mt-4 font-serif text-lg text-ink">{p.client}</p>
                <p className="text-sm text-ink/60">
                  {p.location} — {p.duration}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#1d352d] py-16 text-greige lg:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="What customers say"
            title="Trusted by homes and businesses across the city"
            light
          />
          <div className="mt-12 grid gap-12 sm:grid-cols-3">
            {testimonials.map((t) => (
              <Testimonial key={t.name} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="container-page flex flex-col items-start gap-6 border-t border-moss/15 pt-14 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-serif text-3xl text-ink sm:text-4xl">
              Ready for a healthier space?
            </h2>
            <p className="mt-2 text-ink/70">
              Tell us what you need — we&apos;ll confirm a visit, usually the same day.
            </p>
          </div>
          <Link
            href="/request-service"
            className="whitespace-nowrap rounded-sm bg-moss px-6 py-3 text-[15px] text-greige transition-colors hover:bg-moss-dark"
          >
            Request a service visit
          </Link>
        </div>
      </section>
    </>
  );
}
