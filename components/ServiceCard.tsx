import Link from "next/link";
import type { Service } from "@/lib/data";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="group h-full rounded-[28px] border border-moss/10 bg-[linear-gradient(180deg,#f8f5ee_0%,#f0ede3_100%)] p-6 shadow-[0_18px_42px_rgba(28,47,38,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-moss/25 hover:shadow-[0_22px_56px_rgba(28,47,38,0.12)]">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ochre/35 bg-ochre/10 text-sm text-moss-dark">✦</span>
        <p className="specimen-tag uppercase tracking-[0.04em] text-[12px]">{service.startingPrice}</p>
      </div>
      <h3 className="mt-5 font-serif text-[2rem] leading-none tracking-[-0.04em] text-ink">{service.name}</h3>
      <p className="mt-4 text-[15px] leading-relaxed text-ink/70">
        {service.description}
      </p>
      <Link
        href={`/request-service?service=${service.slug}`}
        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-moss transition-colors hover:text-moss-dark"
      >
        <span className="text-base text-ochre">•</span>
        Book this service
      </Link>
    </div>
  );
}
