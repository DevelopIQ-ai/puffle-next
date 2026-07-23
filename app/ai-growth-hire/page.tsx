import type { Metadata } from "next";
import Link from "next/link";

import Footer from "../Footer";
import Header from "../Header";
import JsonLd from "../JsonLd";
import { SITE_NAME, SITE_URL, WAITLIST_URL } from "../site";

const title = "Puffle, Your AI Growth Hire";
const description =
  "Puffle learns your business, finds the right people, writes email and LinkedIn outreach, creates posts, and helps you get more customers.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/ai-growth-hire" },
};

const jobs = [
  {
    title: "Learn your business",
    description:
      "Puffle will learn what you sell, what makes you different, and the kind of customer you want more of.",
  },
  {
    title: "Find people to talk to",
    description:
      "It will find companies and people who are likely to care, then explain why they are worth your time.",
  },
  {
    title: "Write the messages",
    description:
      "It will turn that research into personal emails, LinkedIn connection notes, and follow-ups you can actually send.",
  },
  {
    title: "Give you things to post",
    description:
      "It will turn what it learns into founder posts and useful ideas that get the right people to notice you.",
  },
  {
    title: "Figure out what to do next",
    description:
      "It will use what people respond to—and what they ignore—to keep improving how you get customers.",
  },
] as const;

const channels = [
  {
    name: "Email",
    title: "Start useful conversations.",
    description:
      "Personalized first emails and follow-ups based on the company and the person, not a mail-merge template.",
  },
  {
    name: "LinkedIn",
    title: "Reach people where they already are.",
    description:
      "People research, connection notes, and messages that give someone a reason to reply.",
  },
  {
    name: "Posts",
    title: "Make your company easier to notice.",
    description:
      "Founder posts and sharp points of view drawn from the customers and market you are going after.",
  },
  {
    name: "Research",
    title: "Stop guessing who to pursue.",
    description:
      "Company, market, and hiring signals that show where there is a real opening to win customers.",
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
      <main className="puffle-growth-page">
        <section className="puffle-growth-hero">
          <p className="puffle-growth-eyebrow">Your AI growth hire</p>
          <h1>Puffle will help you get more customers.</h1>
          <p className="puffle-growth-lede">
            Tell Puffle about your company and who you want to reach. It will
            find the right people, write the emails and LinkedIn messages, make
            the posts, and keep making your growth better.
          </p>
          <div className="puffle-growth-actions">
            <Link className="puffle-growth-primary" href={WAITLIST_URL}>
              See Puffle in action
            </Link>
            <Link className="puffle-growth-secondary" href="#what-puffle-does">
              What Puffle will do <span aria-hidden="true">↓</span>
            </Link>
          </div>
        </section>

        <section className="puffle-growth-jobs" id="what-puffle-does">
          <div className="puffle-growth-section-heading">
            <p className="puffle-growth-eyebrow">How Puffle helps you grow</p>
            <h2>It will do the work that gets you customers.</h2>
          </div>
          <ol>
            {jobs.map((job, index) => (
              <li key={job.title}>
                <span>0{index + 1}</span>
                <div>
                  <h3>{job.title}</h3>
                  <p>{job.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="puffle-growth-channels">
          <div className="puffle-growth-section-heading">
            <p className="puffle-growth-eyebrow">The things Puffle will make</p>
            <h2>It will put your company in front of the right people.</h2>
          </div>
          <div className="puffle-growth-channel-grid">
            {channels.map((channel) => (
              <article key={channel.name}>
                <p>{channel.name}</p>
                <h3>{channel.title}</h3>
                <span>{channel.description}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="puffle-growth-example">
          <div>
            <p className="puffle-growth-eyebrow">What you can ask Puffle</p>
            <h2>“Help us get customers from this market.”</h2>
          </div>
          <div className="puffle-growth-example-answer">
            <p>Then Puffle will:</p>
            <ul>
              <li>Find the companies most likely to need you now.</li>
              <li>Research the people who make the decision.</li>
              <li>Write the emails, LinkedIn messages, and posts.</li>
              <li>Show you what is working so you can do more of it.</li>
            </ul>
          </div>
        </section>

        <section className="puffle-growth-cta">
          <p className="puffle-growth-eyebrow">Your AI growth hire</p>
          <h2>Tell Puffle where you want to grow.</h2>
          <p>It will help you figure out how to get there.</p>
          <Link className="puffle-growth-primary" href={WAITLIST_URL}>
            See Puffle in action
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
