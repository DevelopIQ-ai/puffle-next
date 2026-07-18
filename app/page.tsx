import type { Metadata } from "next";
import Link from "next/link";

import Header from "./Header";
import Footer from "./Footer";
import HeroDoodles from "./HeroDoodles";
import HeroLeadForm from "./HeroLeadForm";
import JsonLd from "./JsonLd";
import { CORE_WORKFLOW, SITE_DESCRIPTION, SITE_URL, WAITLIST_URL } from "./site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/#product`,
  name: "Puffle",
  alternateName: "Puffle AI Growth Hire",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  featureList: [
    "Growth strategy",
    "Market research",
    "Lead discovery and qualification",
    "Email and LinkedIn outbound preparation",
    "Sender and reply operations",
  ],
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
                Puffle is your AI growth hire: an AI employee that learns your
                company, decides what growth work matters next, and turns it into
                strategies, qualified leads, and personalized outbound.
              </p>
            </div>
          </div>
        </section>

        <section className="home-proof-section" aria-labelledby="home-workflow-title">
          <div className="container home-proof-grid">
            <div className="home-proof-copy">
              <p className="content-eyebrow">The employee in charge of growth</p>
              <h2 id="home-workflow-title">From growth goal to approved campaign</h2>
              <p>
                Give Puffle a goal. It works the strategy, research, audience,
                and campaign that normally get split across five different tools.
                You review the important decisions before anything launches.
              </p>
              <div className="content-actions">
                <Link className="btn btn-primary large" href="/how-it-works">
                  See how your growth hire works
                </Link>
                <Link className="content-text-link" href={WAITLIST_URL}>
                  Join the waitlist
                </Link>
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
