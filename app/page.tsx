import type { Metadata } from "next";
import Image from "next/image";

import Footer from "./Footer";
import Header from "./Header";
import HeroLeadForm from "./HeroLeadForm";
import JsonLd from "./JsonLd";
import { SITE_DESCRIPTION, SITE_URL } from "./site";

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
            <Image
              className="sauna-home-logo"
              src="/puffle-logo.png"
              alt=""
              width={72}
              height={72}
              priority
            />
            <h1>Your AI growth hire.</h1>
            <p className="sauna-home-dek">
              Drop in your company. Puffle will show you what it can do.
            </p>
            <HeroLeadForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
