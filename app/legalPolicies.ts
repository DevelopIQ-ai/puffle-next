import { privacyPolicyHtml, termsOfServiceHtml } from "./legalContent";

export const legalRoutes = {
  privacy: "/privacy",
  terms: "/terms-of-service",
} as const;

export const legalPolicies = {
  privacy: {
    title: "Privacy Policy",
    route: legalRoutes.privacy,
    contentHtml: privacyPolicyHtml,
  },
  terms: {
    title: "Terms of Service",
    route: legalRoutes.terms,
    contentHtml: termsOfServiceHtml,
  },
} as const;

export type LegalPolicy = (typeof legalPolicies)[keyof typeof legalPolicies];
