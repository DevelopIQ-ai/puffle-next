"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  activePage?: "product" | "pricing" | "docs";
}

export default function Header({ activePage }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu when clicking a link
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

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
              <li>
                <a
                  href="https://docs.puffle.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={activePage === "docs" ? "nav-active" : ""}
                  onClick={handleLinkClick}
                >
                  Docs
                </a>
              </li>
            </ul>
            <div className="mobile-nav-cta">
              <a
                href="https://zcal.co/i/BT5kddcb"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                onClick={handleLinkClick}
              >
                Book a Demo
              </a>
            </div>
          </nav>
          <div className="nav-cta desktop-only">
            <a
              href="https://zcal.co/i/BT5kddcb"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Book a Demo
            </a>
          </div>
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
