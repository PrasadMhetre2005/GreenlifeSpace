import Image from "next/image";
import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import ShowcaseGallery from "@/components/ShowcaseGallery";
import glassDecorationView from "../../photos/glass decoration veiw.jpg";
import plantCareBoyImage from "../../photos/plant care boy pic.jpg";
import waterThowingImage from "../../photos/water thwoing.jpg";

export const metadata: Metadata = {
  title: "Our Work | Greenlife Spaces",
  description: "Before/after photos and case studies from recent projects.",
};

const gallerySettings: { label: string; image: any }[] = [
  { label: "office reception", image: glassDecorationView },
  { label: "hotel lobby", image: waterThowingImage },
  { label: "home living room", image: plantCareBoyImage },
  { label: "café seating", image: glassDecorationView },
  { label: "coworking desk pods", image: waterThowingImage },
  { label: "event backdrop", image: plantCareBoyImage },
];

export default function OurWorkPage() {
  return (
    <div className="py-16 lg:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Our work"
          title="Before and after, by setting"
          intro="A selection of spaces we've styled and continue to maintain. Photos below are placeholders — real project photography will replace these once uploaded."
        />
      </div>

      <div className="container-page mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {gallerySettings.map((g) => (
          <div key={g.label} className="group overflow-hidden rounded-[22px] border border-moss/10 bg-sage/30 shadow-[0_18px_40px_rgba(28,47,38,0.08)] transition-transform duration-300 hover:-translate-y-1">
            <Image
              src={g.image}
              alt={g.label}
              className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="flex items-center justify-between border-t border-moss/10 bg-white/40 px-3 py-3">
              <span className="text-xs uppercase tracking-[0.18em] text-ink/55">{g.label}</span>
              <span className="text-lg text-ochre">✦</span>
            </div>
          </div>
        ))}
      </div>

      <div className="container-page mt-24">
        <SectionHeading eyebrow="Case studies" title="Recent projects" />
        <ShowcaseGallery />
      </div>
    </div>
  );
}
