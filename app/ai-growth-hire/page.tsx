import type { Metadata } from "next";
import Link from "next/link";

import Footer from "../Footer";
import Header from "../Header";
import JsonLd from "../JsonLd";
import { SITE_NAME, SITE_URL, WAITLIST_URL } from "../site";

const title = "Puffle, Your AI Growth Employee";
const description =
  "Give Puffle a growth goal. It finds the opportunity, creates the work, and keeps the next move moving across research, LinkedIn, email, and content.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/ai-growth-hire" },
};

const capabilities = [
  {
    number: "01",
    title: "Find the opening",
    description:
      "Read your company context, map the market, and surface the customer, signal, or moment worth acting on.",
    outputs: ["Market research", "ICP refinement", "Hiring and company signals"],
  },
  {
    number: "02",
    title: "Build the audience",
    description:
      "Turn a growth play into a researched list of accounts and the specific people who should hear from you.",
    outputs: ["Target accounts", "Decision makers", "Why each one fits"],
  },
  {
    number: "03",
    title: "Write the email",
    description:
      "Create sequences that start from the buyer, the trigger, and a point of view—not a generic template.",
    outputs: ["Personalized emails", "Sequences", "Follow-ups"],
  },
  {
    number: "04",
    title: "Work LinkedIn",
    description:
      "Research people, prepare connection notes and DMs, and keep a focused LinkedIn motion tied to the same play.",
    outputs: ["Profile research", "Connection notes", "LinkedIn messages"],
  },
  {
    number: "05",
    title: "Make the content",
    description:
      "Turn the same market insight into founder posts and sharp angles that make the outbound feel earned.",
    outputs: ["Founder posts", "Content angles", "Proof points"],
  },
  {
    number: "06",
    title: "Keep the loop alive",
    description:
      "Bring campaign context, replies, and learnings together so the next experiment starts from what happened.",
    outputs: ["Campaign review", "Replies", "Next experiments"],
  },
] as const;

const exampleOutputs = [
  {
    label: "Research",
    title: "48 companies with a real reason to care",
    detail: "Signals, buyer context, and a clear explanation of fit.",
  },
  {
    label: "Outbound",
    title: "A ready-to-review email + LinkedIn motion",
    detail: "Personalized first touches and the follow-ups that make the play coherent.",
  },
  {
    label: "Content",
    title: "Founder posts that reinforce the same point of view",
    detail: "Useful ideas to publish, not a separate content calendar to manage.",
  },
] as const;

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: title,
  description,
  url: `${SITE_URL}/ai-growth-hire`,
  isPartOf: {
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  },
};

export default function AiGrowthHirePage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <Header />
      <main className="growth-hire-page">
        <section className="growth-hire-hero">
          <div className="growth-hire-hero-inner">
            <div className="growth-hire-copy">
              <p className="growth-hire-eyebrow">Puffle / your AI growth hire</p>
              <h1>One growth goal. Everything to run it.</h1>
              <p className="growth-hire-lede">
                Puffle turns a goal into the research, people, emails, LinkedIn
                messages, and posts that move it forward.
              </p>
              <div className="growth-hire-actions">
                <Link className="growth-hire-primary" href={WAITLIST_URL}>
                  See Puffle in action
                </Link>
                <Link className="growth-hire-secondary" href="#capabilities">
                  Explore the work <span aria-hidden="true">↓</span>
                </Link>
              </div>
              <p className="growth-hire-channel-line">
                Research <span>•</span> Email <span>•</span> LinkedIn <span>•</span>{" "}
                Posts <span>•</span> Campaigns <span>•</span> Replies
              </p>
            </div>

            <div className="growth-hire-workspace" aria-label="Example Puffle growth workspace">
              <div className="growth-hire-workspace-bar">
                <span className="growth-hire-workspace-brand">
                  <i aria-hidden="true" /> Puffle
                </span>
                <span className="growth-hire-status"><b /> Growth run active</span>
              </div>
              <div className="growth-hire-goal-card">
                <p>THIS WEEK&apos;S GOAL</p>
                <h2>Start conversations with the right design partners.</h2>
                <span>Audience: founders building B2B developer tools</span>
              </div>
              <div className="growth-hire-workspace-grid">
                <div className="growth-hire-queue">
                  <div className="growth-hire-panel-heading">
                    <span>Growth queue</span>
                    <span>4 ready</span>
                  </div>
                  <ul>
                    <li className="is-done"><b>✓</b> Find the accounts with an active trigger</li>
                    <li className="is-done"><b>✓</b> Research founders and their current point of view</li>
                    <li><b>3</b> Write the email sequence</li>
                    <li><b>4</b> Prepare LinkedIn notes and founder posts</li>
                  </ul>
                </div>
                <div className="growth-hire-output-panel">
                  <div className="growth-hire-panel-heading">
                    <span>Ready for review</span>
                    <span className="growth-hire-spark">✦</span>
                  </div>
                  <div className="growth-hire-output-card growth-hire-output-card-email">
                    <p>Email sequence</p>
                    <strong>3 personal first touches</strong>
                    <span>Drafted from company signals</span>
                  </div>
                  <div className="growth-hire-output-card growth-hire-output-card-linkedin">
                    <p>LinkedIn</p>
                    <strong>12 notes + 2 founder posts</strong>
                    <span>Same audience, same point of view</span>
                  </div>
                </div>
              </div>
              <div className="growth-hire-workspace-footer">
                <span>Next: review the play, then launch what feels right.</span>
                <b>Founder stays in control</b>
              </div>
            </div>
          </div>
        </section>

        <section className="growth-hire-intro" id="capabilities">
          <div>
            <p className="growth-hire-eyebrow">What Puffle actually does</p>
            <h2>A growth function that produces work.</h2>
          </div>
          <p>
            Give Puffle context and a direction. It handles the connective work
            between an idea and a real growth motion—then puts the output in
            front of you to review.
          </p>
        </section>

        <section className="growth-hire-capability-grid" aria-label="Puffle capabilities">
          {capabilities.map((capability) => (
            <article className="growth-hire-capability" key={capability.number}>
              <span className="growth-hire-capability-number">{capability.number}</span>
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
              <ul>
                {capability.outputs.map((output) => (
                  <li key={output}>{output}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="growth-hire-run-section">
          <div className="growth-hire-run-heading">
            <p className="growth-hire-eyebrow">What a run looks like</p>
            <h2>Not a dashboard full of empty tabs.</h2>
            <p>
              Puffle works backwards from the outcome. Every channel is part of
              the same play, so your research, content, and outreach compound.
            </p>
          </div>
          <div className="growth-hire-output-list">
            {exampleOutputs.map((output, index) => (
              <article key={output.label}>
                <span>0{index + 1}</span>
                <div>
                  <p>{output.label}</p>
                  <h3>{output.title}</h3>
                  <small>{output.detail}</small>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="growth-hire-boundary">
          <p className="growth-hire-eyebrow">The operating boundary</p>
          <h2>Puffle does the legwork. You make the calls.</h2>
          <p>
            Set the direction, shape the strategy, and approve what launches.
            Puffle carries the research and execution in between.
          </p>
          <Link className="growth-hire-primary" href={WAITLIST_URL}>
            See Puffle in action
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
