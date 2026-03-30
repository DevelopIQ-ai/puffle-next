"use client";

import { useState, useEffect } from "react";
import AsciiPortrait from "./AsciiPortrait";

function EnrichmentCard({ visible }: { visible: boolean }) {
  const [visibleRows, setVisibleRows] = useState(0);

  const rows = [
    { label: "Name", value: "Alex Chen" },
    { label: "Role", value: "VP of Sales" },
    { label: "Company", value: "Orion AI" },
    { label: "Email", value: "alex@orion-ai.com" },
    { label: "LinkedIn", value: "/in/alexchen" },
    { label: "Phone", value: "+1 (415) 555-0142" },
    { label: "Location", value: "San Francisco, CA" },
  ];

  useEffect(() => {
    if (!visible) {
      setVisibleRows(0);
      return;
    }
    let current = 0;
    const interval = setInterval(() => {
      current++;
      setVisibleRows(current);
      if (current >= rows.length) clearInterval(interval);
    }, 400);
    return () => clearInterval(interval);
  }, [visible, rows.length]);

  return (
    <div className={`info-card ${visible ? "info-card-visible" : ""}`}>
      <div className="info-card-header">
        <span className="info-card-icon">👤</span>
        <span className="info-card-title">Contact Enrichment</span>
      </div>
      <div className="info-card-body">
        {rows.map((row, i) => (
          <div
            key={i}
            className={`enrichment-row ${i < visibleRows ? "enrichment-row-visible" : ""}`}
          >
            <span className="enrichment-row-label">{row.label}</span>
            <span className="enrichment-row-value">{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function IntentCard({ visible }: { visible: boolean }) {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (!visible) {
      setShowDetails(false);
      return;
    }
    const timer = setTimeout(() => setShowDetails(true), 600);
    return () => clearTimeout(timer);
  }, [visible]);

  return (
    <div className={`info-card ${visible ? "info-card-visible" : ""}`}>
      <div className="info-card-header">
        <span className="info-card-icon">🔔</span>
        <span className="info-card-title">Buying Signal</span>
      </div>
      <div className="info-card-body">
        <div className={`intent-signal ${showDetails ? "intent-signal-visible" : ""}`}>
          <div className="intent-signal-badge">Series A</div>
          <div className="intent-signal-text">
            Orion AI raised <strong>$25M Series A</strong>
          </div>
          <div className="intent-signal-source">via LinkedIn · 2 days ago</div>
        </div>
      </div>
    </div>
  );
}

export default function HeroVisual() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 1200),
      setTimeout(() => setStage(2), 5400),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="hero-visual-container">
      <AsciiPortrait
        src="/portrait.png"
        cols={80}
        color="25, 50, 120"
        intensity={1.4}
      />
      <div className="hero-visual-cards">
        <EnrichmentCard visible={stage >= 1} />
        <IntentCard visible={stage >= 2} />
      </div>
    </div>
  );
}
