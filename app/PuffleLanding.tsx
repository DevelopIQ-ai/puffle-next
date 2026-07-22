import Image from "next/image";

import HeroLeadForm from "./HeroLeadForm";
import { CONTACT_EMAIL } from "./site";

const workflow = [
  {
    number: "01",
    title: "Puffle learns your market",
    body: "It researches your company, customers, competitors, and category to spot where demand is hiding.",
    type: "research",
  },
  {
    number: "02",
    title: "You approve the direction",
    body: "Puffle turns the signal into a clear growth plan, audience, message, and campaign. You stay in control.",
    type: "plan",
  },
  {
    number: "03",
    title: "Puffle runs the work",
    body: "It finds the right people, prepares tailored outreach, and keeps every reply and next step moving.",
    type: "launch",
  },
] as const;

const faqs = [
  {
    question: "What does Puffle actually do?",
    answer:
      "Puffle acts like a growth teammate: it researches the market, identifies the right audience, prepares personalized outreach, and keeps the work organized around a concrete goal.",
  },
  {
    question: "Will Puffle send anything without my approval?",
    answer:
      "No. Puffle gives you the research, strategy, and ready-to-review work. You decide what goes live and when.",
  },
  {
    question: "How quickly can I get started?",
    answer:
      "Start with your company domain and a goal. Puffle can begin building context and surfacing the next best moves right away.",
  },
  {
    question: "Can Puffle work with my current outbound stack?",
    answer:
      "Yes. Puffle is designed to fit around the research, lead data, sequencing, and CRM tools your team already uses.",
  },
  {
    question: "What kinds of growth goals is it best for?",
    answer:
      "It is especially useful for validating an ICP, building a prospect list, launching an outbound motion, and keeping follow-up from falling through the cracks.",
  },
] as const;

function ArrowUpRight() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M5 15 15 5M7 5h8v8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="m4 10 3.4 3.4L16 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MiniBrowser({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="puffle-browser">
      <div className="puffle-browser-top">
        <span />
        <span />
        <span />
        <p>{label}</p>
      </div>
      {children}
    </div>
  );
}

function WorkflowVisual({ type }: { type: (typeof workflow)[number]["type"] }) {
  if (type === "research") {
    return (
      <div className="puffle-work-visual puffle-work-research">
        <div className="puffle-search-row"><span className="puffle-search-icon">⌕</span><span>Northstar.ai</span><b>Researching</b></div>
        <div className="puffle-research-lines">
          <p><i />Category</p>
          <strong>AI product analytics</strong>
          <p><i />Best-fit teams</p>
          <strong>PLG teams at 20–200 people</strong>
          <p><i />Competitive signal</p>
          <strong>Buying intent rising in B2B SaaS</strong>
        </div>
        <div className="puffle-research-progress"><span /><em>Mapping market signals…</em></div>
      </div>
    );
  }

  if (type === "plan") {
    return (
      <div className="puffle-work-visual puffle-work-plan">
        <div className="puffle-plan-title"><span className="puffle-spark">✦</span><b>Outbound plan</b><span className="puffle-approved">Ready for review</span></div>
        <div className="puffle-plan-item"><span>Audience</span><strong>Growth leaders at PLG SaaS</strong></div>
        <div className="puffle-plan-item"><span>Angle</span><strong>See product friction before churn</strong></div>
        <div className="puffle-plan-item"><span>Sequence</span><strong>4 tailored touches · 14 days</strong></div>
        <button type="button">Approve plan <span>→</span></button>
      </div>
    );
  }

  return (
    <div className="puffle-work-visual puffle-work-launch">
      <div className="puffle-launch-header"><b>Campaign activity</b><span>Live</span></div>
      <div className="puffle-launch-person">
        <div className="puffle-avatar amber">J</div>
        <div><strong>Jordan Lee</strong><span>VP Growth · Cascade</span></div>
        <em>Personalized</em>
      </div>
      <div className="puffle-message-card"><p>Hi Jordan — noticed Cascade is hiring for product-led growth. I pulled together three activation levers worth testing…</p><span>Review draft <b>→</b></span></div>
      <div className="puffle-launch-person">
        <div className="puffle-avatar moss">A</div>
        <div><strong>Alex Morgan</strong><span>Head of Product · Ratio</span></div>
        <em>Queued</em>
      </div>
    </div>
  );
}

