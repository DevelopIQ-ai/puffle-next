"use client";

import { useRef, useState, useCallback, useEffect } from "react";

// Animated enrichment card - rows appear one by one with a typing effect
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

// Intent signal card - appears after enrichment, shows a buying signal
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

export default function PersonCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [stage, setStage] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  // stage 0 = just person, 1 = enrichment card, 2 = intent card

  // Preload the person SVG, then start animation
  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = "/person.svg";
  }, []);

  useEffect(() => {
    if (!imageLoaded) return;
    const timers = [
      setTimeout(() => setStage(1), 800),
      setTimeout(() => setStage(2), 5000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [imageLoaded]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = ((e.clientY - centerY) / rect.height) * -8;
    const y = ((e.clientX - centerX) / rect.width) * 8;
    setRotation({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setRotation({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={containerRef}
      className="person-card-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="person-card-inner"
        style={{
          transform: `perspective(800px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        {/* The 3D person */}
        <img
          src="/person.svg"
          alt="3D person illustration"
          className={`person-card-figure ${imageLoaded ? "person-card-figure-visible" : ""}`}
        />

        {/* Animated cards stacked */}
        <div className="person-card-stack">
          <EnrichmentCard visible={stage >= 1} />
          <IntentCard visible={stage >= 2} />
        </div>
      </div>
    </div>
  );
}
