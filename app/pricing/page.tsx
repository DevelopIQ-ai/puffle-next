import type { Metadata } from "next";

import Footer from "../Footer";
import Header from "../Header";
import JsonLd from "../JsonLd";
import { CONTACT_EMAIL, SITE_URL, WAITLIST_URL } from "../site";

const title = "Pricing";
const description =
  "Join the waitlist for Puffle, your AI growth employee. Plans begin with 200 fresh leads and scale with your growth motion.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/pricing" },
};

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
  href: string;
  featuresLabel: string;
  features: string[];
};

const plans: PricingPlan[] = [
  {
    name: "Free",
    price: "$0",
    note: "200 fresh leads, one-time",
    buttonClassName: "btn btn-outline pricing-btn",
    cta: "Join the waitlist",
    href: WAITLIST_URL,
    featuresLabel: "Includes",
    features: [
      "AI growth strategies",
      "Lead discovery and qualification",
      "Personalized outbound preparation",
      "No credit card required",
    ],
  },
  {
    name: "Starter",
    price: "$100",
    period: "/mo",
    note: "1,000 fresh leads/month",
    buttonClassName: "btn btn-outline pricing-btn",
    cta: "Join the waitlist",
    href: WAITLIST_URL,
    featuresLabel: "Includes",
    features: [
      "Everything in Free",
      "Recurring monthly lead volume",
      "Email and LinkedIn preparation",
      "Sender and reply workflows",
    ],
  },
  {
    name: "Pro",
    price: "$250",
    period: "/mo",
    note: "5,000 fresh leads/month",
    badge: "Most Popular",
    cardClassName: "pricing-card-pro",
    tierClassName: "pricing-tier-pro",
    buttonClassName: "btn btn-primary pricing-btn",
    checkClassName: "pricing-check-pro",
    cta: "Join the waitlist",
    href: WAITLIST_URL,
    featuresLabel: "Includes",
    features: [
      "Everything in Starter",
      "5x Starter lead volume",
      "Multi-channel outbound workflows",
      "For higher-volume GTM motion",
    ],
  },
  {
    name: "Custom",
    price: "Let's talk",
    note: "Volume and workflow tailored to your team",
    cardClassName: "pricing-card-enterprise",
    buttonClassName: "btn btn-outline-muted pricing-btn",
    cta: "Contact Sales",
    href: `mailto:${CONTACT_EMAIL}`,
    featuresLabel: "Includes",
    features: [
      "Custom lead volume",
      "Team-specific GTM workflows",
      "Implementation support",
      "Direct support",
    ],
  },
] as const satisfies PricingPlan[];

const pricingSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Puffle",
  description,
  url: `${SITE_URL}/pricing`,
  offers: plans.slice(0, 3).map((plan) => ({
    "@type": "Offer",
    name: plan.name,
    price: plan.price.replace("$", ""),
    priceCurrency: "USD",
    url: `${SITE_URL}/pricing`,
  })),
};

export default function Pricing() {
  return (
    <>
      <JsonLd data={pricingSchema} />
      <Header />
      <main className="pricing-page">
        <div className="pricing-container">
          <h1 className="pricing-title">Pricing</h1>
          <p className="pricing-subtitle">
            Join the waitlist. We&apos;ll let you know when access opens.
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

                <a href={plan.href} className={plan.buttonClassName}>
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

          <p className="pricing-footnote">
            Fresh leads are newly discovered and qualified people attached to a
            Puffle strategy. Contact us for custom volume or workflow needs.
          </p>
        </div>

        <Footer />
      </main>
    </>
  );
}
