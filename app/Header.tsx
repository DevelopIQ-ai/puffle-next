"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const initial = session?.user?.name?.charAt(0)?.toUpperCase() || "?";

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
          {session ? (
            <div ref={dropdownRef} style={{ position: "relative" }}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  backgroundColor: "var(--accent-primary)",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-serif)",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background-color 0.15s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--accent-hover)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--accent-primary)")}
              >
                {initial}
              </button>
              {showDropdown && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    right: 0,
                    backgroundColor: "#0f0f0f",
                    border: "1px solid #222",
                    borderRadius: "0.375rem",
                    padding: "0.25rem 0",
                    minWidth: 140,
                    zIndex: 1001,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                  }}
                >
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      router.push("/dashboard");
                    }}
                    style={{
                      width: "100%",
                      padding: "0.5rem 1rem",
                      background: "none",
                      border: "none",
                      color: "var(--text-primary)",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.85rem",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "background-color 0.1s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1a1a1a")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={async () => {
                      setShowDropdown(false);
                      await signOut();
                      router.push("/");
                    }}
                    style={{
                      width: "100%",
                      padding: "0.5rem 1rem",
                      background: "none",
                      border: "none",
                      color: "var(--text-primary)",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.85rem",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "background-color 0.1s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1a1a1a")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="btn btn-secondary"
              >
                Login
              </Link>
              <Link
                href="/login"
                className="btn btn-primary"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
