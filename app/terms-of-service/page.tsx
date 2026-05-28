import type { Metadata } from "next";
import LegalPolicyPage from "../LegalPolicyPage";
import { legalPolicies } from "../legalPolicies";

export const metadata: Metadata = {
  title: "Terms of Service | Puffle",
  alternates: {
    canonical: legalPolicies.terms.route,
  },
};

export default function TermsOfServicePage() {
  return <LegalPolicyPage policy={legalPolicies.terms} />;
}
