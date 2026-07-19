"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type Step = "company" | "contact" | "done";

type BrowserConnection = {
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
};

type BrowserNavigator = Navigator & {
  connection?: BrowserConnection;
  deviceMemory?: number;
  userAgentData?: {
    brands?: Array<{ brand: string; version: string }>;
    mobile?: boolean;
    platform?: string;
  };
};

const trackingParamNames = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
  "msclkid",
  "ttclid",
  "li_fat_id",
] as const;

const teasedCompanyDomains = new Set(["x.com", "google.com", "nike.com"]);

function getCompanyDomain(value: string) {
  const trimmedValue = value.trim().toLowerCase();

  if (!trimmedValue) {
    return "";
  }

  try {
    const url = new URL(trimmedValue.includes("://") ? trimmedValue : `https://${trimmedValue}`);
    return url.hostname.replace(/^www\./, "").replace(/\.$/, "");
  } catch {
    return trimmedValue.replace(/^https?:\/\//, "").split(/[/?#]/, 1)[0].replace(/^www\./, "").replace(/\.$/, "");
  }
}

function makeTrackingId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}_${crypto.randomUUID()}`;
  }

  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2)}`;
}

function getBrowserStorage(storageName: "localStorage" | "sessionStorage") {
  try {
    return window[storageName];
  } catch {
    return null;
  }
}

function getStoredTrackingId(storage: Storage | null, key: string, prefix: string) {
  if (!storage) {
    return makeTrackingId(prefix);
  }

  try {
    const existingId = storage.getItem(key);

    if (existingId) {
      return existingId;
    }

    const nextId = makeTrackingId(prefix);
    storage.setItem(key, nextId);
    return nextId;
  } catch {
    return makeTrackingId(prefix);
  }
}

