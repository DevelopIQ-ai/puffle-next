import type { Metadata } from "next";

import LegalPage, { PRIVACY_POLICY } from "../legal-content";

export const metadata: Metadata = {
  title: "Privacy Policy | Puffle",
  description:
    "Puffle Privacy Policy for websites, applications, and services.",
};

export default async function PrivacyPage() {
  return <LegalPage policy={PRIVACY_POLICY} />;
}
