"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

export default function Footer() {
  const { dictionary } = useLanguage();

  return (
    <footer className="border-t border-moss/15 bg-moss-dark text-greige">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <span className="font-serif text-xl italic">Greenlife</span>{" "}
          <span className="font-serif text-xl">Spaces</span>
          <p className="mt-3 max-w-[30ch] text-sm text-greige/70">
            {dictionary.plantCareFooter}
          </p>
        </div>

        <div>
          <p className="specimen-tag text-sage">{dictionary.explore}</p>
          <ul className="mt-3 space-y-2 text-sm text-greige/80">
            <li><Link href="/services">{dictionary.services}</Link></li>
            <li><Link href="/our-work">{dictionary.work}</Link></li>
            <li><Link href="/service-areas">{dictionary.areas}</Link></li>
            <li><Link href="/about">{dictionary.about}</Link></li>
            <li><Link href="/admin/showcase">{dictionary.showcaseEditor}</Link></li>
          </ul>
        </div>

        <div>
          <p className="specimen-tag text-sage">{dictionary.getInTouch}</p>
          <ul className="mt-3 space-y-2 text-sm text-greige/80">
            <li><Link href="/contact">{dictionary.sendInquiry}</Link></li>
            <li><Link href="/request-service">{dictionary.requestService}</Link></li>
            <li>hello@greenlifespaces.in</li>
            <li>+91 8975324280</li>
          </ul>
        </div>

        <div>
          <p className="specimen-tag text-sage">{dictionary.hours}</p>
          <ul className="mt-3 space-y-2 text-sm text-greige/80">
            <li>Mon – Sat, 9am – 6pm</li>
            <li>{dictionary.sundayClosed}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-greige/10 py-6">
        <p className="container-page text-xs text-greige/50">
          © {new Date().getFullYear()} Greenlife Spaces. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
