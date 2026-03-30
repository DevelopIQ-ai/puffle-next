"use client";

import { useState, useEffect, useRef } from "react";
import BinaryLogo from "./BinaryLogo";

// Three sparkles icon path (viewBox 0 0 32 32)
const SPARKLE_PATH =
  "M 18 4 C 18 4 19.2 9.5 21.5 11.8 C 23.8 14.1 28 13.5 28 13.5 C 28 13.5 23.8 12.9 21.5 15.2 C 19.2 17.5 18 23 18 23 C 18 23 16.8 17.5 14.5 15.2 C 12.2 12.9 8 13.5 8 13.5 C 8 13.5 12.2 14.1 14.5 11.8 C 16.8 9.5 18 4 18 4 Z M 7 3 C 7 3 7.5 5.5 8.3 6.3 C 9.1 7.1 11 6.8 11 6.8 C 11 6.8 9.1 6.5 8.3 7.3 C 7.5 8.1 7 10.5 7 10.5 C 7 10.5 6.5 8.1 5.7 7.3 C 4.9 6.5 3 6.8 3 6.8 C 3 6.8 4.9 7.1 5.7 6.3 C 6.5 5.5 7 3 7 3 Z M 8 21 C 8 21 8.4 23 9.1 23.7 C 9.8 24.4 11.5 24.2 11.5 24.2 C 11.5 24.2 9.8 24 9.1 24.7 C 8.4 25.4 8 27.5 8 27.5 C 8 27.5 7.6 25.4 6.9 24.7 C 6.2 24 4.5 24.2 4.5 24.2 C 4.5 24.2 6.2 24.4 6.9 23.7 C 7.6 23 8 21 8 21 Z";

const COLUMNS = ["Name", "Email", "Phone", "Company", "Seniority", "Pain Points"];

const ROWS = [
  { name: "Sarah Kim", email: "sarah@orion-ai.com", phone: "+1 (415) 555-0142", company: "Orion AI", seniority: "VP", painPoints: "Manual outreach" },
  { name: "James Park", email: "james@novabyte.io", phone: "+1 (212) 555-0198", company: "NovaByte", seniority: "Director", painPoints: "Low reply rates" },
  { name: "Maria Santos", email: "maria@helioslabs.com", phone: "+1 (512) 555-0267", company: "Helios Labs", seniority: "C-Suite", painPoints: "No intent data" },
  { name: "David Chen", email: "david@atlascloud.dev", phone: "+1 (206) 555-0334", company: "Atlas Cloud", seniority: "Director", painPoints: "Tool sprawl" },
  { name: "Emily Zhang", email: "emily@prismdata.co", phone: "+1 (617) 555-0411", company: "Prism Data", seniority: "VP", painPoints: "Stale CRM data" },
];

const ENRICHMENT_SOURCES = [
  "Apollo", "FullEnrich", "LinkedIn", "Firecrawl", "Claude AI", "BrightData"
];

function SpreadsheetDemo({ visible }: { visible: boolean }) {
  const [filledCols, setFilledCols] = useState(0);
  const [checkedSources, setCheckedSources] = useState(0);

  useEffect(() => {
    if (!visible) {
      setFilledCols(0);
      setCheckedSources(0);
      return;
    }
    // Animate columns filling in left to right
    const colTimers = COLUMNS.map((_, i) =>
      setTimeout(() => setFilledCols(i + 1), 600 + i * 400)
    );
    // Animate sources being checked
    const sourceTimers = ENRICHMENT_SOURCES.map((_, i) =>
      setTimeout(() => setCheckedSources(i + 1), 400 + i * 350)
    );
    return () => {
      colTimers.forEach(clearTimeout);
      sourceTimers.forEach(clearTimeout);
    };
  }, [visible]);

  return (
    <div className={`enr-demo ${visible ? "enr-demo-visible" : ""}`}>
      <div className="enr-spreadsheet">
        <div className="enr-sheet-header">
          <span className="enr-sheet-title">Lead List</span>
          <span className="enr-sheet-tabs">
            <span className="enr-sheet-tab enr-sheet-tab-active">People</span>
            <span className="enr-sheet-tab">Companies</span>
          </span>
        </div>
        <div className="enr-table-wrap">
          <div className="enr-table">
            <div className="enr-table-head">
              {COLUMNS.map((col, i) => (
                <span
                  key={i}
                  className={`enr-th ${i < filledCols ? "enr-th-filled" : ""}`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  {col}
                </span>
              ))}
            </div>
            {ROWS.map((row, ri) => (
              <div key={ri} className="enr-table-row">
                {Object.values(row).map((val, ci) => (
                  <span
                    key={ci}
                    className={`enr-td ${ci < filledCols ? "enr-td-filled" : ""}`}
                    style={{ transitionDelay: `${ci * 80 + ri * 60}ms` }}
                  >
                    {ci < filledCols ? val : ""}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="enr-sources">
        <span className="enr-sources-title">Enrichment Sources</span>
        {ENRICHMENT_SOURCES.map((source, i) => (
          <div
            key={i}
            className={`enr-source-row ${i < checkedSources ? "enr-source-checked" : ""}`}
          >
            <span className={`enr-source-check ${i < checkedSources ? "enr-source-check-done" : ""}`}>
              {i < checkedSources ? "✓" : ""}
            </span>
            <span className="enr-source-name">{source}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function EnrichmentSection() {
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
    <section className="enr-section" ref={sectionRef}>
      <div className="enr-content">
        <div className="enr-text">
          <h2>Your data, enriched automatically</h2>
          <p>
            30+ enrichment types from 9 data sources. Email, phone, seniority,
            pain points, tech stack — filled in automatically across every row.
          </p>
        </div>
        <div className="enr-split">
          <div className="enr-art">
            <BinaryLogo
              shapePath={SPARKLE_PATH}
              pathSize={32}
              color="25, 50, 120"
              intensity={1.2}
              cols={50}
            />
          </div>
          <SpreadsheetDemo visible={visible} />
        </div>
      </div>
    </section>
  );
}
