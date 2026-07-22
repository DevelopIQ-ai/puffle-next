import Image from "next/image";
import Link from "next/link";

import { CONTACT_EMAIL, WAITLIST_URL } from "./site";

export default function Header() {
  return (
    <header className="puffle-header">
      <div className="puffle-header-inner">
        <Link
          href="/"
          className="logo"
        >
          <Image
            src="/puffle-logo.png"
            alt="Puffle Logo"
            className="navbar-logo"
            width={22}
            height={22}
            style={{ height: 22, width: 22, filter: "none" }}
          />
          <em className="puffle-logo-name">Puffle</em>
        </Link>
        <nav aria-label="Primary navigation">
          <a href="/#how-it-works">How it works</a>
          <Link href="/pricing">Pricing</Link>
          <a href={`mailto:${CONTACT_EMAIL}`}>Contact</a>
        </nav>
        <Link href={WAITLIST_URL} className="puffle-header-cta">Get started <span>→</span></Link>
      </div>
    </header>
  );
}
