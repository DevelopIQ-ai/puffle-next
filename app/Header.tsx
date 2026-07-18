import Image from "next/image";
import Link from "next/link";

import { APP_URL, CONTACT_EMAIL, PRIMARY_NAVIGATION } from "./site";

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
            <a href={APP_URL} className="btn btn-primary header-app-link">
              Hire Puffle
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
