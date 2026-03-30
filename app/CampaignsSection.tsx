"use client";

import { useState, useEffect, useRef } from "react";
import BinaryLogo from "./BinaryLogo";

// Chat bubble icon path (viewBox 0 0 24 24)
const CHAT_PATH =
  "M 21 12 C 21 16.418 16.97 20 12 20 C 10.558 20 9.194 19.71 7.968 19.192 L 3 21 L 4.395 17.28 C 3.512 16.042 3 14.574 3 13 C 3 8.582 7.03 5 12 5 C 16.97 5 21 8.582 21 13 Z";

const SEQUENCE_STEPS = [
  { day: "Day 1", type: "linkedin", label: "Connection Request", icon: "in", note: "Hi Alex — saw Orion AI just closed their Series A. Would love to connect." },
  { day: "Day 3", type: "email", label: "Intro Email", icon: "✉", note: "Subject: Scaling outbound after Series A" },
  { day: "Day 5", type: "linkedin", label: "Follow-up Message", icon: "in", note: "Thanks for connecting! Curious how you're thinking about outbound tooling..." },
  { day: "Day 8", type: "ai", label: "AI Personalized Email", icon: "✦", note: "Dynamically references recent LinkedIn activity + funding news" },
];

function SequenceDemo({ visible }: { visible: boolean }) {
  const [visibleSteps, setVisibleSteps] = useState(0);

  useEffect(() => {
    if (!visible) {
      setVisibleSteps(0);
      return;
    }
    const timers = SEQUENCE_STEPS.map((_, i) =>
      setTimeout(() => setVisibleSteps(i + 1), 600 + i * 500)
    );
    return () => timers.forEach(clearTimeout);
  }, [visible]);

  return (
    <div className={`camp-demo ${visible ? "camp-demo-visible" : ""}`}>
      <div className="camp-demo-header">
        <span className="camp-demo-title">Outreach Sequence</span>
        <span className="camp-demo-badge">4 steps · LinkedIn + Email</span>
      </div>
      <div className="camp-timeline">
        {SEQUENCE_STEPS.map((step, i) => (
          <div key={i}>
            <div
              className={`camp-step ${visibleSteps > i ? "camp-step-visible" : ""}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="camp-step-left">
                <span className="camp-step-day">{step.day}</span>
                <div className={`camp-step-dot camp-step-dot-${step.type}`}>
                  <span className="camp-step-icon">{step.icon}</span>
                </div>
              </div>
              <div className="camp-step-card">
                <div className="camp-step-card-header">
                  <span className={`camp-step-type camp-step-type-${step.type}`}>{step.label}</span>
                </div>
                <p className="camp-step-note">{step.note}</p>
              </div>
            </div>
            {i < SEQUENCE_STEPS.length - 1 && (
              <div className={`camp-connector ${visibleSteps > i ? "camp-connector-visible" : ""}`}>
                <div className="camp-connector-line" />
                {i === 0 && <span className="camp-connector-label">If accepted</span>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CampaignsSection() {
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
    <section className="camp-section" ref={sectionRef}>
      <div className="camp-content">
        <div className="camp-text">
          <h2>Personalized outreach at scale</h2>
          <p>
            Multi-channel sequences across LinkedIn and email. Every touchpoint
            timed, personalized with AI, and tracked automatically.
          </p>
        </div>
        <div className="camp-split">
          <div className="camp-art">
            <BinaryLogo
              shapePath={CHAT_PATH}
              pathSize={24}
              color="25, 50, 120"
              intensity={1.2}
              cols={50}
            />
          </div>
          <SequenceDemo visible={visible} />
        </div>
      </div>
    </section>
  );
}
