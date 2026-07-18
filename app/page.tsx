import type { Metadata } from "next";
import Link from "next/link";

import Header from "./Header";
import HeroLeadForm from "./HeroLeadForm";
import JsonLd from "./JsonLd";
import { SITE_DESCRIPTION, SITE_URL, WAITLIST_URL } from "./site";

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
        <section className="sauna-home-hero">
          <div className="sauna-home-copy">
            <h1>Your AI growth hire.</h1>
            <p className="sauna-home-dek">
              Puffle finds the hidden ways to get you customers.
            </p>
            <p className="sauna-home-prompt">See what it finds for your company</p>
            <HeroLeadForm />
            <Link className="sauna-home-waitlist" href={WAITLIST_URL}>
              Join the waitlist
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
