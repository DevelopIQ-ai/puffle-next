import type { Metadata } from "next";

import MarketingPage, {
  CardGrid,
  MarketingSection,
  StepList,
} from "../MarketingPage";

const title = "AI GTM Agent: Your AI Growth Employee";
const description =
  "Puffle is an AI growth employee powered by a GTM agent. It decides what growth work matters, discovers qualified leads, and prepares personalized outbound.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/ai-gtm-agent" },
};

const steps = [
  {
    title: "Understand the business",
    description:
      "Puffle learns your offer, market, customer, and current GTM objective from your company context.",
  },
  {
    title: "Find the next play",
    description:
      "It proposes focused strategies and explains the signal, audience, and reason each one could work.",
  },
  {
    title: "Build the audience",
    description:
      "It searches for relevant companies and people, then researches and qualifies them against the strategy.",
  },
  {
    title: "Prepare outbound",
    description:
      "It drafts personalized email and LinkedIn outreach for review before launch.",
  },
] as const;

const capabilities = [
  {
    title: "Strategy",
    description: "Turn an open-ended growth question into a concrete GTM play.",
  },
  {
    title: "Lead discovery",
    description: "Find people from company, hiring, role, and market signals.",
  },
  {
    title: "Research and qualification",
    description: "Explain why each lead fits instead of handing you a raw list.",
  },
  {
    title: "Personalized outbound",
    description: "Prepare relevant email and LinkedIn messages tied to the play.",
  },
  {
    title: "Sender operations",
    description: "Connect email, LinkedIn, and domains in the same workflow.",
  },
  {
    title: "Reply handling",
    description: "Keep conversations and next actions together in Unibox.",
  },
] as const;

const faqs = [
  {
    question: "What is an AI GTM agent?",
    answer:
      "An AI GTM agent is the technology behind an AI growth employee. It can reason across go-to-market steps such as choosing a strategy, finding the right people, researching them, and preparing outreach.",
  },
  {
    question: "Does Puffle send messages without approval?",
    answer:
      "No. Puffle prepares strategies, audiences, and outbound for review. You stay in control of what launches.",
  },
  {
    question: "Who is Puffle for?",
    answer:
      "Puffle is designed for founder-led teams and lean GTM teams that need to find customers without assembling and operating a large outbound stack.",
  },
] as const;

export default function AiGtmAgentPage() {
  return (
    <MarketingPage
      eyebrow="Growth agent"
      title="The agent behind your AI growth employee"
      description={description}
      canonicalPath="/ai-gtm-agent"
      faqs={faqs}
    >
      <MarketingSection
        title="How Puffle works"
        intro="The agent follows the growth problem from company context to an approved campaign."
      >
        <StepList items={steps} />
      </MarketingSection>
      <MarketingSection title="What the agent can do">
        <CardGrid items={capabilities} />
      </MarketingSection>
    </MarketingPage>
  );
}
