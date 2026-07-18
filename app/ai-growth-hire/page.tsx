import type { Metadata } from "next";
import Link from "next/link";

import MarketingPage, {
  CardGrid,
  MarketingSection,
  StepList,
} from "../MarketingPage";

const title = "Puffle, Your AI Growth Employee";
const description =
  "Give Puffle your company and a goal. It finds the next move, the right people, and an outbound campaign ready for your approval.";

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
    question: "What is an AI growth employee?",
    answer:
      "An AI growth employee is an AI employee responsible for moving a company's growth goal forward. It combines judgment and execution across strategy, research, lead discovery, qualification, and campaign preparation.",
  },
  {
    question: "Is an AI growth employee the same as a growth agent?",
    answer:
      "A growth agent describes the technology. AI growth employee describes the role it plays: a persistent operator across strategy, research, leads, and campaigns.",
  },
  {
    question: "Does Puffle replace founder judgment?",
    answer:
      "No. The founder sets direction and approves important boundaries such as launching outbound. Puffle handles the research and execution between those decisions.",
  },
  {
    question: "What does Puffle do after I add my company?",
    answer:
      "Puffle learns what you sell, who should care, and the growth goal you are trying to reach. It then recommends the next growth work, researches the relevant market and people, qualifies an audience, and prepares an outbound campaign for review.",
  },
  {
    question: "Can Puffle run email and LinkedIn outbound?",
    answer:
      "Puffle prepares personalized email and LinkedIn outbound from its research. You review the strategy and approve outbound before anything launches.",
  },
  {
    question: "Who is Puffle for, and who is it not for?",
    answer:
      "Puffle is for founders and lean GTM teams that need a growth generalist but do not want to assemble a fragmented research, data, and outbound stack. It is not for teams looking only for a self-service enrichment table or a fully autonomous system that sends without review.",
  },
] as const;

export default function AiGrowthHirePage() {
  return (
    <MarketingPage
      eyebrow="Puffle"
      title="Your AI growth employee."
      description={description}
      canonicalPath="/ai-growth-hire"
      faqs={faqs}
    >
      <MarketingSection
        title="What Puffle does next."
        intro="Your company and goal become a focused plan, the right audience, and outbound ready for approval."
      >
        <StepList items={workflow} />
      </MarketingSection>
      <MarketingSection
        title="Puffle or a Clay outbound stack?"
        intro="Choose Puffle when you want a persistent operator to carry the GTM problem forward. Choose Clay when you want to build and configure the system yourself."
      >
        <div className="content-table-wrap">
          <table className="content-comparison-table">
            <thead>
              <tr>
                <th scope="col">Question</th>
                <th scope="col">Puffle</th>
                <th scope="col">Clay</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Starting point</th>
                <td>A company and a growth goal</td>
                <td>A data or workflow problem</td>
              </tr>
              <tr>
                <th scope="row">Default work</th>
                <td>Decides, researches, qualifies, and prepares outbound</td>
                <td>Lets an operator configure enrichment and GTM workflows</td>
              </tr>
              <tr>
                <th scope="row">Best fit</th>
                <td>Founder-led and lean GTM teams</td>
                <td>Teams building their own custom systems</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="content-source-note">
          <Link href="/compare/puffle-vs-clay">Read the full Puffle vs. Clay comparison.</Link>
        </p>
      </MarketingSection>
      <MarketingSection title="What your AI growth employee owns">
        <CardGrid items={capabilities} />
      </MarketingSection>
    </MarketingPage>
  );
}
