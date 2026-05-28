import Footer from "../Footer";
import Header from "../Header";

type PricingPlan = {
  name: string;
  price: string;
  period?: string;
  note: string;
  badge?: string;
  cardClassName?: string;
  tierClassName?: string;
  buttonClassName: string;
  checkClassName?: string;
  cta: string;
  featuresLabel: string;
  features: string[];
};

const plans: PricingPlan[] = [
  {
    name: "Free",
    price: "$0",
    note: "5,000 credits, one-time",
    buttonClassName: "btn btn-outline pricing-btn",
    cta: "Book a Demo",
    featuresLabel: "Includes",
    features: [
      "Try out the platform",
      "All 7 data sources",
      "Lead search and enrichment",
      "AI message generation",
    ],
  },
  {
    name: "Starter",
    price: "$179",
    period: "/mo",
    note: "18,000 credits/month",
    buttonClassName: "btn btn-outline pricing-btn",
    cta: "Book a Demo",
    featuresLabel: "Includes",
    features: [
      "For founders trying intent-based GTM",
      "All 7 data sources",
      "3-day free trial",
      "Deep research + signal scans",
    ],
  },
  {
    name: "Pro",
    price: "$499",
    period: "/mo",
    note: "60,000 credits/month",
    badge: "Most Popular",
    cardClassName: "pricing-card-pro",
    tierClassName: "pricing-tier-pro",
    buttonClassName: "btn btn-primary pricing-btn",
    checkClassName: "pricing-check-pro",
    cta: "Book a Demo",
    featuresLabel: "Includes",
    features: [
      "For sales teams running intent-based GTM",
      "20% better $/credit than Starter",
      "All 7 data sources",
      "3-day free trial",
    ],
  },
  {
    name: "Enterprise",
    price: "$2,499",
    period: "/mo",
    note: "400,000 credits/month",
    cardClassName: "pricing-card-enterprise",
    buttonClassName: "btn btn-outline-muted pricing-btn",
    cta: "Contact Sales",
    featuresLabel: "Includes",
    features: [
      "For established sales orgs",
      "37% better $/credit than Starter",
      "Manual rescans + white-glove custom types",
      "Priority support",
    ],
  },
] as const satisfies PricingPlan[];

const coinCosts = [
  { action: "Find person", cost: "1" },
  { action: "Import lead", cost: "1" },
  { action: "Work email lookup", cost: "2" },
  { action: "Mobile phone lookup", cost: "8" },
  { action: "LinkedIn profile", cost: "1" },
  { action: "LinkedIn posts", cost: "1" },
  { action: "Company news", cost: "4" },
  { action: "Person news", cost: "4" },
  { action: "Hiring status", cost: "1" },
  { action: "Website enrichment", cost: "1" },
  { action: "Site crawl enrichment", cost: "4" },
  { action: "Custom AI enrichment", cost: "1" },
  { action: "Custom web enrichment", cost: "1" },
  { action: "AI message generation", cost: "2" },
  { action: "Agent search", cost: "10" },
  { action: "Search continuation", cost: "5" },
  { action: "Signals subscription", cost: "1" },
  { action: "News signal keyword", cost: "100" },
] as const;

export default function Pricing() {
  return (
    <>
      <Header activePage="pricing" />
      <main className="pricing-page">
        <div className="pricing-container">
          <h1 className="pricing-title">Pricing</h1>
          <p className="pricing-subtitle">
            Start with 5,000 credits. Upgrade when you need monthly volume.
          </p>

          <div className="pricing-cards">
            {plans.map((plan) => (
              <div key={plan.name} className={`pricing-card ${plan.cardClassName ?? ""}`}>
                {plan.badge ? <div className="pricing-badge">{plan.badge}</div> : null}
                <div className="pricing-card-top">
                  <h3 className={`pricing-tier-label ${plan.tierClassName ?? ""}`}>{plan.name}</h3>
                  <div className="pricing-price">
                    <span className="pricing-amount">{plan.price}</span>
                    {plan.period ? <span className="pricing-period">{plan.period}</span> : null}
                  </div>
                  <p className="pricing-note">{plan.note}</p>
                </div>

                <a href="https://zcal.co/i/BT5kddcb" target="_blank" rel="noopener noreferrer" className={plan.buttonClassName}>
                  {plan.cta}
                </a>

                <div className="pricing-features">
                  <p className="pricing-features-label">{plan.featuresLabel}</p>
                  {plan.features.map((feature) => (
                    <div key={feature} className="pricing-feature">
                      <svg className={`pricing-check ${plan.checkClassName ?? ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="credits-section">
            <h2 className="credits-title">What credits get you</h2>
            <p className="credits-subtitle">Every action has a transparent credit cost</p>

            <div className="credits-grid">
              {coinCosts.map((item) => (
                <div key={item.action} className="credit-item">
                  <span className="credit-action">{item.action}</span>
                  <span
                    className="credit-cost"
                    aria-label={`${item.cost} ${item.cost === "1" ? "credit" : "credits"}`}
                  >
                    <span>{item.cost}</span>
                    <img className="credit-coin" src="/coin.png" alt="" aria-hidden="true" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
