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
            <div className="hero-visual-container">
              <div className="automation-loop">
                <div className="loop-core"></div>
                <div className="loop-ring ring-outer">
                  <div className="particle">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="#ffffff"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </div>
                  <div className="particle">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="#ffffff"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </div>
                  <div className="particle">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="#FF4500"><path d="M12 0C5.373 0 0 5.373 0 12c0 3.314 1.343 6.314 3.515 8.485l-2.286 2.286C.775 23.225 1.097 24 1.738 24H12c6.627 0 12-5.373 12-12S18.627 0 12 0zm5.995 13.985c.04.218.06.441.06.665 0 3.396-3.951 6.15-8.828 6.15-4.877 0-8.828-2.754-8.828-6.15 0-.224.02-.447.06-.665A1.783 1.783 0 010 12.233c0-.988.806-1.794 1.794-1.794.442 0 .845.162 1.157.428 1.471-1.023 3.467-1.663 5.733-1.726l1.109-5.088.01-.042a.357.357 0 01.423-.275l3.608.78c.213-.452.672-.77 1.203-.77.731 0 1.324.593 1.324 1.324s-.593 1.324-1.324 1.324-1.324-.593-1.324-1.324l-.001-.065-3.164-.684-.978 4.487c2.2.094 4.126.736 5.56 1.734.314-.27.72-.435 1.165-.435.988 0 1.794.806 1.794 1.794 0 .673-.371 1.258-.919 1.567zm-11.3.542c0 .731.593 1.324 1.324 1.324s1.324-.593 1.324-1.324-.593-1.324-1.324-1.324-1.324.593-1.324 1.324zm7.396 2.603c-.065 0-.13-.025-.179-.074a.25.25 0 010-.354c.742-.742.742-2.557 0-3.299a.25.25 0 01.354-.354c.898.898.898 3.109 0 4.007a.25.25 0 01-.175.074zm-1.143-1.279c0-.731.593-1.324 1.324-1.324s1.324.593 1.324 1.324-.593 1.324-1.324 1.324-1.324-.593-1.324-1.324z"/></svg>
                  </div>
                  <div className="particle">
                    <img src="/crunchbase-logo.png" alt="Crunchbase" width="20" height="20" />
                  </div>
                </div>
                <div className="loop-ring ring-inner"></div>
                <div className="scanner-line"></div>
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
