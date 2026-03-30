"use client";

import { useState, useEffect, useRef } from "react";
import BinaryLogo from "./BinaryLogo";

// Document/page icon path (viewBox 0 0 24 24)
const DOC_PATH =
  "M 6 2 C 4.895 2 4 2.895 4 4 L 4 20 C 4 21.105 4.895 22 6 22 L 18 22 C 19.105 22 20 21.105 20 20 L 20 8 L 14 2 L 6 2 Z M 13 3 L 13 9 L 19 9 M 8 13 L 16 13 M 8 17 L 13 17 M 8 9 L 10 9";

const REPORT_SECTIONS = [
  {
    title: "Executive Summary",
    lines: [
      "Alex Chen is a VP of Sales at Orion AI, a Series A startup building AI-powered data infrastructure. With 12 years in SaaS sales leadership, he has a track record of scaling teams from 5 to 50+ reps.",
    ],
  },
  {
    title: "Recent Events",
    items: [
      { badge: "Funding", color: "#7c3aed", text: "Orion AI raised $25M Series A led by Sequoia" },
      { badge: "Hiring", color: "#059669", text: "Posted 3 new SDR roles in the past week" },
    ],
  },
  {
    title: "Strategic Context",
    items: [
      { badge: "Initiative", color: "#2563eb", text: "Building outbound pipeline to support 3x ARR growth target" },
      { badge: "Pain Point", color: "#dc2626", text: "Current tooling fragmented across 4 platforms" },
    ],
  },
  {
    title: "Key Talking Points",
    lines: [
      "• Consolidating sales stack could save 15+ hrs/week per rep",
      "• AI personalization aligns with their product-led GTM motion",
      "• Recent funding creates budget for new infrastructure",
    ],
  },
];

function ReportDemo({ visible }: { visible: boolean }) {
  const [visibleSections, setVisibleSections] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!visible) {
      setVisibleSections(0);
      setProgress(0);
      return;
    }

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return p + 2;
      });
    }, 50);

    // Sections reveal
    const timers = REPORT_SECTIONS.map((_, i) =>
      setTimeout(() => setVisibleSections(i + 1), 800 + i * 600)
    );

    return () => {
      clearInterval(progressInterval);
      timers.forEach(clearTimeout);
    };
  }, [visible]);

  return (
    <div className={`dr-report ${visible ? "dr-report-visible" : ""}`}>
      <div className="dr-report-header">
        <div className="dr-report-person">
          <span className="dr-report-avatar">AC</span>
          <div>
            <span className="dr-report-name">Alex Chen</span>
            <span className="dr-report-role">VP of Sales · Orion AI</span>
          </div>
        </div>
        <div className="dr-report-status">
          <div className="dr-progress-bar">
            <div className="dr-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="dr-progress-label">
            {progress < 100 ? "Researching 12 sources..." : "Report ready"}
          </span>
        </div>
      </div>
      <div className="dr-report-body">
        {REPORT_SECTIONS.map((section, i) => (
          <div
            key={i}
            className={`dr-sect ${i < visibleSections ? "dr-sect-visible" : ""}`}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <h4 className="dr-sect-title">{section.title}</h4>
            {section.lines && (
              <div className="dr-sect-text">
                {section.lines.map((line, j) => (
                  <p key={j}>{line}</p>
                ))}
              </div>
            )}
            {section.items && (
              <div className="dr-sect-items">
                {section.items.map((item, j) => (
                  <div key={j} className="dr-item">
                    <span className="dr-item-badge" style={{ background: `${item.color}15`, color: item.color }}>
                      {item.badge}
                    </span>
                    <span className="dr-item-text">{item.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DeepResearchSection() {
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
    <section className="dr-section" ref={sectionRef}>
      <div className="dr-content">
        <div className="dr-text">
          <h2>AI-powered intelligence on every prospect</h2>
          <p>
            12 sources. One report. Professional background, buying signals,
            pain points, and personalized outreach strategies — generated in minutes.
          </p>
        </div>
        <div className="dr-split">
          <ReportDemo visible={visible} />
          <div className="dr-art">
            <BinaryLogo
              shapePath={DOC_PATH}
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
