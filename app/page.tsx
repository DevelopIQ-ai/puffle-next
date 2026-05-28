import Header from "./Header";
import LeadFinderSection from "./LeadFinderSection";
import SignalsSection from "./SignalsSection";
import EnrichmentSection from "./EnrichmentSection";
import DeepResearchSection from "./DeepResearchSection";
import CampaignsSection from "./CampaignsSection";
import CtaSection from "./CtaSection";
import Footer from "./Footer";
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
          <Footer />
        </div>
      </main>
    </>
  );
}
