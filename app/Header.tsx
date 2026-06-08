import Image from "next/image";
import Link from "next/link";

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
        <div className="header-actions header-actions-simple">
          <a
            href="mailto:kush@puffle.ai"
            className="top-nav-link"
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  );
}
