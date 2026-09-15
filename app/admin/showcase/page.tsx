import type { Metadata } from "next";
import ShowcaseAdminForm from "@/components/ShowcaseAdminForm";

export const metadata: Metadata = {
  title: "Showcase Admin | Greenlife Spaces",
  description: "Add and manage Greenlife Spaces case studies.",
};

export default function ShowcaseAdminPage() {
  return (
    <div className="container-page py-16 lg:py-24">
      <div className="max-w-2xl">
        <p className="specimen-tag">Team workspace</p>
        <h1 className="mt-4 font-serif text-4xl text-ink sm:text-5xl">Keep the showcase fresh</h1>
        <p className="mt-5 text-[17px] leading-relaxed text-ink/70">Add completed work in a few fields and it will appear on the public Our Work page immediately in this browser.</p>
      </div>
      <div className="mt-14"><ShowcaseAdminForm /></div>
    </div>
  );
}