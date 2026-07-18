import type { Metadata } from "next";

import MarketingPage, {
  CardGrid,
  MarketingSection,
  StepList,
} from "../MarketingPage";

const title = "AI Growth Hire for Founder-Led Teams";
const description =
  "Puffle is the AI growth hire: an AI employee that learns your company and growth goal, decides what work matters next, and executes it.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/ai-growth-hire" },
};

const workflow = [
  {
    title: "Learn the company",
    description:
      "Puffle learns what you sell, who should care, what has worked, and the growth goal you are trying to reach.",
  },
  {
    title: "Decide what matters next",
    description:
      "It turns an open-ended goal into focused growth plays and explains why each one is worth pursuing.",
  },
  {
    title: "Do the research",
    description:
      "It investigates markets, companies, people, hiring activity, and other signals instead of handing the work back to you.",
  },
  {
    title: "Turn the work into campaigns",
    description:
      "It builds qualified audiences and prepares personalized email and LinkedIn outbound tied to the strategy.",
  },
  {
    title: "Stop at the real boundary",
    description:
      "Puffle keeps the work moving, but you review the strategy and approve outbound before anything launches.",
  },
] as const;

const capabilities = [
  {
    title: "Growth judgment",
    description:
      "Choose the next useful growth play from the company context and current goal.",
  },
  {
    title: "Market research",
    description:
      "Find non-obvious audiences and signals across companies, people, roles, and markets.",
  },
  {
    title: "Lead discovery",
    description:
      "Build and qualify a real audience instead of stopping at a strategy document.",
  },
  {
    title: "Campaign preparation",
    description:
      "Turn the research into personalized email and LinkedIn outbound for approval.",
  },
  {
    title: "Sender operations",
    description:
      "Keep email, LinkedIn, domains, and the campaign context in one workflow.",
  },
  {
    title: "Reply follow-through",
    description:
      "Bring replies and next actions together so the growth loop does not end at send.",
  },
] as const;

const faqs = [
  {
    question: "What is an AI growth hire?",
    answer:
      "An AI growth hire is an AI employee responsible for moving a company's growth goal forward. It combines judgment and execution across strategy, research, lead discovery, qualification, and campaign preparation.",
  },
  {
    question: "Is an AI growth hire the same as a growth agent?",
    answer:
      "A growth agent describes the technology. AI growth hire describes the role it plays: a persistent operator across strategy, research, leads, and campaigns.",
  },
  {
    question: "Does Puffle replace founder judgment?",
    answer:
      "No. The founder sets direction and approves important boundaries such as launching outbound. Puffle handles the research and execution between those decisions.",
  },
  {
    question: "Who should hire Puffle?",
    answer:
      "Puffle is for founders and lean teams that need a growth generalist but do not want to assemble a fragmented research, data, and outbound stack.",
  },
] as const;

export default function AiGrowthHirePage() {
  return (
    <MarketingPage
      eyebrow="AI growth hire"
      title="Meet your AI growth hire"
      description={description}
      canonicalPath="/ai-growth-hire"
      faqs={faqs}
    >
      <MarketingSection
        title="Give it a goal. Get back completed growth work."
        intro="Puffle behaves like a growth generalist, not a collection of disconnected AI features."
      >
        <StepList items={workflow} />
      </MarketingSection>
      <MarketingSection title="What your AI growth hire owns">
        <CardGrid items={capabilities} />
      </MarketingSection>
    </MarketingPage>
  );
}
