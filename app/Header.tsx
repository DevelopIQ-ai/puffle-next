"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);

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

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    if (href === "#") return;
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header ref={headerRef}>
      <div className="container header-container">
        <a
          href="#"
          className="logo"
          onClick={(e) => handleAnchorClick(e, "#")}
        >
          <Image
            src="/spiked-ball.svg"
            alt="Puffle Logo"
            className="navbar-logo"
            width={28}
            height={28}
            style={{ height: 28, width: 28 }}
          />
          Puffle
        </a>
        <nav>
          <ul>
            <li>
              <a
                href="#product"
                onClick={(e) => handleAnchorClick(e, "#product")}
              >
                Product
              </a>
            </li>
            <li>
              <a
                href="#solutions"
                onClick={(e) => handleAnchorClick(e, "#solutions")}
              >
                Solutions
              </a>
            </li>
            <li>
              <a
                href="#pricing"
                onClick={(e) => handleAnchorClick(e, "#pricing")}
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#company"
                onClick={(e) => handleAnchorClick(e, "#company")}
              >
                Company
              </a>
            </li>
          </ul>
        </nav>
        <div className="nav-cta">
          <a
            href="#"
            className="btn btn-secondary"
            onClick={(e) => handleAnchorClick(e, "#")}
          >
            Login
          </a>
          <a
            className="btn btn-primary"
            href="https://zcal.co/i/BT5kddcb"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Started
          </a>
        </div>
      </div>
    </header>
  );
}
