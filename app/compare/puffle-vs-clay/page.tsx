import type { Metadata } from "next";

import MarketingPage, { MarketingSection } from "../../MarketingPage";

const title = "Puffle vs. Clay";
const description =
  "Compare Puffle, an AI growth employee, with Clay's flexible data enrichment and workflow-building approach.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/compare/puffle-vs-clay" },
};

const faqs = [
  {
    question: "Is Puffle a replacement for Clay?",
    answer:
      "Not in every case. Choose Puffle when you want an opinionated agent to carry a GTM problem from strategy through lead research and outbound preparation. Choose Clay when your main need is building flexible data enrichment and workflow tables.",
  },
  {
    question: "Can a team use Puffle and Clay together?",
    answer:
      "Yes. A team can use Clay for custom data workflows and Puffle for the strategy, qualification, messaging, sender, and reply loop.",
  },
] as const;

export default function PuffleVsClayPage() {
  return (
    <MarketingPage
      eyebrow="Puffle vs. Clay"
      title="An AI growth employee or a flexible workflow builder?"
      description={description}
      canonicalPath="/compare/puffle-vs-clay"
      faqs={faqs}
    >
      <MarketingSection title="The short answer">
        <div className="content-prose">
          <p>
            Puffle is for teams that want an AI employee to reason from a growth
            goal to a strategy, qualified audience, and outbound campaign. Clay
            is for teams that want a flexible canvas for assembling data
            enrichment and GTM workflows.
          </p>
          <p>
            The products overlap around lead data and enrichment, but the default
            job is different. Puffle gives you an opinionated operating loop.
            Clay gives operators building blocks.
          </p>
        </div>
      </MarketingSection>

      <MarketingSection title="Side-by-side">
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
                <td>A company and GTM goal</td>
                <td>A data or workflow problem</td>
              </tr>
              <tr>
                <th scope="row">Default experience</th>
                <td>Agent proposes and executes a guided GTM plan</td>
                <td>Operator configures tables, data sources, and logic</td>
              </tr>
              <tr>
                <th scope="row">Strategy</th>
                <td>Built into the workflow</td>
                <td>Usually supplied by the operator</td>
              </tr>
              <tr>
                <th scope="row">Outbound</th>
                <td>Email and LinkedIn preparation tied to lead research</td>
                <td>Native email sequencer or connected sending tools</td>
              </tr>
              <tr>
                <th scope="row">Best fit</th>
                <td>Founder-led or lean GTM teams</td>
                <td>RevOps and growth teams building custom systems</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="content-source-note">
          Clay product facts checked against its official{" "}
          <a href="https://university.clay.com/docs/enrichments">enrichment</a>
          {" "}and{" "}
          <a href="https://university.clay.com/docs/email-sequencer">
            email sequencer
          </a>{" "}
          documentation on July 17, 2026.
        </p>
      </MarketingSection>
    </MarketingPage>
  );
}
