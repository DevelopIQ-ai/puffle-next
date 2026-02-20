import Header from "../Header";

export default function Pricing() {
  return (
    <>
      <Header activePage="pricing" />
      <main className="pricing-page">
        <div className="container">
          <div className="pricing-header">
            <h1>Pricing</h1>
            <p className="pricing-subtitle">
              Choose the plan that fits your needs
            </p>
          </div>

          <div className="pricing-cards">
            <div className="pricing-card">
              <div className="pricing-card-header">
                <h2>Product Access</h2>
                <p className="pricing-description">
                  Full platform access for teams who want to run their own outbound
                </p>
              </div>
              <ul className="pricing-features">
                <li>
                  <span className="check">&#10003;</span>
                  Search leads across 10+ data sources
                </li>
                <li>
                  <span className="check">&#10003;</span>
                  Identify fully qualified leads
                </li>
                <li>
                  <span className="check">&#10003;</span>
                  Best-in-class lead enrichment
                </li>
                <li>
                  <span className="check">&#10003;</span>
                  Automated LinkedIn Outbound
                </li>
                <li>
                  <span className="check">&#10003;</span>
                  Automated email outbound
                </li>
                <li>
                  <span className="check">&#10003;</span>
                  LinkedIn post scheduler
                </li>
              </ul>
              <a href="https://app.puffle.ai" className="btn btn-secondary pricing-btn">
                Get Started
              </a>
            </div>

            <div className="pricing-card pricing-card-popular">
              <div className="popular-badge">Most Popular</div>
              <div className="pricing-card-header">
                <h2>Done For You</h2>
                <p className="pricing-description">
                  We handle everything while you focus on closing deals
                </p>
              </div>
              <ul className="pricing-features">
                <li>
                  <span className="check">&#10003;</span>
                  All in Product Access, plus
                </li>
                <li>
                  <span className="check">&#10003;</span>
                  Monthly strategy session
                </li>
                <li>
                  <span className="check">&#10003;</span>
                  Expert ICP analysis
                </li>
                <li>
                  <span className="check">&#10003;</span>
                  Custom data sources
                </li>
                <li>
                  <span className="check">&#10003;</span>
                  Channel optimization
                </li>
                <li>
                  <span className="check">&#10003;</span>
                  Fully managed service
                </li>
              </ul>
              <a href="https://zcal.co/i/BT5kddcb" target="_blank" rel="noopener noreferrer" className="btn btn-primary pricing-btn">
                Book Demo
              </a>
            </div>
          </div>
        </div>

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
      </main>
    </>
  );
}
