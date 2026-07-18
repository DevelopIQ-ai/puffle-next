import type { Metadata } from "next";

import MarketingPage, { CardGrid, MarketingSection } from "../MarketingPage";

const title = "About Puffle";
const description =
  "Puffle is an AI GTM operator built in San Francisco for founder-led teams that need a repeatable path from strategy to outbound.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
};

const principles = [
  {
    title: "Start with the company",
    description:
      "Puffle learns what you sell, who it is for, and what makes a lead worth pursuing before it recommends a play.",
  },
  {
    title: "Make strategy executable",
    description:
      "A useful strategy should turn into a real audience, researched people, and messages a founder can approve.",
  },
  {
    title: "Keep humans in control",
    description:
      "Puffle prepares the work and keeps it organized. You review the strategy and outbound before launch.",
  },
] as const;

export default function AboutPage() {
  return (
    <MarketingPage
      eyebrow="About Puffle"
      title="A GTM operator for teams that cannot afford a fragmented stack"
      description={description}
      canonicalPath="/about"
    >
      <MarketingSection title="What Puffle is">
        <div className="content-prose">
          <p>
            Puffle is software for founder-led go-to-market. It turns company
            context into focused growth strategies, finds and qualifies the right
            people, and prepares personalized outreach across email and LinkedIn.
          </p>
          <p>
            The product is built by DevelopIQ Inc. in San Francisco. The goal is
            simple: give a small team one operating loop for finding customers
            instead of a collection of disconnected research, data, and sending
            tools.
          </p>
        </div>
      </MarketingSection>
      <MarketingSection title="How we think about GTM">
        <CardGrid items={principles} />
      </MarketingSection>
    </MarketingPage>
  );
}
