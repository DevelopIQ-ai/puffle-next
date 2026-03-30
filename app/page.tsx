import Header from "./Header";
import LeadFinderSection from "./LeadFinderSection";
import SignalsSection from "./SignalsSection";
import EnrichmentSection from "./EnrichmentSection";
import DeepResearchSection from "./DeepResearchSection";
import CampaignsSection from "./CampaignsSection";
import CtaSection from "./CtaSection";
import HeroVisual from "./HeroVisual";
import HeroBackground from "./HeroBackground";

export default function Home() {
  return (
    <>
      <Header />
      <main className="snap-container">
        <div className="snap-page snap-page-hero">
          <section className="hero hero-light">
            <HeroBackground />
            <div className="hero-split">
              <div className="hero-left">
                <h1>GTM Infrastructure<br />for AI Agents</h1>
                <p className="subheadline">AI agents that find leads, enrich contacts, track buying signals, and send personalized outreach across email and LinkedIn.</p>
                <div className="cta-group">
                  <a href="https://app.puffle.ai" className="btn btn-gradient">
                    Get Started
                  </a>
                  <a href="https://zcal.co/i/BT5kddcb" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                    Request Demo
                  </a>
                </div>
              </div>
              <div className="hero-right">
                <HeroVisual />
              </div>
            </div>
            <div className="hero-features">
              <span className="hero-feature-pill">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                Lead Finder
              </span>
              <span className="hero-feature-pill">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                Intent Signals
              </span>
              <span className="hero-feature-pill">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>
                Lists &amp; Enrichments
              </span>
              <span className="hero-feature-pill">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                Deep Research
              </span>
              <span className="hero-feature-pill">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                AI Campaigns
              </span>
              <span className="hero-feature-pill">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9" /></svg>
                Email &amp; LinkedIn Outreach
              </span>
              <span className="hero-feature-pill">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                AI Personalization
              </span>
            </div>
          </section>
        </div>

        <div className="snap-page">
          <LeadFinderSection />
        </div>

        <div className="snap-page">
          <SignalsSection />
        </div>

        <div className="snap-page">
          <EnrichmentSection />
        </div>

        <div className="snap-page">
          <DeepResearchSection />
        </div>

        <div className="snap-page">
          <CampaignsSection />
        </div>

        <div className="snap-page snap-page-bottom">
          <CtaSection />

          <footer>
            <div className="container footer-bar">
              <span className="footer-logo">Puffle</span>
              <span className="footer-copy">&copy; 2025 DevelopIQ Inc.</span>
              <div className="footer-links">
                <a href="/pricing">Pricing</a>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}
