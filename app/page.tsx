import type { Metadata } from "next";
import Footer from "./Footer";
import Header from "./Header";
import JsonLd from "./JsonLd";
import PuffleLanding from "./PuffleLanding";
import { SITE_DESCRIPTION, SITE_URL } from "./site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/#product`,
  name: "Puffle",
  alternateName: "Puffle AI Growth Employee",
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
      <PuffleLanding />
      <Footer />
    </>
  );
}
