"use client";

import Image from "next/image";
import { useState } from "react";
import balconyAfter from "../photos/balcony view.jpeg";
import balconyBefore from "../photos/balcony view before.jpeg";

export default function BeforeAfterComparison() {
  const [reveal, setReveal] = useState(50);

  return (
    <section aria-labelledby="balcony-comparison-title" className="mt-12">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="specimen-tag">Balcony refresh</p>
          <h2 id="balcony-comparison-title" className="mt-3 font-serif text-2xl text-ink sm:text-3xl">
            More room to enjoy the greenery
          </h2>
          <p className="mt-2 max-w-prose text-sm leading-relaxed text-ink/65">
            Compare the same balcony before and after a careful plant arrangement and maintenance visit.
          </p>
        </div>
        <div className="flex shrink-0 border border-moss/20" aria-label="Choose comparison view">
          <button
            type="button"
            onClick={() => setReveal(100)}
            aria-pressed={reveal === 100}
            className={`px-3 py-2 text-xs transition-colors ${reveal === 100 ? "bg-moss text-greige" : "text-ink/70 hover:bg-sage/50"}`}
          >
            Before
          </button>
          <button
            type="button"
            onClick={() => setReveal(0)}
            aria-pressed={reveal === 0}
            className={`border-l border-moss/20 px-3 py-2 text-xs transition-colors ${reveal === 0 ? "bg-moss text-greige" : "text-ink/70 hover:bg-sage/50"}`}
          >
            After
          </button>
        </div>
      </div>

      <div className="relative isolate aspect-[4/5] max-h-[780px] overflow-hidden rounded-xl border border-moss/15 bg-sage/20 shadow-[0_18px_40px_rgba(28,47,38,0.12)] sm:aspect-[16/10]">
        <Image
          src={balconyAfter}
          alt="Balcony after plant maintenance and a refreshed arrangement"
          fill
          sizes="(min-width: 1024px) 80vw, 100vw"
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - reveal}% 0 0)` }}
        >
          <Image
            src={balconyBefore}
            alt="Balcony before the plant maintenance visit"
            fill
            sizes="(min-width: 1024px) 80vw, 100vw"
            className="object-cover"
          />
        </div>

        <span className="pointer-events-none absolute left-4 top-4 z-10 bg-ink/75 px-3 py-1.5 text-xs uppercase text-white">
          Before
        </span>
        <span className="pointer-events-none absolute right-4 top-4 z-10 bg-ink/75 px-3 py-1.5 text-xs uppercase text-white">
          After
        </span>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 top-0 z-10 w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.55)]"
          style={{ left: `${reveal}%` }}
        >
          <span className="absolute left-1/2 top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white bg-moss text-lg text-white shadow-lg">
            ↔
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={reveal}
          onChange={(event) => setReveal(Number(event.target.value))}
          aria-label="Reveal the before photo"
          aria-valuetext={`${reveal}% of the before photo revealed`}
          className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0 focus-visible:opacity-20 focus-visible:outline focus-visible:outline-4 focus-visible:outline-moss"
        />
      </div>
      <p className="mt-3 text-center text-xs text-ink/55">
        Drag the divider or use the arrow keys to compare.
      </p>
    </section>
  );
}
