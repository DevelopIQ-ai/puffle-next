import { redirect } from "next/navigation";
import { legalRoutes } from "../legalPolicies";

export default function PrivacyPolicyRedirect() {
  redirect(legalRoutes.privacy);
}
