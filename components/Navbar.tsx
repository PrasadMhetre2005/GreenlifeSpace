"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import type { Language } from "@/components/LanguageProvider";

const links = [
  { href: "/", key: "home" },
  { href: "/services", key: "services" },
  { href: "/our-work", key: "work" },
  { href: "/service-areas", key: "areas" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage, dictionary } = useLanguage();

  return (
    <header className="sticky top-0 z-40 border-b border-moss/10 bg-greige/95 backdrop-blur">
      <div className="container-page flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-serif text-2xl italic text-moss-dark max-[380px]:text-xl">Greenlife</span>
          <span className="font-serif text-2xl text-moss-dark max-[380px]:text-xl">Spaces</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[15px] transition-colors hover:text-moss ${pathname === link.href ? "font-medium text-moss" : "text-ink/70"}`}
            >
              {dictionary[link.key]}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/request-service"
            className="rounded-sm bg-moss px-5 py-2.5 text-[15px] text-greige transition-colors hover:bg-moss-dark"
          >
            {dictionary.requestVisit}
          </Link>
          <select
            value={language}
            onChange={(event) => setLanguage(event.target.value as Language)}
            className="border border-moss/20 bg-transparent px-2 py-1.5 text-xs text-ink outline-none"
            aria-label={dictionary.language}
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="mr">मराठी</option>
          </select>
        </div>

        <button
          className="flex min-h-11 min-w-11 items-center justify-center gap-1.5 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span className={`h-px w-6 bg-ink transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-px w-6 bg-ink transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </div>

      {open && (
        <nav className="border-t border-moss/10 bg-greige md:hidden">
          <div className="container-page flex flex-col gap-4 py-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between border-b border-moss/10 pb-3 text-[15px] ${pathname === link.href ? "font-medium text-moss" : "text-ink/80"}`}
              >
                {dictionary[link.key]}
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
            <Link
              href="/request-service"
              onClick={() => setOpen(false)}
              className="mt-2 inline-block rounded-sm bg-moss px-5 py-2.5 text-center text-[15px] text-greige"
            >
              {dictionary.requestVisit}
            </Link>
            <label className="flex items-center justify-between border-t border-moss/10 pt-4 text-sm text-ink/70">
              {dictionary.language}
              <select
                value={language}
                onChange={(event) => setLanguage(event.target.value as Language)}
                className="border border-moss/20 bg-transparent px-2 py-1.5 text-sm text-ink outline-none"
                aria-label={dictionary.language}
              >
                <option value="en">English</option>
                <option value="hi">हिन्दी</option>
                <option value="mr">मराठी</option>
              </select>
            </label>
          </div>
        </nav>
      )}
    </header>
  );
}
