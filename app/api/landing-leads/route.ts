import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { isIP } from "net";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const tableName = "landing_leads";

type CompanyPayload = {
  step: "company";
  companyUrl?: string;
  clientMetadata?: unknown;
};

type ContactPayload = {
  step: "contact";
  leadId?: string;
  email?: string;
  clientMetadata?: unknown;
};

type JsonRecord = Record<string, unknown>;

type LeadNotificationStage = "company" | "contact";

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !secretKey) {
    throw new Error("Supabase env vars are not configured. Set NEXT_PUBLIC_SUPABASE_URL and a server-side Supabase key.");
  }

  return createClient(url, secretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function normalizeCompanyInput(value: string) {
  const trimmed = value.trim().replace(/\s+/g, " ");
  const urlValue = /^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  let hostname: string;

  try {
    hostname = new URL(urlValue).hostname;
  } catch {
    hostname = "";
  }

  const domain = hostname.toLowerCase().replace(/^www[.]/, "").replace(/[.]$/, "");
  const domainPattern = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/;

  if (domainPattern.test(domain)) {
    return domain;
  }

  const companyName = trimmed
    .replace(/^[a-z][a-z0-9+.-]*:\/\//i, "")
    .replace(/^www[.]/i, "")
    .replace(/[/?#].*$/, "")
    .trim();

  if (!/[a-z0-9]/i.test(companyName) || companyName.length > 120) {
    return null;
  }

  return companyName;
}

function cleanOptional(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function cleanMetadataValue(value: unknown, depth = 0): unknown {
  if (value == null) {
    return null;
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed.slice(0, 2000) : null;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return value;
  }

  if (Array.isArray(value)) {
    return value
      .map((item) => cleanMetadataValue(item, depth + 1))
      .filter((item) => item != null)
      .slice(0, 100);
  }

  if (typeof value === "object" && depth < 5) {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .slice(0, 100)
        .map(([key, item]) => [key, cleanMetadataValue(item, depth + 1)])
        .filter(([, item]) => item != null),
    );
  }

  return null;
}

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function cleanJsonObject(value: unknown) {
  const cleaned = cleanMetadataValue(value);
  return isRecord(cleaned) ? cleaned : {};
}

function getRecord(record: JsonRecord, key: string) {
  const value = record[key];
  return isRecord(value) ? value : {};
}

function getString(record: JsonRecord, key: string) {
  const value = record[key];
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function getBoolean(record: JsonRecord, key: string) {
  const value = record[key];
  return typeof value === "boolean" ? value : null;
}

function getNumber(record: JsonRecord, key: string) {
  const value = record[key];

  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

function getInteger(record: JsonRecord, key: string) {
  const value = getNumber(record, key);
  return value == null ? null : Math.trunc(value);
}

function getStringArray(record: JsonRecord, key: string) {
  const value = record[key];

  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string" && item.trim().length > 0).map((item) => item.trim());
}

const sensitiveHeaderNames = new Set([
  "authorization",
  "cookie",
  "proxy-authorization",
  "set-cookie",
  "x-vercel-protection-bypass",
  "x-vercel-protection-bypass-secret",
]);

function collectRequestHeaders(request: NextRequest) {
  const headers: JsonRecord = {};

  for (const [key, value] of request.headers.entries()) {
    const normalizedKey = key.toLowerCase();

    if (sensitiveHeaderNames.has(normalizedKey)) {
      continue;
    }

    headers[normalizedKey] = value.slice(0, 2000);
  }

  return headers;
}

function firstHeaderListValue(value: string | null) {
  if (!value) {
    return null;
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .find(Boolean) ?? null;
}

function normalizeIpAddress(value: string | null) {
  const firstValue = firstHeaderListValue(value);

  if (!firstValue) {
    return null;
  }

  const withoutBrackets = firstValue.replace(/^\[/, "").replace(/\]$/, "");
  const ipv4WithPort = withoutBrackets.match(/^(\d{1,3}(?:[.]\d{1,3}){3})(?::\d+)?$/);
  const candidate = ipv4WithPort ? ipv4WithPort[1] : withoutBrackets;

  return isIP(candidate) ? candidate : null;
}

function collectIpChain(...values: Array<string | null>) {
  return Array.from(
    new Set(
      values
        .flatMap((value) => (value ? value.split(",") : []))
        .map((value) => normalizeIpAddress(value))
        .filter((value): value is string => Boolean(value)),
    ),
  );
}

function collectRequestMetadata(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const vercelForwardedFor = request.headers.get("x-vercel-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const cfConnectingIp = request.headers.get("cf-connecting-ip");
  const trueClientIp = request.headers.get("true-client-ip");
  const clientIp = request.headers.get("x-client-ip");
  const country = request.headers.get("x-vercel-ip-country");
  const region = request.headers.get("x-vercel-ip-country-region");
  const city = request.headers.get("x-vercel-ip-city");
  const latitude = request.headers.get("x-vercel-ip-latitude");
  const longitude = request.headers.get("x-vercel-ip-longitude");
  const timezone = request.headers.get("x-vercel-ip-timezone");

  return {
    method: request.method,
    url: request.url,
    user_agent: request.headers.get("user-agent"),
    referer: request.headers.get("referer"),
    origin: request.headers.get("origin"),
    host: request.headers.get("host"),
    accept_language: request.headers.get("accept-language"),
    forwarded_for: forwardedFor,
    vercel_forwarded_for: vercelForwardedFor,
    real_ip: realIp,
    cf_connecting_ip: cfConnectingIp,
    true_client_ip: trueClientIp,
    client_ip: clientIp,
    country,
    region,
    city,
    latitude,
    longitude,
    timezone,
    ip: {
      address: normalizeIpAddress(cfConnectingIp) ?? normalizeIpAddress(trueClientIp) ?? normalizeIpAddress(realIp) ?? normalizeIpAddress(forwardedFor) ?? normalizeIpAddress(vercelForwardedFor) ?? normalizeIpAddress(clientIp),
      chain: collectIpChain(cfConnectingIp, trueClientIp, realIp, forwardedFor, vercelForwardedFor, clientIp),
      cf_connecting_ip: normalizeIpAddress(cfConnectingIp),
      true_client_ip: normalizeIpAddress(trueClientIp),
      real_ip: normalizeIpAddress(realIp),
      forwarded_for: forwardedFor,
      vercel_forwarded_for: vercelForwardedFor,
      client_ip: normalizeIpAddress(clientIp),
    },
    geo: {
      country,
      region,
      city,
      latitude,
      longitude,
      timezone,
      postal_code: request.headers.get("x-vercel-ip-postal-code"),
    },
    client_hints: {
      sec_ch_ua: request.headers.get("sec-ch-ua"),
      sec_ch_ua_mobile: request.headers.get("sec-ch-ua-mobile"),
      sec_ch_ua_platform: request.headers.get("sec-ch-ua-platform"),
    },
    fetch: {
      site: request.headers.get("sec-fetch-site"),
      mode: request.headers.get("sec-fetch-mode"),
      dest: request.headers.get("sec-fetch-dest"),
      user: request.headers.get("sec-fetch-user"),
    },
    vercel: {
      id: request.headers.get("x-vercel-id"),
      deployment_url: request.headers.get("x-vercel-deployment-url"),
      forwarded_host: request.headers.get("x-forwarded-host"),
      forwarded_proto: request.headers.get("x-forwarded-proto"),
      forwarded_port: request.headers.get("x-forwarded-port"),
    },
  };
}

function getSearchParams(clientMetadata: JsonRecord) {
  const pageUrl = getString(clientMetadata, "page_url");

  if (pageUrl) {
    try {
      return new URL(pageUrl).searchParams;
    } catch {
      // Fall through to the raw search string.
    }
  }

  const search = getString(clientMetadata, "search");
  return new URLSearchParams(search?.startsWith("?") ? search.slice(1) : search ?? "");
}

function getAttributionValue(clientMetadata: JsonRecord, key: string) {
  const attribution = getRecord(clientMetadata, "attribution");
  return getString(attribution, key) ?? getSearchParams(clientMetadata).get(key);
}

function buildLandingLeadTrackingFields(request: NextRequest, rawClientMetadata: unknown) {
  const requestHeaders = collectRequestHeaders(request);
  const requestMetadata = collectRequestMetadata(request);
  const clientMetadata = isRecord(rawClientMetadata) ? rawClientMetadata : {};
  const requestIp = getRecord(requestMetadata, "ip");
  const geo = getRecord(requestMetadata, "geo");
  const screen = getRecord(clientMetadata, "screen");
  const viewport = getRecord(clientMetadata, "viewport");

  return {
    visitor_id: getString(clientMetadata, "visitor_id"),
    session_id: getString(clientMetadata, "session_id"),
    ip_address: getString(requestIp, "address"),
    ip_chain: getStringArray(requestIp, "chain"),
    cf_connecting_ip: getString(requestIp, "cf_connecting_ip"),
    real_ip: getString(requestIp, "real_ip"),
    request_headers: cleanJsonObject(requestHeaders),
    request_metadata: cleanJsonObject(requestMetadata),
    client_metadata: cleanJsonObject(clientMetadata),
    page_url: getString(clientMetadata, "page_url"),
    page_path: getString(clientMetadata, "path"),
    page_search: getString(clientMetadata, "search"),
    page_referrer: getString(clientMetadata, "referrer"),
    document_title: getString(clientMetadata, "document_title"),
    referrer: getString(requestMetadata, "referer"),
    origin: getString(requestMetadata, "origin"),
    host: getString(requestMetadata, "host"),
    user_agent: getString(requestMetadata, "user_agent"),
    accept_language: getString(requestMetadata, "accept_language"),
    browser_language: getString(clientMetadata, "language"),
    browser_languages: getStringArray(clientMetadata, "languages"),
    platform: getString(clientMetadata, "platform"),
    timezone: getString(clientMetadata, "timezone") ?? getString(geo, "timezone"),
    timezone_offset_minutes: getInteger(clientMetadata, "timezone_offset_minutes"),
    country: getString(geo, "country"),
    region: getString(geo, "region"),
    city: getString(geo, "city"),
    latitude: getNumber(geo, "latitude"),
    longitude: getNumber(geo, "longitude"),
    utm_source: getAttributionValue(clientMetadata, "utm_source"),
    utm_medium: getAttributionValue(clientMetadata, "utm_medium"),
    utm_campaign: getAttributionValue(clientMetadata, "utm_campaign"),
    utm_term: getAttributionValue(clientMetadata, "utm_term"),
    utm_content: getAttributionValue(clientMetadata, "utm_content"),
    gclid: getAttributionValue(clientMetadata, "gclid"),
    fbclid: getAttributionValue(clientMetadata, "fbclid"),
    msclkid: getAttributionValue(clientMetadata, "msclkid"),
    ttclid: getAttributionValue(clientMetadata, "ttclid"),
    li_fat_id: getAttributionValue(clientMetadata, "li_fat_id"),
    screen_width: getInteger(screen, "width"),
    screen_height: getInteger(screen, "height"),
    viewport_width: getInteger(viewport, "width"),
    viewport_height: getInteger(viewport, "height"),
    device_pixel_ratio: getNumber(clientMetadata, "device_pixel_ratio"),
    color_depth: getInteger(screen, "color_depth"),
    pixel_depth: getInteger(screen, "pixel_depth"),
    hardware_concurrency: getInteger(clientMetadata, "hardware_concurrency"),
    device_memory: getNumber(clientMetadata, "device_memory"),
    max_touch_points: getInteger(clientMetadata, "max_touch_points"),
    webdriver: getBoolean(clientMetadata, "webdriver"),
    cookie_enabled: getBoolean(clientMetadata, "cookie_enabled"),
    do_not_track: getString(clientMetadata, "do_not_track"),
    online: getBoolean(clientMetadata, "online"),
    connection_metadata: cleanJsonObject(clientMetadata.connection),
    performance_metadata: cleanJsonObject(clientMetadata.performance),
    interaction_metadata: cleanJsonObject(clientMetadata.interaction),
  };
}

function buildContactTrackingFields(request: NextRequest, rawClientMetadata: unknown, submittedAt: string) {
  return {
    contact_request_headers: cleanJsonObject(collectRequestHeaders(request)),
    contact_request_metadata: cleanJsonObject(collectRequestMetadata(request)),
    contact_client_metadata: cleanJsonObject(rawClientMetadata),
    contact_submitted_at: submittedAt,
  };
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    switch (character) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;";
      default:
        return character;
    }
  });
}

function formatNotificationValue(value: unknown) {
  if (value == null || value === "") {
    return "n/a";
  }

  if (Array.isArray(value)) {
    return value.length > 0 ? value.join(", ") : "n/a";
  }

  return String(value);
}

function getNotificationRecipients() {
  const value = process.env.LEAD_NOTIFICATION_EMAIL ?? process.env.LEAD_NOTIFICATION_TO;

  return value
    ? value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    : [];
}

function buildLeadNotificationContent({
  stage,
  leadId,
  companyUrl,
  companyInput,
  email,
  trackingFields,
  contactTrackingFields,
}: {
  stage: LeadNotificationStage;
  leadId: string;
  companyUrl: string;
  companyInput?: string | null;
  email?: string | null;
  trackingFields: JsonRecord;
  contactTrackingFields?: JsonRecord;
}) {
  const requestMetadata = getRecord(trackingFields, "request_metadata");
  const clientMetadata = getRecord(trackingFields, "client_metadata");
  const contactRequestMetadata = contactTrackingFields ? getRecord(contactTrackingFields, "contact_request_metadata") : {};
  const contactClientMetadata = contactTrackingFields ? getRecord(contactTrackingFields, "contact_client_metadata") : {};
  const userAgent = getString(requestMetadata, "user_agent") ?? getString(contactRequestMetadata, "user_agent");
  const pageUrl = getString(trackingFields, "page_url") ?? getString(clientMetadata, "page_url") ?? getString(contactClientMetadata, "page_url");
  const visitorId = getString(trackingFields, "visitor_id") ?? getString(contactClientMetadata, "visitor_id");
  const sessionId = getString(trackingFields, "session_id") ?? getString(contactClientMetadata, "session_id");

  const rows: Array<[string, unknown]> = [
    ["Stage", stage === "company" ? "Company submitted" : "Contact submitted"],
    ["Lead ID", leadId],
    ["Company", companyUrl],
    ["Original input", companyInput],
    ["Email", email],
    ["IP", trackingFields.ip_address],
    ["IP chain", trackingFields.ip_chain],
    ["Page", pageUrl],
    ["Referrer", trackingFields.page_referrer ?? trackingFields.referrer],
    ["UTM source", trackingFields.utm_source],
    ["UTM medium", trackingFields.utm_medium],
    ["UTM campaign", trackingFields.utm_campaign],
    ["GCLID", trackingFields.gclid],
    ["Visitor ID", visitorId],
    ["Session ID", sessionId],
    ["Country", trackingFields.country],
    ["Region", trackingFields.region],
    ["City", trackingFields.city],
    ["Timezone", trackingFields.timezone],
    ["Browser language", trackingFields.browser_language],
    ["Platform", trackingFields.platform],
    ["Viewport", trackingFields.viewport_width && trackingFields.viewport_height ? `${trackingFields.viewport_width}x${trackingFields.viewport_height}` : null],
    ["Screen", trackingFields.screen_width && trackingFields.screen_height ? `${trackingFields.screen_width}x${trackingFields.screen_height}` : null],
    ["User agent", userAgent],
  ];

  const text = rows.map(([label, value]) => `${label}: ${formatNotificationValue(value)}`).join("\n");
  const htmlRows = rows
    .map(([label, value]) => {
      return `<tr><th align="left" style="padding:6px 10px;border-bottom:1px solid #eee;white-space:nowrap;">${escapeHtml(label)}</th><td style="padding:6px 10px;border-bottom:1px solid #eee;">${escapeHtml(formatNotificationValue(value))}</td></tr>`;
    })
    .join("");

  return {
    subject: stage === "company" ? `New Puffle lead: ${companyUrl}` : `Puffle lead added email: ${companyUrl}`,
    text,
    html: `<h2 style="font-family:Arial,sans-serif;">${stage === "company" ? "New Puffle lead" : "Puffle lead contact added"}</h2><table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;">${htmlRows}</table>`,
  };
}

async function sendLeadNotification(input: {
  stage: LeadNotificationStage;
  leadId: string;
  companyUrl: string;
  companyInput?: string | null;
  email?: string | null;
  trackingFields: JsonRecord;
  contactTrackingFields?: JsonRecord;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL ?? process.env.LEAD_NOTIFICATION_FROM;
  const to = getNotificationRecipients();

  if (!apiKey || !from || to.length === 0) {
    console.warn("Landing lead notification skipped: Resend env vars are not configured.");
    return;
  }

  const { subject, text, html } = buildLeadNotificationContent(input);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `landing-lead-${input.stage}-${input.leadId}`,
      },
      body: JSON.stringify({
        from,
        to,
        subject,
        text,
        html,
        tags: [
          { name: "source", value: "landing-leads" },
          { name: "stage", value: input.stage },
        ],
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const body = await response.text();
      console.error("Landing lead notification failed", {
        status: response.status,
        body: body.slice(0, 1000),
      });
      return;
    }

    const result = (await response.json()) as { id?: string };
    console.info("Landing lead notification sent", {
      stage: input.stage,
      leadId: input.leadId,
      emailId: result.id,
    });
  } catch (caughtError) {
    console.error("Landing lead notification failed", caughtError);
  } finally {
    clearTimeout(timeout);
  }
}

function landingLeadError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function GET() {
  try {
    const supabase = getSupabaseClient();
    const { error } = await supabase.from(tableName).select("id").limit(1);

    if (error) {
      console.error("Landing lead health check failed", error);
      return NextResponse.json({ ok: false, error: "database_unavailable" }, { status: 503 });
    }

    return NextResponse.json({ ok: true });
  } catch (caughtError) {
    console.error("Landing lead health check failed", caughtError);
    return NextResponse.json({ ok: false, error: "supabase_not_configured" }, { status: 503 });
  }
}

export async function POST(request: NextRequest) {
  let payload: CompanyPayload | ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return landingLeadError("Invalid request body.");
  }

  try {
    const supabase = getSupabaseClient();

    if (payload.step === "company") {
      const companyUrl = cleanOptional(payload.companyUrl);

      if (!companyUrl) {
        return landingLeadError("Enter a company link.");
      }

      const normalizedCompanyUrl = normalizeCompanyInput(companyUrl);

      if (!normalizedCompanyUrl) {
        return landingLeadError("Enter a valid a company domain");
      }

      const trackingFields = buildLandingLeadTrackingFields(request, payload.clientMetadata);
      const requestHeaders = trackingFields.request_headers;
      const requestMetadata = trackingFields.request_metadata;
      const clientMetadata = trackingFields.client_metadata;

      const { data, error } = await supabase
        .from(tableName)
        .insert({
          company_url: normalizedCompanyUrl,
          company_input: companyUrl,
          source: "homepage",
          status: "company_submitted",
          metadata: {
            company_input: companyUrl,
            request: requestMetadata,
            request_headers: requestHeaders,
            client: clientMetadata,
          },
          ...trackingFields,
        })
        .select("id")
        .single();

      if (error) {
        console.error("Landing lead company save failed", error);
        return landingLeadError("Could not save that company link yet.", 500);
      }

      await sendLeadNotification({
        stage: "company",
        leadId: data.id,
        companyUrl: normalizedCompanyUrl,
        companyInput: companyUrl,
        trackingFields,
      });

      return NextResponse.json({ id: data.id });
    }

    if (payload.step === "contact") {
      const leadId = cleanOptional(payload.leadId);
      const email = cleanOptional(payload.email);

      if (!leadId) {
        return landingLeadError("Missing lead id.");
      }

      if (!email) {
        return landingLeadError("Add an email.");
      }

      const submittedAt = new Date().toISOString();
      const contactTrackingFields = buildContactTrackingFields(request, payload.clientMetadata, submittedAt);

      const { data, error } = await supabase
        .from(tableName)
        .update({
          email,
          status: "contact_submitted",
          updated_at: submittedAt,
          ...contactTrackingFields,
        })
        .eq("id", leadId)
        .select(
          "id, company_url, company_input, visitor_id, session_id, ip_address, ip_chain, page_url, page_referrer, referrer, utm_source, utm_medium, utm_campaign, gclid, country, region, city, timezone, browser_language, platform, viewport_width, viewport_height, screen_width, screen_height, user_agent, request_metadata, client_metadata",
        )
        .single();

      if (error) {
        console.error("Landing lead contact save failed", error);
        return landingLeadError("Could not save your contact details yet.", 500);
      }

      await sendLeadNotification({
        stage: "contact",
        leadId: data.id,
        companyUrl: data.company_url,
        companyInput: data.company_input,
        email,
        trackingFields: cleanJsonObject(data),
        contactTrackingFields,
      });

      return NextResponse.json({ id: data.id });
    }

    return landingLeadError("Unknown lead capture step.");
  } catch (caughtError) {
    console.error("Landing lead request failed", caughtError);
    return landingLeadError("Could not save this right now.", 500);
  }
}
