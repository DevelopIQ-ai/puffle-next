import Header from "./Header";
import LeadFinderSection from "./LeadFinderSection";
import SignalsSection from "./SignalsSection";
import EnrichmentSection from "./EnrichmentSection";
import CampaignsSection from "./CampaignsSection";
import CtaSection from "./CtaSection";
import HeroVisual from "./HeroVisual";
import HeroBackground from "./HeroBackground";
import GtmStackSection from "./GtmStackSection";

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
                <h1>AI Go-to-Market Engineer.</h1>
                <p className="subheadline">
                  Describe a GTM workflow, and Puffle will bring it to life.
                </p>
                <div className="cta-group">
                  <a href="https://zcal.co/i/BT5kddcb" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    Book a Demo
                  </a>
                </div>
              </div>
              <div className="hero-right">
                <HeroVisual />
              </div>
            </div>
          </section>
        </div>

        <div className="snap-page">
          <GtmStackSection />
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
                <a href="https://app.termly.io/policy-viewer/policy.html?policyUUID=a66fefbe-11ff-441f-9d4c-42bbd48daf82" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                <a href="https://app.termly.io/policy-viewer/policy.html?policyUUID=53c9b308-2fea-4556-b207-9bb50dcd2f16" target="_blank" rel="noopener noreferrer">Terms of Service</a>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}
