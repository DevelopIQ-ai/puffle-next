import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import GrowthEmployeePreview from "./GrowthEmployeePreview";
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
      <main className="home-page">
        <section className="figment-home">
          <Link className="figment-home-brand" href="/" aria-label="Puffle home">
            Puffle
          </Link>

          <div className="figment-home-hero">
            <Image
              className="figment-home-mark"
              src="/puffle-logo.svg"
              alt=""
              width={82}
              height={82}
              priority
            />
            <h1>
              Puffle finds <em>hidden</em> ways<br className="figment-desktop-break" /> to get you customers.
            </h1>
            <p className="figment-home-prompt">See what it finds for you</p>
            <HeroLeadForm />
            <Link className="figment-home-waitlist" href={WAITLIST_URL}>
              Join the waitlist
            </Link>
          </div>

          <div className="figment-home-product">
            <GrowthEmployeePreview />
          </div>
        </section>
      </main>
    </>
  );
}
