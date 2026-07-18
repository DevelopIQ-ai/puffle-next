import Image from "next/image";

const workSteps = [
  { label: "Learn the company", detail: "Positioning and customer context", state: "done" },
  { label: "Find the angle", detail: "3 growth plays worth testing", state: "done" },
  { label: "Build the audience", detail: "184 qualified people", state: "active" },
  { label: "Prepare the campaign", detail: "Waiting on audience review", state: "next" },
] as const;

export default function GrowthEmployeePreview() {
  return (
    <div className="growth-employee-preview" aria-label="Preview of Puffle working on a growth goal">
      <div className="growth-preview-chrome" aria-hidden="true">
        <span />
        <span />
        <span />
        <p>puffle.ai / growth goal</p>
      </div>

      <div className="growth-preview-app">
        <aside className="growth-preview-sidebar">
          <div className="growth-preview-brand">
            <Image src="/puffle-logo.svg" alt="" width={24} height={24} />
            <strong>Puffle</strong>
          </div>
          <nav aria-label="Preview navigation">
            <span className="is-active">Goal</span>
            <span>Research</span>
            <span>People</span>
            <span>Campaign</span>
          </nav>
          <div className="growth-preview-avatar">KB</div>
        </aside>

        <section className="growth-preview-main">
          <div className="growth-preview-kicker">CURRENT GOAL</div>
          <div className="growth-preview-heading">
            <div>
              <h2>Book 20 design partners</h2>
              <p>Founder-led AI companies in San Francisco</p>
            </div>
            <span className="growth-preview-status"><i /> Working</span>
          </div>

          <div className="growth-preview-progress" aria-hidden="true">
            <span />
          </div>

          <div className="growth-preview-body">
            <div className="growth-preview-steps">
              {workSteps.map((step, index) => (
                <div className={`growth-preview-step is-${step.state}`} key={step.label}>
                  <span className="growth-preview-step-dot">
                    {step.state === "done" ? "✓" : index + 1}
                  </span>
                  <div>
                    <strong>{step.label}</strong>
                    <p>{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="growth-preview-findings">
              <p className="growth-preview-panel-label">WHAT PUFFLE FOUND</p>
              <article>
                <div>
                  <span className="growth-preview-signal">Strong signal</span>
                  <h3>Companies hiring their first growth lead</h3>
                </div>
                <strong>72</strong>
              </article>
              <article>
                <div>
                  <span className="growth-preview-signal">Underused angle</span>
                  <h3>Founders replacing a fragmented GTM stack</h3>
                </div>
                <strong>64</strong>
              </article>
              <article>
                <div>
                  <span className="growth-preview-signal">New market</span>
                  <h3>Agencies launching an AI service line</h3>
                </div>
                <strong>48</strong>
              </article>
            </div>
          </div>

          <div className="growth-preview-approval">
            <div>
              <span>Next decision</span>
              <strong>Review the audience before Puffle writes the campaign</strong>
            </div>
            <span className="growth-preview-review">Review audience →</span>
          </div>
        </section>
      </div>
    </div>
  );
}
