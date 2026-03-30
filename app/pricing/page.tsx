import Header from "../Header";

export default function Pricing() {
  return (
    <>
      <Header activePage="pricing" />
      <main className="pricing-page">
        <div className="pricing-container">
          <h1 className="pricing-title">Simple, transparent pricing</h1>
          <p className="pricing-subtitle">
            Start free. Upgrade when you need more power.
          </p>

          <div className="pricing-cards">
            {/* Free Tier */}
            <div className="pricing-card">
              <div className="pricing-card-top">
                <h3 className="pricing-tier-label">Free</h3>
                <div className="pricing-price">
                  <span className="pricing-amount">$0</span>
                </div>
                <p className="pricing-note">1,000 one-time credits to get started</p>
              </div>

              <a href="https://app.puffle.ai" className="btn btn-outline pricing-btn">
                Get Started
              </a>

              <div className="pricing-features">
                <p className="pricing-features-label">Includes</p>
                {[
                  "1,000 credits (no reset)",
                  "Lead search & import",
                  "AI enrichment columns",
                  "LinkedIn & email campaigns",
                  "Signal detection",
                  "Unified inbox",
                  "1 connected account",
                ].map((feature) => (
                  <div key={feature} className="pricing-feature">
                    <svg className="pricing-check" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pro Tier */}
            <div className="pricing-card pricing-card-pro">
              <div className="pricing-badge">Most Popular</div>
              <div className="pricing-card-top">
                <h3 className="pricing-tier-label pricing-tier-pro">Pro</h3>
                <div className="pricing-price">
                  <span className="pricing-amount">$750</span>
                  <span className="pricing-period">/month</span>
                </div>
                <p className="pricing-note">20,000 credits/month, resets monthly</p>
              </div>

              <a href="https://app.puffle.ai" className="btn btn-gradient pricing-btn">
                Upgrade to Pro
              </a>

              <div className="pricing-features">
                <p className="pricing-features-label">Everything in Free, plus</p>
                {[
                  "20,000 credits/month",
                  "Deep Research reports (40 cr each)",
                  "Unlimited enrichment columns",
                  "Company & person news enrichment",
                  "Contact info lookup (email + phone)",
                  "Advanced signal sources",
                  "Unlimited connected accounts",
                  "Priority support",
                ].map((feature) => (
                  <div key={feature} className="pricing-feature">
                    <svg className="pricing-check pricing-check-pro" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Enterprise Tier */}
            <div className="pricing-card pricing-card-enterprise">
              <div className="pricing-card-top">
                <h3 className="pricing-tier-label">Enterprise</h3>
                <div className="pricing-price">
                  <span className="pricing-amount">Custom</span>
                </div>
                <p className="pricing-note">Custom credits, dedicated support</p>
              </div>

              <a href="https://zcal.co/i/BT5kddcb" target="_blank" rel="noopener noreferrer" className="btn btn-outline-muted pricing-btn">
                Contact Sales
              </a>

              <div className="pricing-features">
                <p className="pricing-features-label">Everything in Pro, plus</p>
                {[
                  "Custom credit volume",
                  "Partner API access",
                  "Dedicated account manager",
                  "Custom integrations",
                  "SSO & advanced security",
                  "SLA guarantees",
                  "Bulk Deep Research",
                  "Webhook delivery (Svix)",
                ].map((feature) => (
                  <div key={feature} className="pricing-feature">
                    <svg className="pricing-check" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Credit Cost Breakdown */}
          <div className="credits-section">
            <h2 className="credits-title">What credits get you</h2>
            <p className="credits-subtitle">Every action has a transparent credit cost</p>

            <div className="credits-grid">
              {[
                { action: "Find a lead", cost: "1" },
                { action: "Import a lead", cost: "1" },
                { action: "Email lookup", cost: "2" },
                { action: "Phone lookup", cost: "8" },
                { action: "LinkedIn scrape", cost: "1" },
                { action: "Company news", cost: "4" },
                { action: "Person news", cost: "4" },
                { action: "AI enrichment", cost: "1" },
                { action: "AI message", cost: "2" },
                { action: "Site crawl", cost: "2" },
                { action: "Agent search", cost: "10" },
                { action: "Deep Research", cost: "40" },
              ].map((item) => (
                <div key={item.action} className="credit-item">
                  <span className="credit-action">{item.action}</span>
                  <span className="credit-cost">{item.cost} cr</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <footer>
          <div className="container footer-bar">
            <span className="footer-logo">Puffle</span>
            <span className="footer-copy">&copy; 2025 DevelopIQ Inc.</span>
            <div className="footer-links">
              <a href="/pricing">Pricing</a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
