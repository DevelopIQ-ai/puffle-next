"use client";

import { useState, useEffect, useRef } from "react";
import BinaryLogo from "./BinaryLogo";

// Magnifying glass path (viewBox 0 0 24 24)
const SEARCH_PATH =
  "M 10 2 C 5.589 2 2 5.589 2 10 C 2 14.411 5.589 18 10 18 C 11.846 18 13.543 17.365 14.897 16.312 L 20.293 21.707 C 20.488 21.902 20.744 22 21 22 C 21.256 22 21.512 21.902 21.707 21.707 C 22.098 21.316 22.098 20.684 21.707 20.293 L 16.312 14.897 C 17.365 13.543 18 11.846 18 10 C 18 5.589 14.411 2 10 2 Z M 10 4 C 13.309 4 16 6.691 16 10 C 16 13.309 13.309 16 10 16 C 6.691 16 4 13.309 4 10 C 4 6.691 6.691 4 10 4 Z";

const LEADS = [
  { name: "Sarah Kim", role: "VP of Sales", company: "Orion AI", score: 94 },
  { name: "James Park", role: "Head of Growth", company: "NovaByte", score: 91 },
  { name: "Maria Santos", role: "CRO", company: "Helios Labs", score: 88 },
  { name: "David Chen", role: "Director of BD", company: "Atlas Cloud", score: 85 },
  { name: "Emily Zhang", role: "VP of Marketing", company: "Prism Data", score: 82 },
  { name: "Alex Rivera", role: "Head of Sales", company: "Flux Systems", score: 79 },
  { name: "Lisa Patel", role: "GTM Lead", company: "Vertex AI", score: 76 },
];

const FILTERS = [
  { label: "Job Title", values: ["VP of Sales", "Head of Growth", "CRO"] },
  { label: "Seniority", values: ["Director", "VP", "C-Suite"] },
  { label: "Company Size", values: ["50-200", "200-1000"] },
  { label: "Industry", values: ["SaaS", "AI/ML"] },
  { label: "Location", values: ["United States"] },
];

function FilterPanel({ animating }: { animating: boolean }) {
  const [activeFilters, setActiveFilters] = useState<number[]>([]);

  useEffect(() => {
    if (!animating) {
      setActiveFilters([]);
      return;
    }
    const timers = FILTERS.map((_, i) =>
      setTimeout(() => setActiveFilters((prev) => [...prev, i]), 400 + i * 300)
    );
    return () => timers.forEach(clearTimeout);
  }, [animating]);

  return (
    <div className="lf-filters">
      <div className="lf-filters-header">
        <span className="lf-filters-title">Filters</span>
        <span className="lf-filter-count">
          {activeFilters.length > 0 ? `${activeFilters.length} active` : ""}
        </span>
      </div>
      <div className="lf-filters-body">
        {FILTERS.map((filter, i) => (
          <div
            key={i}
            className={`lf-filter-group ${activeFilters.includes(i) ? "lf-filter-active" : ""}`}
          >
            <span className="lf-filter-label">{filter.label}</span>
            <div className="lf-filter-tags">
              {filter.values.map((val, j) => (
                <span
                  key={j}
                  className={`lf-tag ${activeFilters.includes(i) ? "lf-tag-visible" : ""}`}
                  style={{ transitionDelay: `${j * 100}ms` }}
                >
                  {val}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className={`lf-search-btn ${activeFilters.length === FILTERS.length ? "lf-search-btn-ready" : ""}`}>
        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        Find Leads
      </div>
    </div>
  );
}

function ResultsTable({ visible }: { visible: boolean }) {
  const [visibleRows, setVisibleRows] = useState(0);

  useEffect(() => {
    if (!visible) {
      setVisibleRows(0);
      return;
    }
    let current = 0;
    const interval = setInterval(() => {
      current++;
      setVisibleRows(current);
      if (current >= LEADS.length) clearInterval(interval);
    }, 200);
    return () => clearInterval(interval);
  }, [visible]);

  return (
    <div className={`lf-results ${visible ? "lf-results-visible" : ""}`}>
      <div className="lf-results-header">
        <span className="lf-results-count">
          {visible ? `${visibleRows} of ${LEADS.length} leads` : ""}
        </span>
        <span className={`lf-results-badge ${visibleRows === LEADS.length ? "lf-results-badge-visible" : ""}`}>
          + Add to List
        </span>
      </div>
      <div className="lf-table">
        <div className="lf-table-head">
          <span className="lf-col lf-col-name">Name</span>
          <span className="lf-col lf-col-role">Role</span>
          <span className="lf-col lf-col-company">Company</span>
          <span className="lf-col lf-col-score">Score</span>
        </div>
        {LEADS.map((lead, i) => (
          <div
            key={i}
            className={`lf-table-row ${i < visibleRows ? "lf-row-visible" : ""}`}
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <span className="lf-col lf-col-name">
              <span className="lf-avatar">{lead.name.split(" ").map(n => n[0]).join("")}</span>
              {lead.name}
            </span>
            <span className="lf-col lf-col-role">{lead.role}</span>
            <span className="lf-col lf-col-company">{lead.company}</span>
            <span className="lf-col lf-col-score">
              <span className={`lf-score ${lead.score >= 90 ? "lf-score-high" : lead.score >= 80 ? "lf-score-mid" : "lf-score-low"}`}>
                {lead.score}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LeadFinderSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [animating, setAnimating] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimating(true);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!animating) return;
    const timer = setTimeout(() => setShowResults(true), FILTERS.length * 300 + 800);
    return () => clearTimeout(timer);
  }, [animating]);

  return (
    <section className="lf-section" ref={sectionRef}>
      <div className="lf-content">
        <div className="lf-text">
          <h2>Find your next 1,000 customers</h2>
          <p>
            Set your filters once. AI scores every lead by fit, intent, and timing — so you only talk to people ready to buy.
          </p>
        </div>
        <div className="lf-split">
          <div className="lf-art">
            <BinaryLogo
              shapePath={SEARCH_PATH}
              pathSize={24}
              color="25, 50, 120"
              intensity={1.2}
              cols={50}
            />
          </div>
          <div className="lf-demo">
            <FilterPanel animating={animating} />
            <ResultsTable visible={showResults} />
          </div>
        </div>
      </div>
    </section>
  );
}
