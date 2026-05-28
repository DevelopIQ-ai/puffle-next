"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const SOCIAL_SOURCES = [
  {
    name: "X",
    logo: "/social-logos/x.svg",
    className: "sig-source-x",
  },
  {
    name: "LinkedIn",
    logo: "/social-logos/linkedin.svg",
    className: "sig-source-linkedin",
  },
  {
    name: "Google News",
    logo: "/social-logos/google-news.svg",
    className: "sig-source-google-news",
  },
  {
    name: "Reddit",
    logo: "/social-logos/reddit.svg",
    className: "sig-source-reddit",
  },
  {
    name: "Instagram",
    logo: "/social-logos/instagram.svg",
    className: "sig-source-instagram",
  },
  {
    name: "GitHub",
    logo: "/social-logos/github.svg",
    className: "sig-source-github",
  },
  {
    name: "Bluesky",
    logo: "/social-logos/bluesky.svg",
    className: "sig-source-bluesky",
  },
];

const SIGNALS = [
  {
    source: "Google News",
    message:
      "Nimbus Ops was mentioned in Google News after announcing a new RevOps hire. That usually means outbound process changes are coming.",
  },
  {
    source: "Instagram",
    message:
      "VectorGrid is posting launch content on Instagram and LinkedIn at 3.4x their normal pace. Good expansion signal.",
  },
  {
    source: "GitHub",
    message:
      "Forgebase has a CRM importer repo spiking 4.8x today. That looks like migration intent.",
  },
];

function SourceNode({
  source,
  index,
}: {
  source: (typeof SOCIAL_SOURCES)[number];
  index: number;
}) {
  return (
    <div
      className={`sig-source-node ${source.className}`}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <div className="sig-source-card">
        <span className="sig-source-mark">
          <Image
            src={source.logo}
            alt={source.name}
            width={24}
            height={24}
            sizes="24px"
            className="sig-source-logo"
          />
        </span>
      </div>
    </div>
  );
}

export default function SignalsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const scroller = document.querySelector(".snap-container");

    const checkVisible = () => {
      const sectionRect = section.getBoundingClientRect();
      const rootRect = scroller?.getBoundingClientRect() ?? {
        top: 0,
        bottom: window.innerHeight,
        height: window.innerHeight,
      };
      const visibleHeight =
        Math.min(sectionRect.bottom, rootRect.bottom) -
        Math.max(sectionRect.top, rootRect.top);
      const activationHeight = Math.min(sectionRect.height, rootRect.height) * 0.22;

      if (visibleHeight >= activationHeight) setVisible(true);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { root: scroller, threshold: 0.22 }
    );

    observer.observe(section);
    requestAnimationFrame(checkVisible);
    scroller?.addEventListener("scroll", checkVisible, { passive: true });
    window.addEventListener("resize", checkVisible);

    return () => {
      observer.disconnect();
      scroller?.removeEventListener("scroll", checkVisible);
      window.removeEventListener("resize", checkVisible);
    };
  }, []);

  return (
    <section className="sig-section sig-spy-section" ref={sectionRef}>
      <div className="sig-content sig-spy-content">
        <div className="sig-text sig-spy-text">
          <h2>The world&apos;s best signal tracking.</h2>
          <p>
            Puffle listens across GitHub, X, LinkedIn, Reddit, Bluesky,
            Google News, and Instagram, then turns market noise into ranked
            buying signals.
          </p>
        </div>

        <div className={`sig-spy-shell ${visible ? "sig-spy-visible" : ""}`}>
          <div
            className="sig-spy-stage"
            aria-label="Animated spy Puffle listening across social and market channels."
          >
            <span className="sig-radar-ring sig-radar-ring-1" aria-hidden="true" />
            <span className="sig-radar-ring sig-radar-ring-2" aria-hidden="true" />
            <span className="sig-radar-ring sig-radar-ring-3" aria-hidden="true" />
            <span className="sig-radar-sweep" aria-hidden="true" />

            <svg className="sig-listening-lines" viewBox="0 0 640 520" aria-hidden="true">
              <path className="sig-line sig-line-1" d="M320 52 C320 126 320 180 320 238" />
              <path className="sig-line sig-line-2" d="M422 88 C398 142 370 198 336 246" />
              <path className="sig-line sig-line-3" d="M499 198 C446 216 394 238 346 255" />
              <path className="sig-line sig-line-4" d="M493 322 C438 312 390 292 346 268" />
              <path className="sig-line sig-line-5" d="M397 421 C374 372 346 320 328 284" />
              <path className="sig-line sig-line-6" d="M243 421 C264 370 290 318 310 282" />
              <path className="sig-line sig-line-7" d="M141 260 C194 258 246 258 296 260" />
            </svg>

            {SOCIAL_SOURCES.map((source, index) => (
              <SourceNode key={source.name} source={source} index={index} />
            ))}

            <div className="sig-spy-puffle" aria-hidden="true">
              <span className="sig-spy-shadow" />
              <div className="sig-spy-body">
                <Image
                  src="/puffle-logo.svg"
                  alt=""
                  width={166}
                  height={166}
                  sizes="166px"
                  className="sig-spy-logo"
                />
                <Image
                  src="/spy-hat-glasses.png"
                  alt=""
                  width={751}
                  height={523}
                  sizes="178px"
                  className="sig-spy-accessory"
                />
                <span className="sig-spy-legs">
                  <span className="sig-spy-leg sig-spy-leg-left" />
                  <span className="sig-spy-leg sig-spy-leg-right" />
                </span>
              </div>
            </div>
          </div>

          <aside className="sig-chat-panel" aria-label="Puffle signal text messages">
            <div className="sig-phone-status" aria-hidden="true">
              <span>12:48</span>
              <span className="sig-phone-indicators">
                <span className="sig-phone-signal" />
                <span className="sig-phone-wifi" />
                <span className="sig-phone-battery" />
              </span>
            </div>
            <div className="sig-chat-header">
              <span className="sig-chat-back" aria-hidden="true">
                ‹
              </span>
              <div className="sig-chat-contact-wrap">
                <span className="sig-chat-contact">
                  <Image
                    src="/puffle-logo.svg"
                    alt=""
                    width={28}
                    height={28}
                    sizes="28px"
                  />
                </span>
                <strong>Puffle</strong>
              </div>
              <span className="sig-chat-info" aria-hidden="true">
                i
              </span>
            </div>

            <div className="sig-chat-thread">
              <span className="sig-chat-time">Today 12:48 PM</span>
              <div className="sig-chat-message sig-chat-message-me">
                <div className="sig-chat-bubble">Any good buying signals today?</div>
              </div>
              {SIGNALS.map((signal, index) => (
                <div
                  className="sig-chat-message sig-chat-message-puffle"
                  key={signal.source}
                  style={{ transitionDelay: `${260 + index * 120}ms` }}
                >
                  <div className="sig-chat-bubble">{signal.message}</div>
                </div>
              ))}
            </div>
            <div className="sig-chat-compose" aria-hidden="true">
              <span className="sig-chat-plus">+</span>
              <span className="sig-chat-input">iMessage</span>
              <span className="sig-chat-send">↑</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
