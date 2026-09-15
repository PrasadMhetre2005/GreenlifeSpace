import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-moss/15 bg-moss-dark text-greige">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <span className="font-serif text-xl italic">Greenlife</span>{" "}
          <span className="font-serif text-xl">Spaces</span>
          <p className="mt-3 max-w-[30ch] text-sm text-greige/70">
            Plant care and decoration for homes, offices and events across
            Pune and Mumbai.
          </p>
        </div>

        <div>
          <p className="specimen-tag text-sage">Explore</p>
          <ul className="mt-3 space-y-2 text-sm text-greige/80">
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/our-work">Our Work</Link></li>
            <li><Link href="/service-areas">Service Areas</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/admin/showcase">Team showcase editor</Link></li>
          </ul>
        </div>

        <div>
          <p className="specimen-tag text-sage">Get in touch</p>
          <ul className="mt-3 space-y-2 text-sm text-greige/80">
            <li><Link href="/contact">Send an inquiry</Link></li>
            <li><Link href="/request-service">Request a service visit</Link></li>
            <li>hello@greenlifespaces.in</li>
            <li>+91 8975324280</li>
          </ul>
        </div>

        <div>
          <p className="specimen-tag text-sage">Hours</p>
          <ul className="mt-3 space-y-2 text-sm text-greige/80">
            <li>Mon – Sat, 9am – 6pm</li>
            <li>Sunday: closed</li>
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
