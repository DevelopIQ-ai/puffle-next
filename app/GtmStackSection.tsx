"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const STACK_APPS = [
  { name: "Apollo", src: "/apollo-logo.png", className: "gtm-stack-card-apollo" },
  { name: "Clay", src: "/clay-logo.png", className: "gtm-stack-card-clay" },
  { name: "Instantly", src: "/instantly-logo.png", className: "gtm-stack-card-instantly" },
  { name: "Dripify", src: "/dripify-logo.png", className: "gtm-stack-card-dripify" },
  { name: "Smartlead", src: "/smartlead-logo.png", className: "gtm-stack-card-smartlead" },
  { name: "Crunchbase", src: "/crunchbase-logo.png", className: "gtm-stack-card-crunchbase" },
  { name: "n8n", src: "/n8n-logo.svg", className: "gtm-stack-card-n8n gtm-stack-card-small" },
  { name: "Lemlist", src: "/lemlist-logo.png", className: "gtm-stack-card-lemlist gtm-stack-card-small" },
  { name: "Salesloft", src: "/salesloft-logo.jpg", className: "gtm-stack-card-salesloft gtm-stack-card-small" },
  { name: "Trigify", src: "/trigify-logo.png", className: "gtm-stack-card-trigify gtm-stack-card-small" },
];

export default function GtmStackSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.35 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="gtm-section" id="product" ref={sectionRef}>
      <div className="gtm-content">
        <div className="gtm-copy">
          <h2>Throw out your GTM stack.</h2>
          <p>
            Stop duct-taping lead lists, enrichment, research, and outbound tools
            into one brittle motion.
          </p>
        </div>

        <div
          className="gtm-puffle-visual"
          aria-label="Puffle wearing a baseball cap runs in from the left and bounces on the duct-taped GTM stack like a trampoline."
        >
          <div className={`gtm-puffle-stage ${isVisible ? "gtm-puffle-stage-active" : ""}`}>
            <div className="gtm-stack-target" aria-hidden="true">
              {STACK_APPS.map((app) => (
                <div className={`gtm-stack-card ${app.className}`} key={app.name}>
                  <Image
                    src={app.src}
                    alt=""
                    width={56}
                    height={56}
                    sizes="56px"
                    className="gtm-stack-logo"
                    aria-hidden="true"
                  />
                  <span>{app.name}</span>
                </div>
              ))}
              <span className="gtm-stack-tape gtm-stack-tape-1" />
              <span className="gtm-stack-tape gtm-stack-tape-2" />
              <span className="gtm-stack-tape gtm-stack-tape-3" />
            </div>
            <div className="gtm-puffle-runner">
              <div className="gtm-puffle-character">
                <div className="gtm-puffle-body">
                  <Image
                    src="/puffle-logo.svg"
                    alt=""
                    width={260}
                    height={260}
                    sizes="260px"
                    className="gtm-puffle-logo"
                    aria-hidden="true"
                  />
                  <div className="gtm-puffle-cap" aria-hidden="true">
                    <span className="gtm-puffle-cap-crown" />
                    <span className="gtm-puffle-cap-bill" />
                  </div>
                </div>
                <div className="gtm-puffle-feet" aria-hidden="true">
                  <span className="gtm-puffle-foot gtm-puffle-foot-left" />
                  <span className="gtm-puffle-foot gtm-puffle-foot-right" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
