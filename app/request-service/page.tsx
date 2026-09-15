import type { Metadata } from "next";
import { Suspense } from "react";
import SectionHeading from "@/components/SectionHeading";
import RequestServiceForm from "@/components/RequestServiceForm";

export const metadata: Metadata = {
  title: "Request a Service Visit | Greenlife Spaces",
  description: "Book a plant care visit in under a minute. No account needed.",
};

export default function RequestServicePage() {
  return (
    <div className="container-page py-16 lg:py-24">
      <SectionHeading
        eyebrow="Request a visit"
        title="Tell us what you need"
        intro="Fill in your details and preferred time. We'll confirm the visit, usually the same day — no account or password required."
      />
      <div className="mt-14 max-w-3xl">
        <Suspense fallback={null}>
          <RequestServiceForm />
        </Suspense>
      </div>
    </div>
  );
}
