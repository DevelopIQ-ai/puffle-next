import type { Metadata } from "next";

import MarketingPage, { CardGrid, MarketingSection } from "../MarketingPage";

const title = "Founder-Led GTM Software";
const description =
  "Puffle helps founders turn market knowledge into focused growth strategies, qualified leads, and personalized outbound without building a large GTM stack.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/founder-led-gtm" },
};

const jobs = [
  {
    title: "Pressure-test a market",
    description:
      "Explore a new segment or trigger and turn the thesis into a concrete list of people to contact.",
  },
  {
    title: "Find non-obvious buyers",
    description:
      "Look beyond static job titles by using company, hiring, role, and market context as signals.",
  },
  {
    title: "Launch without a stack project",
    description:
      "Move from an idea to researched leads and outbound without stitching together separate data and sequencing tools.",
  },
] as const;

const faqs = [
  {
    question: "What is founder-led GTM?",
    answer:
      "Founder-led GTM is a go-to-market motion where founders stay close to positioning, customer discovery, selling, and early distribution. It is common before a company has a large specialized GTM team.",
  },
  {
    question: "Can Puffle replace a sales team?",
    answer:
      "Puffle handles research, strategy preparation, lead discovery, qualification, and outbound preparation. Founders still provide judgment, approve campaigns, and handle important sales conversations.",
  },
] as const;

export default function FounderLedGtmPage() {
  return (
    <MarketingPage
      eyebrow="Founder-led GTM"
      title="Keep founder judgment. Lose the manual GTM busywork."
      description={description}
      canonicalPath="/founder-led-gtm"
      faqs={faqs}
    >
      <MarketingSection
        title="Built for the early GTM loop"
        intro="Founders usually know more about the customer than any tool. Puffle makes that knowledge executable."
      >
        <CardGrid items={jobs} />
      </MarketingSection>
      <MarketingSection title="The boundary is deliberate">
        <div className="content-prose">
          <p>
            Puffle does not replace founder judgment. It compresses the work
            between a GTM idea and a campaign you are comfortable launching.
          </p>
          <p>
            You choose the direction, review the strategy, and approve outbound.
            Puffle handles the repetitive research and preparation underneath it.
          </p>
        </div>
      </MarketingSection>
    </MarketingPage>
  );
}
