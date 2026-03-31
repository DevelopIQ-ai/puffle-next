"use client";

import { useRef, useState, useCallback, useEffect } from "react";

function BuyingSignalCard({ visible }: { visible: boolean }) {
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
          <div className="intent-signal-badge">Funding</div>
          <div className="intent-signal-text">
            Orion AI raised <strong>$25M Series A</strong>
          </div>
          <div className="intent-signal-source">via LinkedIn · 2 days ago</div>
        </div>
      </div>
    </div>
  );
}

function IdentifyProspectCard({ visible }: { visible: boolean }) {
  const [showCheck, setShowCheck] = useState(false);

  useEffect(() => {
    if (!visible) {
      setShowCheck(false);
      return;
    }
    const timer = setTimeout(() => setShowCheck(true), 500);
    return () => clearTimeout(timer);
  }, [visible]);

  return (
    <div className={`info-card ${visible ? "info-card-visible" : ""}`}>
      <div className="info-card-header">
        <span className="info-card-icon">🔍</span>
        <span className="info-card-title">Identify Prospect</span>
      </div>
      <div className="info-card-body">
        <div className={`pipeline-step-row ${showCheck ? "pipeline-step-row-visible" : ""}`}>
          <span className="pipeline-check">✓</span>
          <span className="pipeline-step-text"><strong>Alex Chen</strong> at <strong>Orion AI</strong></span>
        </div>
      </div>
    </div>
  );
}

function EnrichLeadCard({ visible }: { visible: boolean }) {
  const [visibleRows, setVisibleRows] = useState(0);

  const rows = [
    { label: "Name", value: "Alex Chen" },
    { label: "Role", value: "VP of Sales" },
    { label: "Company", value: "Orion AI" },
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
        <span className="info-card-icon">📋</span>
        <span className="info-card-title">Enrich Lead</span>
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

function TriggerOutboundCard({ visible }: { visible: boolean }) {
  const [visibleRows, setVisibleRows] = useState(0);

  const steps = [
    { icon: "✉️", text: "Personalized email sent" },
    { icon: "💼", text: "LinkedIn follow-up scheduled" },
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
      if (current >= steps.length) clearInterval(interval);
    }, 600);
    return () => clearInterval(interval);
  }, [visible, steps.length]);

  return (
    <div className={`info-card ${visible ? "info-card-visible" : ""}`}>
      <div className="info-card-header">
        <span className="info-card-icon">🚀</span>
        <span className="info-card-title">Trigger Outbound Sequence</span>
      </div>
      <div className="info-card-body">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`pipeline-step-row ${i < visibleRows ? "pipeline-step-row-visible" : ""}`}
          >
            <span className="pipeline-step-icon">{step.icon}</span>
            <span className="pipeline-step-text">{step.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PersonCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [stage, setStage] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = "/person.svg";
  }, []);

  useEffect(() => {
    if (!imageLoaded) return;
    const timers = [
      setTimeout(() => setStage(1), 800),
      setTimeout(() => setStage(2), 2600),
      setTimeout(() => setStage(3), 4400),
      setTimeout(() => setStage(4), 6200),
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
        <img
          src="/person.svg"
          alt="3D person illustration"
          className={`person-card-figure ${imageLoaded ? "person-card-figure-visible" : ""}`}
        />

        <div className="person-card-stack">
          <BuyingSignalCard visible={stage >= 1} />
          <IdentifyProspectCard visible={stage >= 2} />
          <EnrichLeadCard visible={stage >= 3} />
          <TriggerOutboundCard visible={stage >= 4} />
        </div>
      </div>
    </div>
  );
}
