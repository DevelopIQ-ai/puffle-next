import Header from "./Header";
import Carousel from "./Carousel";
import LeadPipeline from "./LeadPipeline";

export default function Home() {
  return (
    <>
      <Header />
      <main className="snap-container">
        <div className="snap-page snap-page-hero">
          <section className="hero">
            <div className="hero-centered">
              <div className="hero-text">
                <h1>The AI-Native GTM Operating System</h1>
                <p className="subheadline">
                  One platform for all your outreach
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
              <div className="hero-visual">
                <LeadPipeline />
              </div>
            </div>
          </section>

          {/* <section className="social-proof">
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
          </section> */}
        </div>

        <Carousel />

        <div className="snap-page snap-page-bottom">
          <section className="compare-section">
            <div className="container">
              <h2>One tool, not five.</h2>
              <p className="compare-sub">Other platforms do one thing. Puffle does it all.</p>
              <div className="compare-table-wrap">
                <table className="compare-table">
                  <thead>
                    <tr>
                      <th></th>
                      <th className="compare-highlight">
                        <div className="compare-brand">
                          <img src="/puffle-logo.svg" alt="Puffle" width="28" height="28" />
                          <span>Puffle</span>
                        </div>
                      </th>
                      <th>
                        <div className="compare-brand">
                          <img src="/apollo-logo.png" alt="Apollo" width="28" height="28" className="compare-logo" />
                          <span>Apollo</span>
                        </div>
                      </th>
                      <th>
                        <div className="compare-brand">
                          <div className="compare-brand-pair">
                            <img src="/dripify-logo.png" alt="Dripify" width="22" height="22" className="compare-logo" />
                            <img src="/lemlist-logo.png" alt="Lemlist" width="22" height="22" className="compare-logo" />
                          </div>
                          <span>Dripify / Lemlist</span>
                        </div>
                      </th>
                      <th>
                        <div className="compare-brand">
                          <div className="compare-brand-pair">
                            <img src="/smartlead-logo.png" alt="Smartlead" width="22" height="22" className="compare-logo" />
                            <img src="/instantly-logo.png" alt="Instantly" width="22" height="22" className="compare-logo" />
                          </div>
                          <span>Smartlead / Instantly</span>
                        </div>
                      </th>
                      <th>
                        <div className="compare-brand">
                          <img src="/clay-logo.png" alt="Clay" width="28" height="28" className="compare-logo" />
                          <span>Clay</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="compare-feature">Lead sourcing</td>
                      <td className="compare-highlight compare-yes">&#10003;</td>
                      <td className="compare-yes">&#10003;</td>
                      <td className="compare-no">&#10007;</td>
                      <td className="compare-no">&#10007;</td>
                      <td className="compare-partial">~</td>
                    </tr>
                    <tr>
                      <td className="compare-feature">AI lead scoring</td>
                      <td className="compare-highlight compare-yes">&#10003;</td>
                      <td className="compare-partial">~</td>
                      <td className="compare-no">&#10007;</td>
                      <td className="compare-no">&#10007;</td>
                      <td className="compare-no">&#10007;</td>
                    </tr>
                    <tr>
                      <td className="compare-feature">Email sequences</td>
                      <td className="compare-highlight compare-yes">&#10003;</td>
                      <td className="compare-yes">&#10003;</td>
                      <td className="compare-yes">&#10003;</td>
                      <td className="compare-yes">&#10003;</td>
                      <td className="compare-no">&#10007;</td>
                    </tr>
                    <tr>
                      <td className="compare-feature">LinkedIn automation</td>
                      <td className="compare-highlight compare-yes">&#10003;</td>
                      <td className="compare-no">&#10007;</td>
                      <td className="compare-yes">&#10003;</td>
                      <td className="compare-no">&#10007;</td>
                      <td className="compare-no">&#10007;</td>
                    </tr>
                    <tr>
                      <td className="compare-feature">Data enrichment</td>
                      <td className="compare-highlight compare-yes">&#10003;</td>
                      <td className="compare-partial">~</td>
                      <td className="compare-no">&#10007;</td>
                      <td className="compare-no">&#10007;</td>
                      <td className="compare-yes">&#10003;</td>
                    </tr>
                    <tr>
                      <td className="compare-feature">AI personalization</td>
                      <td className="compare-highlight compare-yes">&#10003;</td>
                      <td className="compare-partial">~</td>
                      <td className="compare-partial">~</td>
                      <td className="compare-partial">~</td>
                      <td className="compare-no">&#10007;</td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
                    <a href="/pricing">Pricing</a>
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
