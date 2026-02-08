import Header from "./Header";
import Carousel from "./Carousel";

export default function Home() {
  return (
    <>
      <Header />
      <main className="snap-container">
        <div className="snap-page snap-page-hero">
          <section className="hero">
            <div className="container hero-content">
              <h1>The AI-Native GTM Operating System.</h1>
              <p className="subheadline">
                Automate outreach. Score leads instantly. Sync seamlessly.
              </p>
              <div className="cta-group">
                <a href="https://app.puffle.ai" className="btn btn-primary">
                  Get Started
                </a>
                <a href="https://zcal.co/i/BT5kddcb" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  Request Demo
                </a>
              </div>
            </div>
            <div className="hero-visual-container">
              <div className="automation-loop">
                <div className="loop-core"></div>
                <div className="loop-ring ring-outer">
                  <div className="particle"></div>
                  <div className="particle"></div>
                  <div className="particle"></div>
                  <div className="particle"></div>
                </div>
                <div className="loop-ring ring-inner"></div>
                <div className="scanner-line"></div>
              </div>
            </div>
          </section>

          <section className="social-proof">
            <div className="container">
              <p>Trusted by modern revenue teams</p>
              <div className="logos">
                <div className="logo-item" title="Acme Corp">
                  Acme Corp
                </div>
                <div className="logo-item" title="Globex">
                  Globex
                </div>
                <div className="logo-item" title="Soylent Corp">
                  Soylent Corp
                </div>
                <div className="logo-item" title="Initech">
                  Initech
                </div>
                <div className="logo-item" title="Umbrella Corp">
                  Umbrella Corp
                </div>
              </div>
            </div>
          </section>
        </div>

        <Carousel />

        <div className="snap-page snap-page-bottom">
          <section className="cta-section">
            <div className="container">
              <h2>Ready to scale your GTM?</h2>
              <p>
                Join thousands of companies using Puffle to accelerate growth.
              </p>
              <a href="https://zcal.co/i/BT5kddcb" target="_blank" rel="noopener noreferrer" className="btn btn-primary large">
                Book Demo
              </a>
            </div>
          </section>

          <footer>
            <div className="container footer-content">
              <div className="footer-col">
                <span className="footer-logo">Puffle</span>
                <p>&copy; 2025 Puffle Inc.</p>
              </div>
              <div className="footer-col">
                <h4>Product</h4>
                <ul>
                  <li>
                    <a href="#">Features</a>
                  </li>
                  <li>
                    <a href="#">Pricing</a>
                  </li>
                  <li>
                    <a href="#">Integrations</a>
                  </li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>Company</h4>
                <ul>
                  <li>
                    <a href="#">About Us</a>
                  </li>
                  <li>
                    <a href="#">Careers</a>
                  </li>
                  <li>
                    <a href="#">Blog</a>
                  </li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>Support</h4>
                <ul>
                  <li>
                    <a href="#">Help Center</a>
                  </li>
                  <li>
                    <a href="#">API Docs</a>
                  </li>
                  <li>
                    <a href="#">Contact</a>
                  </li>
                </ul>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}
