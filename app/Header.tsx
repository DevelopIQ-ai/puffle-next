"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  activePage?: "product" | "pricing";
}

export default function Header({ activePage }: HeaderProps) {
  const headerRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const container = document.querySelector(".snap-container");
    if (!container) return;

    const handleScroll = () => {
      if (!headerRef.current) return;
      if (container.scrollTop > 50) {
        headerRef.current.style.boxShadow =
          "0 4px 6px -1px rgb(0 0 0 / 0.1)";
      } else {
        headerRef.current.style.boxShadow = "none";
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking a link
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <header ref={headerRef}>
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
        <nav className={menuOpen ? "nav-open" : ""}>
          <ul>
            <li>
              <Link
                href="/#product"
                className={activePage === "product" ? "nav-active" : ""}
                onClick={handleLinkClick}
              >
                Product
              </Link>
            </li>
            <li>
              <Link
                href="/pricing"
                className={activePage === "pricing" ? "nav-active" : ""}
                onClick={handleLinkClick}
              >
                Pricing
              </Link>
            </li>
          </ul>
          <div className="mobile-nav-cta">
            <Link
              href="https://app.puffle.ai"
              className="btn btn-primary"
              onClick={handleLinkClick}
            >
              Get Started
            </Link>
          </div>
        </nav>
        <div className="nav-cta desktop-only">
          <Link
            href="https://app.puffle.ai"
            className="btn btn-primary"
          >
            Get Started
          </Link>
        </div>
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}
