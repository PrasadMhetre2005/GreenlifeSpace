"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/our-work", label: "Our Work" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-moss/10 bg-greige/95 backdrop-blur">
      <div className="container-page flex h-20 items-center justify-between">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-serif text-2xl italic text-moss-dark">
            Greenlife
          </span>
          <span className="font-serif text-2xl text-moss-dark">Spaces</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[15px] transition-colors hover:text-moss ${
                  active ? "text-moss font-medium" : "text-ink/70"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/request-service"
          className="hidden rounded-sm bg-moss px-5 py-2.5 text-[15px] text-greige transition-colors hover:bg-moss-dark md:inline-block"
        >
          Request a visit
        </Link>

        <button
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span
            className={`h-px w-6 bg-ink transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-6 bg-ink transition-opacity ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`h-px w-6 bg-ink transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
          />
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
                {link.label}
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
            <Link
              href="/request-service"
              onClick={() => setOpen(false)}
              className="mt-2 inline-block rounded-sm bg-moss px-5 py-2.5 text-center text-[15px] text-greige"
            >
              Request a visit
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