export default function PuffleLanding() {
  return (
    <main className="puffle-landing">
      <section className="puffle-hero" id="audit">
        <div className="puffle-shell puffle-hero-inner">
          <div className="puffle-backed"><span>Built for the teams that move fast</span><i /></div>
          <h1><em className="puffle-hero-primary">Growth work that </em><em>runs itself.</em></h1>
          <p className="puffle-hero-copy">Puffle learns your market, finds the right buyers, and turns insight into campaigns your team can actually ship.</p>
          <div className="puffle-hero-form">
            <p>Give Puffle your company to see where it can help.</p>
            <HeroLeadForm />
          </div>
        </div>
        <div className="puffle-hero-preview-wrap" aria-label="Puffle reviewing a company website">
          <MiniBrowser label="northstar.ai">
            <div className="puffle-site-preview">
              <div className="puffle-site-nav"><b>Northstar</b><span>Product</span><span>Customers</span><span>Resources</span><button type="button">Get started</button></div>
              <div className="puffle-site-content">
                <div>
                  <span className="puffle-preview-eyebrow">PRODUCT ANALYTICS</span>
                  <h2>Make every product decision count.</h2>
                  <p>Understand every click, cohort, and customer without waiting on a dashboard.</p>
                  <button type="button">See Northstar in action <ArrowUpRight /></button>
                </div>
                <div className="puffle-preview-chart"><span>Activation rate</span><strong>42.8%</strong><svg viewBox="0 0 260 140" fill="none" preserveAspectRatio="none"><path d="M0 122C21 120 21 101 42 105c21 4 21-46 43-42 21 4 21 28 42 12 22-16 21-62 43-52 21 10 21-2 42 1 21 3 21-11 48-22" stroke="currentColor" strokeWidth="4" strokeLinecap="round" /></svg></div>
              </div>
              <div className="puffle-preview-cards"><div><span>Time to value</span><b>3.4 days</b><i className="down">↓ 18%</i></div><div><span>New accounts</span><b>1,284</b><i>↑ 23%</i></div><div><span>Expansion</span><b>+31%</b><i>↑ 8%</i></div></div>
            </div>
          </MiniBrowser>
          <div className="puffle-insight puffle-insight-one"><span className="puffle-insight-dot" /> <b>High-intent segment found</b><small>Teams hiring their first growth lead</small></div>
          <div className="puffle-insight puffle-insight-two"><span className="puffle-insight-arrow">↗</span><b>New campaign angle</b><small>Activation, not analytics</small></div>
          <div className="puffle-analysis-status"><span className="puffle-pulse" /> Learning from your market signals…</div>
        </div>
      </section>

      <section className="puffle-integrations" aria-label="Compatible growth tools">
        <div className="puffle-shell">
          <p>Fits into the growth stack you already use</p>
          <div className="puffle-integration-list"><span>apollo</span><span>clay</span><span>n8n</span><span>Smartlead</span><span>instantly</span><span>Salesloft</span></div>
        </div>
      </section>

      <section className="puffle-process" id="how-it-works">
        <div className="puffle-shell">
          <div className="puffle-section-intro"><span>HOW IT WORKS</span><h2>What if your growth engine improved itself?</h2><p>Puffle brings research, strategy, and execution into one continuous operating loop.</p></div>
          <div className="puffle-workflow-list">
            {workflow.map((item) => (
              <article className="puffle-workflow-row" key={item.number}>
                <div className="puffle-workflow-copy"><span>{item.number}</span><h3>{item.title}</h3><p>{item.body}</p></div>
                <WorkflowVisual type={item.type} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="puffle-command-section">
        <div className="puffle-shell">
          <div className="puffle-section-intro puffle-section-intro-center"><span>YOUR GROWTH COMMAND CENTER</span><h2>Less busywork. More momentum.</h2><p>Give Puffle a goal. It turns the messy work between idea and launch into one clear plan.</p></div>
          <div className="puffle-command-window">
            <div className="puffle-command-side">
              <div className="puffle-command-brand"><Image src="/puffle-logo.png" alt="" width={26} height={26} /> <b>Puffle</b></div>
              <span className="puffle-command-label">WORKSPACE</span>
              <a className="active" href="#strategy">✦ Growth plan</a>
              <a href="#research">⌕ Research</a>
              <a href="#people">◎ People</a>
              <a href="#campaigns">↗ Campaigns</a>
              <span className="puffle-command-label">RECENT</span>
              <a href="#launch">New market launch</a>
              <a href="#positioning">Positioning review</a>
              <div className="puffle-command-user"><span>AK</span><div><b>Alex Kim</b><small>Growth lead</small></div><i>⌄</i></div>
            </div>
            <div className="puffle-command-main">
              <div className="puffle-command-top"><div><span>MONDAY, JULY 22</span><h3>Your growth brief</h3></div><button type="button">Share</button></div>
              <div className="puffle-objective"><span>OBJECTIVE</span><p>Build a repeatable outbound motion for product-led SaaS teams.</p><div><em>In progress</em><b>12 tasks mapped</b></div></div>
              <div className="puffle-command-grid">
                <div className="puffle-command-card puffle-command-research"><span>MARKET RESEARCH</span><h4>The strongest signal is hiding in activation.</h4><p>Teams are not buying another analytics tool. They are buying a faster path to product value.</p><a href="#research">Open research <ArrowUpRight /></a></div>
                <div className="puffle-command-card puffle-command-audience"><span>BEST-FIT AUDIENCE</span><h4>184 accounts ready to explore</h4><div className="puffle-audience-stack"><i /><i /><i /><i /><b>+180</b></div><a href="#people">View people <ArrowUpRight /></a></div>
                <div className="puffle-command-card puffle-command-campaign"><span>NEXT MOVE</span><h4>Review your first campaign</h4><p>4-message sequence, personalized for the top 50 accounts.</p><button type="button">Review campaign <span>→</span></button></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="puffle-replay-section">
        <div className="puffle-shell">
          <div className="puffle-replay-grid">
            <div className="puffle-replay-copy"><span>FROM SIGNAL TO SHIPPED</span><h2>One goal.<br /><em>A hundred moves.</em></h2><p>Puffle keeps moving through the work that normally gets stuck between scattered tools, notes, and handoffs.</p></div>
            <div className="puffle-replay-panel">
              <div className="puffle-replay-head"><b>Growth activity</b><span><i /> Working</span></div>
              <div className="puffle-timeline">
                <div className="puffle-timeline-entry"><time>09:12</time><span className="puffle-time-icon research">⌕</span><p><b>Market research complete</b><small>Identified 3 buying triggers across 6 competitor sites</small></p><em>Open</em></div>
                <div className="puffle-timeline-entry"><time>10:04</time><span className="puffle-time-icon people">◎</span><p><b>Audience prioritized</b><small>184 high-fit accounts matched to your ICP</small></p><em>View</em></div>
                <div className="puffle-timeline-entry"><time>11:26</time><span className="puffle-time-icon message">↗</span><p><b>Campaign draft ready</b><small>50 personalized first touches prepared for review</small></p><em>Review</em></div>
                <div className="puffle-timeline-entry"><time>Now</time><span className="puffle-time-icon spark">✦</span><p><b>Finding the next best move</b><small>Learning from replies and market signals</small></p><em className="puffle-live">Live</em></div>
              </div>
              <div className="puffle-replay-foot"><span>Goal progress</span><div><i /><i /><i className="active" /><i /></div><b>72%</b></div>
            </div>
          </div>
        </div>
      </section>

      <section className="puffle-chaos-section">
        <div className="puffle-shell">
          <div className="puffle-section-intro puffle-section-intro-center"><span>POV: YOU WANTED TO LAUNCH ONE CAMPAIGN</span><h2>Growth work shouldn&apos;t require a scavenger hunt.</h2></div>
          <div className="puffle-chaos-board">
            <div className="puffle-chaos-cal"><div className="puffle-cal-head"><span>‹</span><b>July 2026</b><span>›</span></div><div className="puffle-cal-week">S M T W T F S</div><div className="puffle-cal-days"><span>28</span><span>29</span><span>30</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span className="puffle-cal-mark">6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span><span>29</span><span>30</span><span>31</span><span>1</span></div></div>
            <div className="puffle-chaos-message slack"><span>#</span><p><b>#growth</b> Can someone turn the brief into a prospecting list?</p></div>
            <div className="puffle-chaos-message calendar"><span>◫</span><p><b>Campaign sync</b> · Thu 2:00 PM</p></div>
            <div className="puffle-chaos-message jira"><span>▣</span><p><b>GTM-142</b> · Moved to In Review</p></div>
            <div className="puffle-chaos-message email"><span>✉</span><p><b>Re: Q3 outbound plan</b> · See attached</p></div>
            <div className="puffle-chaos-message slack second"><span>#</span><p><b>#design</b> Need the message brief first</p></div>
            <div className="puffle-chaos-result"><span>✦</span><p><small>Puffle turns all of this into</small><b>One clear next move</b></p><button type="button">Review plan <ArrowUpRight /></button></div>
          </div>
        </div>
      </section>

      <section className="puffle-faq-section" id="faq">
        <div className="puffle-shell puffle-faq-layout"><div><span>FAQS</span><h2>Questions,<br />answered.</h2></div><div className="puffle-faq-list">{faqs.map((faq, index) => <details key={faq.question} open={index === 0}><summary>{faq.question}<span>+</span></summary><p>{faq.answer}</p></details>)}</div></div>
      </section>

      <section className="puffle-final-cta">
        <div className="puffle-shell"><span>READY WHEN YOU ARE</span><h2>Build the growth engine<br /><em>you&apos;ve been missing.</em></h2><p>Give Puffle your company. Get a clearer view of the work that moves growth forward.</p><div className="puffle-final-form"><HeroLeadForm /></div><a href={`mailto:${CONTACT_EMAIL}`} className="puffle-demo-link">Or talk to us <ArrowUpRight /></a></div>
      </section>
    </main>
  );
}
