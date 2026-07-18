import type { Metadata } from "next";
import Link from "next/link";

import Header from "./Header";
import Footer from "./Footer";
import HeroDoodles from "./HeroDoodles";
import HeroLeadForm from "./HeroLeadForm";
import JsonLd from "./JsonLd";
import { APP_URL, CORE_WORKFLOW, SITE_DESCRIPTION, SITE_URL } from "./site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/#product`,
  name: "Puffle",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: APP_URL,
  description: SITE_DESCRIPTION,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free plan with 200 one-time fresh leads",
  },
};

export default function Home() {
  return (
    <>
      <JsonLd data={productSchema} />
      <Header />
      <main className="home-page">
        <section className="hero hero-light">
          <HeroDoodles />
          <div className="hero-split">
            <div className="hero-left">
              <h1>
                <span className="headline-line">
                  Puffle finds <em>hidden</em> ways
                </span>
                <span className="headline-line">to get you customers</span>
              </h1>
              <p className="subheadline">See what it finds for you</p>
              <HeroLeadForm />
              <p className="hero-explainer">
                Puffle is an AI GTM operator for founder-led teams. It turns your
                company context into focused strategies, qualified leads, and
                personalized outbound across email and LinkedIn.
              </p>
            </div>
          </div>
        </section>

        <section className="home-proof-section" aria-labelledby="home-workflow-title">
          <div className="container home-proof-grid">
            <div className="home-proof-copy">
              <p className="content-eyebrow">One operating loop</p>
              <h2 id="home-workflow-title">From GTM question to approved campaign</h2>
              <p>
                Puffle does the research and preparation work that normally gets
                split across strategy docs, lead tools, enrichers, and sequencers.
                You review the plan before anything launches.
              </p>
              <div className="content-actions">
                <Link className="btn btn-primary large" href="/how-it-works">
                  See how it works
                </Link>
                <a className="content-text-link" href={APP_URL}>
                  Try Puffle free
                </a>
              </div>
            </div>
            <ol className="home-workflow-list">
              {CORE_WORKFLOW.map((step, index) => (
                <li key={step}>
                  <span>{index + 1}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
