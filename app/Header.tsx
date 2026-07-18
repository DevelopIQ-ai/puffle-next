import Image from "next/image";
import Link from "next/link";

import { CONTACT_EMAIL, PRIMARY_NAVIGATION, WAITLIST_URL } from "./site";

export default function Header() {
  return (
    <header>
      <div className="container header-container">
        <Link
          href="/"
          className="logo"
        >
          <Image
            src="/puffle-logo.svg"
            alt="Puffle Logo"
            className="navbar-logo"
            width={28}
            height={28}
            style={{ height: 28, width: 28, filter: "none" }}
          />
          Puffle
        </Link>
        <div className="header-actions">
          <nav aria-label="Primary navigation">
            <ul>
              {PRIMARY_NAVIGATION.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
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
