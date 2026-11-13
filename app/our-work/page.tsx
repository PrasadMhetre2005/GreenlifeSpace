import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import BeforeAfterComparison from "@/components/BeforeAfterComparison";
import ShowcaseGallery from "@/components/ShowcaseGallery";

export const metadata: Metadata = {
  title: "Our Work | Greenlife Spaces",
  description: "Before/after photos and case studies from recent projects.",
};

export default function OurWorkPage() {
  return (
    <div className="py-16 lg:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Our work"
          title="Before and after, by setting"
          intro="A closer look at how thoughtful plant placement and regular care can make a balcony feel calmer, brighter and easier to enjoy."
        />
      </div>

      <div className="container-page">
        <BeforeAfterComparison />
      </div>

      <div className="container-page mt-24">
        <SectionHeading eyebrow="Case studies" title="Recent projects" />
        <ShowcaseGallery />
      </div>
    </div>
  );
}
