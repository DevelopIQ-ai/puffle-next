"use client";

import AsciiPortrait from "./AsciiPortrait";

export default function CtaSection() {
  return (
    <section className="cta-section">
      <div className="cta-bg" aria-hidden="true">
        <AsciiPortrait
          src="/colosseum.png"
          cols={200}
          color="190, 182, 168"
          intensity={0.55}
        />
      </div>
      <div className="cta-inner">
        <h2>Start automating your pipeline</h2>
        <p>
          One platform for lead discovery, intent signals, enrichment, research,
          and multi-channel outreach.
        </p>
        <div className="cta-group">
          <a href="https://app.puffle.ai" className="btn btn-gradient">
            Get Started
          </a>
          <a
            href="https://zcal.co/i/BT5kddcb"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            Request Demo
          </a>
        </div>
      </div>
    </section>
  );
}
