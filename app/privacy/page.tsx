import type { Metadata } from "next";
import LegalPolicyPage from "../LegalPolicyPage";
import { legalPolicies } from "../legalPolicies";

export const metadata: Metadata = {
  title: "Privacy Policy | Puffle",
  alternates: {
    canonical: legalPolicies.privacy.route,
  },
};

export default function PrivacyPage() {
  return <LegalPolicyPage policy={legalPolicies.privacy} />;
}