function canUseStorage(storage: Storage | null) {
  if (!storage) {
    return false;
  }

  try {
    const key = "__puffle_storage_check__";
    storage.setItem(key, "1");
    storage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

function getAttributionParams() {
  const params = new URLSearchParams(window.location.search);
  return Object.fromEntries(
    trackingParamNames
      .map((key) => [key, params.get(key)] as const)
      .filter(([, value]) => value && value.trim().length > 0),
  );
}

function getConnectionMetadata(navigatorValue: BrowserNavigator) {
  const connection = navigatorValue.connection;

  if (!connection) {
    return {};
  }

  return {
    effective_type: connection.effectiveType,
    downlink: connection.downlink,
    rtt: connection.rtt,
    save_data: connection.saveData,
  };
}

function getPerformanceMetadata() {
  const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;

  return {
    time_origin: performance.timeOrigin,
    now_ms: Math.round(performance.now()),
    navigation: navigation
      ? {
          type: navigation.type,
          start_time: navigation.startTime,
          duration: navigation.duration,
          dom_interactive: navigation.domInteractive,
          dom_content_loaded_event_end: navigation.domContentLoadedEventEnd,
          load_event_end: navigation.loadEventEnd,
          transfer_size: navigation.transferSize,
          encoded_body_size: navigation.encodedBodySize,
          decoded_body_size: navigation.decodedBodySize,
        }
      : null,
  };
}

function getScrollMetadata() {
  const documentElement = document.documentElement;
  const body = document.body;
  const scrollHeight = Math.max(documentElement.scrollHeight, body?.scrollHeight ?? 0);
  const viewportHeight = window.innerHeight;
  const maxScrollY = Math.max(scrollHeight - viewportHeight, 0);
  const scrollY = window.scrollY;

  return {
    x: window.scrollX,
    y: scrollY,
    max_y: maxScrollY,
    depth_percent: maxScrollY > 0 ? Math.round((scrollY / maxScrollY) * 100) : 0,
  };
}

function getClientMetadata(step: Step, pageStartedAt: number, interaction: Record<string, unknown>) {
  if (typeof window === "undefined") {
    return {};
  }

  const navigatorValue = navigator as BrowserNavigator;
  const userAgentData = navigatorValue.userAgentData;
  const localStorage = getBrowserStorage("localStorage");
  const sessionStorage = getBrowserStorage("sessionStorage");
  const localStorageAvailable = canUseStorage(localStorage);
  const sessionStorageAvailable = canUseStorage(sessionStorage);

  return {
    visitor_id: getStoredTrackingId(localStorage, "puffle_visitor_id", "visitor"),
    session_id: getStoredTrackingId(sessionStorage, "puffle_session_id", "session"),
    form_step: step,
    page_started_at: new Date(pageStartedAt).toISOString(),
    collected_at: new Date().toISOString(),
    time_on_page_ms: Date.now() - pageStartedAt,
    page_url: window.location.href,
    path: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
    referrer: document.referrer,
    document_title: document.title,
    visibility_state: document.visibilityState,
    hidden: document.hidden,
    history_length: window.history.length,
    attribution: getAttributionParams(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timezone_offset_minutes: new Date().getTimezoneOffset(),
    language: navigator.language,
    languages: navigator.languages,
    user_agent: navigator.userAgent,
    user_agent_data: userAgentData
      ? {
          brands: userAgentData.brands,
          mobile: userAgentData.mobile,
          platform: userAgentData.platform,
        }
      : null,
    vendor: navigator.vendor,
    platform: navigator.platform,
    hardware_concurrency: navigator.hardwareConcurrency,
    device_memory: navigatorValue.deviceMemory,
    max_touch_points: navigator.maxTouchPoints,
    webdriver: navigator.webdriver,
    cookie_enabled: navigator.cookieEnabled,
    do_not_track: navigator.doNotTrack,
    online: navigator.onLine,
    local_storage_available: localStorageAvailable,
    session_storage_available: sessionStorageAvailable,
    plugins_count: navigator.plugins.length,
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    screen: {
      width: window.screen.width,
      height: window.screen.height,
      avail_width: window.screen.availWidth,
      avail_height: window.screen.availHeight,
      color_depth: window.screen.colorDepth,
      pixel_depth: window.screen.pixelDepth,
      orientation: window.screen.orientation
        ? {
            type: window.screen.orientation.type,
            angle: window.screen.orientation.angle,
          }
        : null,
    },
    device_pixel_ratio: window.devicePixelRatio,
    connection: getConnectionMetadata(navigatorValue),
    performance: getPerformanceMetadata(),
    scroll: getScrollMetadata(),
    interaction,
  };
}

export default function HeroLeadForm() {
  const [step, setStep] = useState<Step>("company");
  const [leadId, setLeadId] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [tease, setTease] = useState("");
  const emailInputRef = useRef<HTMLInputElement>(null);
  const pageStartedAtRef = useRef(Date.now());
  const companyFocusedAtRef = useRef<number | null>(null);
  const companyFirstChangedAtRef = useRef<number | null>(null);
  const companyLastChangedAtRef = useRef<number | null>(null);
  const emailFocusedAtRef = useRef<number | null>(null);
  const emailFirstChangedAtRef = useRef<number | null>(null);
  const emailLastChangedAtRef = useRef<number | null>(null);
  const companySubmitCountRef = useRef(0);
  const contactSubmitCountRef = useRef(0);

  useEffect(() => {
    if (step === "contact") {
      emailInputRef.current?.focus();
      emailFocusedAtRef.current ??= Date.now();
    }
  }, [step]);

  const getInteractionMetadata = (formStep: Step) => {
    const now = Date.now();
    const elapsed = (value: number | null) => (value == null ? null : value - pageStartedAtRef.current);

    return {
      form_step: formStep,
      submitted_at: new Date(now).toISOString(),
      time_on_page_ms: now - pageStartedAtRef.current,
      company_submit_count: companySubmitCountRef.current,
      contact_submit_count: contactSubmitCountRef.current,
      company: {
        value_length: companyUrl.length,
        focused_after_ms: elapsed(companyFocusedAtRef.current),
        first_changed_after_ms: elapsed(companyFirstChangedAtRef.current),
        last_changed_after_ms: elapsed(companyLastChangedAtRef.current),
      },
      email: {
        value_length: email.length,
        has_value: email.length > 0,
        focused_after_ms: elapsed(emailFocusedAtRef.current),
        first_changed_after_ms: elapsed(emailFirstChangedAtRef.current),
        last_changed_after_ms: elapsed(emailLastChangedAtRef.current),
      },
    };
  };

  const submitCompany = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setTease("");
    companySubmitCountRef.current += 1;

    if (teasedCompanyDomains.has(getCompanyDomain(companyUrl))) {
      setTease("really?, come on man");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/landing-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          step: "company",
          companyUrl,
          clientMetadata: getClientMetadata("company", pageStartedAtRef.current, getInteractionMetadata("company")),
        }),
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
    contactSubmitCountRef.current += 1;

    try {
      const response = await fetch("/api/landing-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          step: "contact",
          leadId,
          email,
          clientMetadata: getClientMetadata("contact", pageStartedAtRef.current, getInteractionMetadata("contact")),
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
                onFocus={() => {
                  emailFocusedAtRef.current ??= Date.now();
                }}
                onChange={(event) => {
                  emailFirstChangedAtRef.current ??= Date.now();
                  emailLastChangedAtRef.current = Date.now();
                  setEmail(event.target.value);
                }}
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
          onFocus={() => {
            companyFocusedAtRef.current ??= Date.now();
          }}
          onChange={(event) => {
            companyFirstChangedAtRef.current ??= Date.now();
            companyLastChangedAtRef.current = Date.now();
            setCompanyUrl(event.target.value);
            setTease("");
          }}
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
      {tease ? <p className="hero-form-tease" role="status">{tease}</p> : null}
      {error ? <p className="hero-form-error">{error}</p> : null}
    </form>
  );
}
