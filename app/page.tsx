import Header from "./Header";
import SignalsSection from "./SignalsSection";
import CampaignsSection from "./CampaignsSection";
import Footer from "./Footer";
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
                <h1>Your AI GTM sidekick.</h1>
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
          <SignalsSection />
        </div>

        <div className="snap-page snap-page-bottom">
          <CampaignsSection />
          <Footer />
        </div>
      </main>
    </>
  );
}
