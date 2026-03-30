"use client";

import { useState, useEffect, useRef } from "react";
import BinaryLogo from "./BinaryLogo";

// Lightning bolt path (viewBox 0 0 24 24)
const LIGHTNING_PATH =
  "M 13 2 L 4 14 L 11 14 L 11 22 L 20 10 L 13 10 L 13 2 Z";

const SIGNALS = [
  {
    company: "Orion AI",
    domain: "orion-ai.com",
    type: "Funding",
    color: "purple",
    title: "Raised $25M Series A led by Sequoia",
    score: 92,
    source: "LinkedIn",
    time: "2h ago",
  },
  {
    company: "NovaByte",
    domain: "novabyte.io",
    type: "Hiring",
    color: "emerald",
    title: "Hiring VP of Sales — remote, SaaS experience",
    score: 87,
    source: "LinkedIn Jobs",
    time: "4h ago",
  },
  {
    company: "Helios Labs",
    domain: "helioslabs.com",
    type: "Pain Point",
    color: "blue",
    title: '"Frustrated with our current outreach tooling"',
    score: 84,
    source: "Reddit",
    time: "6h ago",
  },
  {
    company: "Atlas Cloud",
    domain: "atlascloud.dev",
    type: "Leadership Change",
    color: "red",
    title: "New CRO appointed — previously at Datadog",
    score: 81,
    source: "News",
    time: "8h ago",
  },
];

const COLOR_MAP: Record<string, { bg: string; text: string; dot: string }> = {
  purple: { bg: "rgba(147, 51, 234, 0.1)", text: "#7c3aed", dot: "#8b5cf6" },
  emerald: { bg: "rgba(16, 185, 129, 0.1)", text: "#059669", dot: "#10b981" },
  blue: { bg: "rgba(59, 130, 246, 0.1)", text: "#2563eb", dot: "#3b82f6" },
  red: { bg: "rgba(239, 68, 68, 0.1)", text: "#dc2626", dot: "#ef4444" },
  violet: { bg: "rgba(139, 92, 246, 0.1)", text: "#7c3aed", dot: "#8b5cf6" },
  cyan: { bg: "rgba(6, 182, 212, 0.1)", text: "#0891b2", dot: "#06b6d4" },
};

function SignalCard({
  signal,
  visible,
  delay,
}: {
  signal: (typeof SIGNALS)[0];
  visible: boolean;
  delay: number;
}) {
  const colors = COLOR_MAP[signal.color] || COLOR_MAP.blue;

  return (
    <div
      className={`sig-card ${visible ? "sig-card-visible" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="sig-card-top">
        <div className="sig-card-company">
          <span className="sig-card-avatar" style={{ background: colors.dot }}>
            {signal.company[0]}
          </span>
          <div>
            <span className="sig-card-name">{signal.company}</span>
            <span className="sig-card-domain">{signal.domain}</span>
          </div>
        </div>
        <span
          className="sig-score"
          style={{
            background:
              signal.score >= 85
                ? "rgba(239, 68, 68, 0.08)"
                : signal.score >= 70
                  ? "rgba(245, 158, 11, 0.08)"
                  : "rgba(59, 130, 246, 0.08)",
            color:
              signal.score >= 85
                ? "#dc2626"
                : signal.score >= 70
                  ? "#d97706"
                  : "#2563eb",
          }}
        >
          {signal.score}
        </span>
      </div>
      <div className="sig-card-body">
        <span
          className="sig-type-pill"
          style={{ background: colors.bg, color: colors.text }}
        >
          {signal.type}
        </span>
        <p className="sig-card-title">{signal.title}</p>
      </div>
      <div className="sig-card-meta">
        <span>{signal.source}</span>
        <span className="sig-card-dot">&middot;</span>
        <span>{signal.time}</span>
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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="sig-section" ref={sectionRef}>
      <div className="sig-content">
        <div className="sig-text">
          <h2>Know who&rsquo;s ready to buy</h2>
          <p>
            13 data sources. AI-scored signals. Know the moment a prospect raises
            funding, hires for your role, or complains about a competitor.
          </p>
        </div>
        <div className="sig-split">
          <div className="sig-feed">
            {SIGNALS.map((signal, i) => (
              <SignalCard
                key={i}
                signal={signal}
                visible={visible}
                delay={i * 200}
              />
            ))}
          </div>
          <div className="sig-art">
            <BinaryLogo
              shapePath={LIGHTNING_PATH}
              pathSize={24}
              color="25, 50, 120"
              intensity={1.2}
              cols={50}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
