import type { Metadata } from "next";

import MarketingPage, {
  CardGrid,
  MarketingSection,
  StepList,
} from "../MarketingPage";

const title = "AI Outbound Automation";
const description =
  "Puffle connects lead discovery, research, personalization, sender setup, and reply handling for email and LinkedIn outbound.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/outbound-automation" },
};

const steps = [
  {
    title: "Anchor outreach to a strategy",
    description:
      "Every audience starts with a reason to reach out, not an arbitrary contact filter.",
  },
  {
    title: "Research and qualify each person",
    description:
      "Puffle gathers the context needed to explain fit and support a relevant message.",
  },
  {
    title: "Prepare personalized sequences",
    description:
      "Draft email and LinkedIn messages around the signal and your offer, then review them before launch.",
  },
  {
    title: "Run the operating loop",
    description:
      "Manage senders and keep replies and follow-up work together instead of losing context between tools.",
  },
] as const;

const channels = [
  {
    title: "Email",
    description:
      "Connect inboxes and domains, prepare sequences, and keep outbound tied to the underlying lead research.",
  },
  {
    title: "LinkedIn",
    description:
      "Prepare LinkedIn outreach alongside email so both channels share the same strategy and lead context.",
  },
  {
    title: "Unibox",
    description:
      "Bring replies into one place so the team can see conversations and decide the next action.",
  },
] as const;

const faqs = [
  {
    question: "What makes Puffle different from a sequencer?",
    answer:
      "A sequencer executes a list and message flow. Puffle starts earlier: it helps choose the strategy, find and qualify the audience, and prepare the messages before sender execution.",
  },
  {
    question: "Does Puffle support email and LinkedIn?",
    answer:
      "Yes. Puffle prepares personalized outbound across email and LinkedIn and keeps the work connected to its strategy and lead context.",
  },
] as const;

export default function OutboundAutomationPage() {
  return (
    <MarketingPage
      eyebrow="Outbound automation"
      title="Outbound that starts with a reason, not a list"
      description={description}
      canonicalPath="/outbound-automation"
      faqs={faqs}
    >
      <MarketingSection title="The Puffle outbound loop">
        <StepList items={steps} />
      </MarketingSection>
      <MarketingSection title="One context across every channel">
        <CardGrid items={channels} />
      </MarketingSection>
    </MarketingPage>
  );
}
