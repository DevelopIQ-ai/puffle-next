import type { Metadata } from "next";

import MarketingPage, {
  CardGrid,
  MarketingSection,
  StepList,
} from "../MarketingPage";

const title = "How Puffle Works";
const description =
  "See how your AI growth hire turns company context into growth strategies, qualified leads, personalized outbound, and organized replies.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/how-it-works" },
};

const workflow = [
  {
    title: "Add your company context",
    description:
      "Give Puffle your company, market, customer, offer, and the growth problem you are trying to solve.",
  },
  {
    title: "Review proposed strategies",
    description:
      "Puffle identifies focused ways to reach customers and explains the audience and signal behind each strategy.",
  },
  {
    title: "Build and qualify the lead set",
    description:
      "Puffle searches relevant sources, researches people, and shows why each lead fits the strategy.",
  },
  {
    title: "Review personalized outbound",
    description:
      "The agent prepares email and LinkedIn messages grounded in the lead research and your offer.",
  },
  {
    title: "Approve launch and handle replies",
    description:
      "Connect senders, approve what goes live, and keep conversations and next actions organized in Unibox.",
  },
] as const;

const surfaces = [
  {
    title: "Dashboard",
    description: "See proposed GTM strategies and the work attached to each one.",
  },
  {
    title: "Outbound",
    description: "Review lead research, audiences, and personalized campaigns.",
  },
  {
    title: "Unibox",
    description: "Keep replies from active campaigns and next steps in one place.",
  },
  {
    title: "Senders",
    description: "Manage connected email, LinkedIn, and domain infrastructure.",
  },
] as const;

export default function HowItWorksPage() {
  return (
    <MarketingPage
      eyebrow="How it works"
      title="Your AI growth hire follows the work from goal to reply"
      description={description}
      canonicalPath="/how-it-works"
    >
      <MarketingSection
        title="The five-step loop"
        intro="A founder sets direction and reviews important decisions. Puffle handles the growth work between them."
      >
        <StepList items={workflow} />
      </MarketingSection>
      <MarketingSection title="The product surfaces">
        <CardGrid items={surfaces} />
      </MarketingSection>
    </MarketingPage>
  );
}
