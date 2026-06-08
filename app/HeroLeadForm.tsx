"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type Step = "company" | "contact" | "done";

function getClientMetadata() {
  if (typeof window === "undefined") {
    return {};
  }

  return {
    page_url: window.location.href,
    path: window.location.pathname,
    search: window.location.search,
    referrer: document.referrer,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timezone_offset_minutes: new Date().getTimezoneOffset(),
    language: navigator.language,
    languages: navigator.languages,
    user_agent: navigator.userAgent,
    platform: navigator.platform,
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    screen: {
      width: window.screen.width,
      height: window.screen.height,
      color_depth: window.screen.colorDepth,
      pixel_depth: window.screen.pixelDepth,
    },
    device_pixel_ratio: window.devicePixelRatio,
  };
}

export default function HeroLeadForm() {
  const [step, setStep] = useState<Step>("company");
  const [leadId, setLeadId] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (step === "contact") {
      emailInputRef.current?.focus();
    }
  }, [step]);

  const submitCompany = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/landing-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ step: "company", companyUrl, clientMetadata: getClientMetadata() }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Could not save that company link.");
      }

      setLeadId(result.id);
      setStep("contact");
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/landing-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          step: "contact",
          leadId,
          email,
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Could not save your contact details.");
      }

      setStep("done");
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === "done") {
    return (
      <div className="hero-lead-done" role="status">
        Got it. We will send the report when it is ready.
      </div>
    );
  }

  if (step === "contact") {
    return (
      <div className="lead-modal-backdrop" role="presentation">
        <div className="lead-modal" role="dialog" aria-modal="true" aria-labelledby="lead-modal-title">
          <h2 id="lead-modal-title">We&apos;ll Send You A Report Soon</h2>
          <p className="lead-modal-prompt">Leave Your Email Here</p>
          <form className="hero-lead-form hero-contact-form" onSubmit={submitContact}>
            <label className="sr-only" htmlFor="report-email">
              Email
            </label>
            <div className="lead-modal-email-control">
              <input
                ref={emailInputRef}
                id="report-email"
                name="email"
                type="email"
                placeholder="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <button
                type="submit"
                className="lead-modal-submit"
                disabled={isSubmitting}
                aria-label={isSubmitting ? "Saving email" : "Send report to this email"}
              >
                {isSubmitting ? (
                  <span aria-hidden="true">...</span>
                ) : (
                  <svg
                    aria-hidden="true"
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m13 6 6 6-6 6" />
                  </svg>
                )}
              </button>
            </div>
            {error ? <p className="hero-form-error">{error}</p> : null}
          </form>
        </div>
      </div>
    );
  }

  return (
    <form id="hero-lead-form" className="hero-lead-form hero-company-form" onSubmit={submitCompany}>
      <label className="sr-only" htmlFor="company-url">
        Company link
      </label>
      <div className="company-link-bar">
        <input
          id="company-url"
          name="companyUrl"
          type="text"
          placeholder="your-company.com"
          title="Use a company domain or URL"
          autoComplete="url"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          value={companyUrl}
          onChange={(event) => setCompanyUrl(event.target.value)}
          required
        />
        <button
          type="submit"
          className="company-submit"
          disabled={isSubmitting}
          aria-label={isSubmitting ? "Saving company link" : "Find hidden ways for this company"}
        >
          {isSubmitting ? (
            <span aria-hidden="true">...</span>
          ) : (
            <svg
              aria-hidden="true"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          )}
        </button>
      </div>
      {error ? <p className="hero-form-error">{error}</p> : null}
    </form>
  );
}
