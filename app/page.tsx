"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getJSON } from "@/lib/api";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import { Testimonial, StatBlock } from "@/components/Testimonial";
import { services, testimonials, stats } from "@/lib/data";
import glassDecorationView from "../photos/glass decoration veiw.jpg";
import plantCareGirl from "../photos/plant care girl.jpeg";
import { useLanguage } from "@/components/LanguageProvider";

type ShowcasePreview = {
  id: string;
  clientName: string;
  location: string;
  duration: string;
};

export default function Home() {
  const { dictionary } = useLanguage();
  const [projects, setProjects] = useState<ShowcasePreview[]>([]);

  useEffect(() => {
    getJSON<ShowcasePreview[]>("/api/showcase").then(setProjects).catch(() => setProjects([]));
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="soft-grid relative isolate overflow-hidden pb-16 pt-14 sm:pt-20 lg:pb-24 lg:pt-24">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[#dce5d3]" aria-hidden="true">
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-100 saturate-[1.15] contrast-[1.08]"
            src="/plant-care-video.mp4"
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(244,242,231,0.5)_0%,rgba(244,242,231,0.25)_43%,rgba(20,49,36,0.12)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,47,34,0.02),rgba(18,47,34,0.1))]" />
        </div>

        <div className="container-page relative z-10 grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="fade-up flex min-w-0 w-full flex-col justify-center rounded-[1.75rem] border border-white/90 bg-[#f4f2e7]/98 p-6 shadow-[0_20px_60px_rgba(44,74,59,0.16)] backdrop-blur-md sm:p-8 lg:col-span-7 lg:bg-[#f4f2e7]/96 lg:p-10">
          <p className="specimen-tag">{dictionary.heroTag}</p>
          <h1 className="mt-5 max-w-xl break-words font-serif text-[3.15rem] font-semibold leading-[0.88] tracking-[-0.06em] text-ink sm:text-[4.25rem] lg:text-[5.2rem]">
            {dictionary.heroTitle}
          </h1>
          <p className="mt-6 max-w-[48ch] text-[17px] leading-[1.7] text-ink/72 sm:text-[18px]">
            {dictionary.heroDescription}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/request-service"
              className="rounded-[10px] bg-moss px-6 py-3.5 text-[15px] font-medium text-greige shadow-[0_16px_32px_rgba(44,74,59,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-moss-dark"
            >
              {dictionary.requestService}
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-[15px] font-medium text-ink underline decoration-ochre decoration-[3px] underline-offset-6 transition-colors hover:text-moss-dark"
            >
              {dictionary.seeWhatWeDo}
            </Link>
          </div>

          <div className="mt-9 flex flex-wrap gap-2 text-xs text-ink/60">
            <span className="border border-moss/20 bg-white/60 px-3 py-1.5 backdrop-blur-sm">{dictionary.homes}</span>
            <span className="border border-moss/20 bg-white/60 px-3 py-1.5 backdrop-blur-sm">{dictionary.offices}</span>
            <span className="border border-moss/20 bg-white/60 px-3 py-1.5 backdrop-blur-sm">{dictionary.hotelsEvents}</span>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-6 border-t border-moss/15 pt-8">
            {stats.map((s) => (
              <StatBlock key={s.label} value={s.value} label={s.label} />
            ))}
          </div>
        </div>

        <div className="fade-up relative min-w-0 w-full lg:col-span-5" style={{ animationDelay: "120ms" }}>
          <div className="relative w-full overflow-hidden rounded-[2rem] border border-[#d9efb5]/45 bg-[#173b2b] shadow-[0_34px_80px_rgba(20,52,36,0.34)] ring-1 ring-[#b9d989]/35">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,44,30,0.02),rgba(13,44,30,0.08),rgba(8,30,21,0.62))]" />
            <Image
              src={plantCareGirl}
              alt="Plant care specialist tending indoor plants"
              className="aspect-[4/5] w-full object-cover object-[center_35%] opacity-100 saturate-[1.22] contrast-[1.06]"
            />

            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_42%,rgba(8,30,21,0.12)_58%,rgba(8,30,21,0.76)_100%)]" />

            <div className="absolute left-5 top-5 z-10 rounded-full border border-[#d9efb5]/50 bg-[#193f2c]/75 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#e8f7c9] backdrop-blur-sm">
              Indoor styling
            </div>

            <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
              <div className="rounded-[1.2rem] border border-[#e8f7c9]/35 bg-[#163526]/88 p-4 shadow-[0_18px_38px_rgba(7,20,16,0.34)] backdrop-blur-md">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#cfe9a3]">{dictionary.officeReception}</p>
                <p className="mt-2 max-w-sm font-serif text-xl italic leading-tight text-[#fff8e6] sm:text-2xl">
                  {dictionary.heroCaption}
                </p>
              </div>
            </div>
          </div>
          <PhotoPlaceholder
            label="leaf detail"
            tone="ochre"
            clip="clip-leaf-alt"
            className="absolute -bottom-8 -left-8 hidden aspect-square w-40 sm:block"
          />
        </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="bg-sage/40 py-16 lg:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow={dictionary.whatWeDo}
            title={dictionary.sixWays}
            intro={dictionary.servicesIntro}
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
              eyebrow={dictionary.recentWork}
              title={dictionary.spacesCare}
            />
            <Link
              href="/our-work"
              className="text-sm text-moss underline decoration-ochre decoration-2 underline-offset-4"
            >
              {dictionary.viewAllWork}
            </Link>
          </div>
          <div className="mt-10 grid gap-10 sm:grid-cols-3">
            {projects.map((p) => (
              <div key={p.id}>
                <div className="overflow-hidden rounded-2xl border border-moss/10 bg-sage/10">
                  <Image
                    src={glassDecorationView}
                    alt={`${p.clientName} project in ${p.location}`}
                    className="aspect-[3/4] h-full w-full object-cover"
                  />
                </div>
                <p className="mt-4 font-serif text-lg text-ink">{p.clientName}</p>
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
            eyebrow={dictionary.customersSay}
            title={dictionary.trusted}
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
              {dictionary.ready}
            </h2>
            <p className="mt-2 text-ink/70">
              {dictionary.readyDescription}
            </p>
          </div>
          <Link
            href="/request-service"
            className="whitespace-nowrap rounded-sm bg-moss px-6 py-3 text-[15px] text-greige transition-colors hover:bg-moss-dark"
          >
            {dictionary.requestService}
          </Link>
        </div>
      </section>
    </>
  );
}
