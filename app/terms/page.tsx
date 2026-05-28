import type { Metadata } from "next";

import LegalPage, { TERMS_POLICY } from "../legal-content";

export const metadata: Metadata = {
  title: "Terms of Service | Puffle",
  description:
    "Puffle Terms of Service for websites, applications, and services.",
};

export default async function TermsPage() {
  return <LegalPage policy={TERMS_POLICY} />;
}
