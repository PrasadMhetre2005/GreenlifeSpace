import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import InquiryForm from "@/components/InquiryForm";

export const metadata: Metadata = {
  title: "Contact | Greenlife Spaces",
  description: "General questions and inquiries.",
};

const whatsappUrl =
  "https://wa.me/918975324280?text=" +
  encodeURIComponent("Hello Greenlife Spaces, I have a question about your plant care services.");

export default function ContactPage() {
  return (
    <div className="container-page py-16 lg:py-24">
      <SectionHeading
        eyebrow="Contact"
        title="Have a question first?"
        intro="For a specific visit, use Request a Service Visit instead — this form is for general questions."
      />
      <div className="mt-14 max-w-3xl">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-y border-moss/15 py-5">
          <div>
            <p className="text-sm font-medium text-ink">Prefer a quick reply?</p>
            <p className="mt-1 text-sm text-ink/60">Message Greenlife Spaces directly on WhatsApp.</p>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-sm bg-[#25D366] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#1da851]"
          >
            Chat on WhatsApp
          </a>
        </div>
        <InquiryForm />
      </div>
    </div>
  );
}
