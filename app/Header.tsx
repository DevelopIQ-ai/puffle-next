import Image from "next/image";
import Link from "next/link";

import { CONTACT_EMAIL, WAITLIST_URL } from "./site";

export default function Header() {
  return (
    <header>
      <div className="container header-container">
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
          Puffle
        </Link>
        <div className="header-actions">
          <div className="nav-cta">
            <a href={`mailto:${CONTACT_EMAIL}`} className="top-nav-link header-contact-link">
              Contact
            </a>
            <Link href={WAITLIST_URL} className="btn btn-primary header-app-link">
              Join the waitlist
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
