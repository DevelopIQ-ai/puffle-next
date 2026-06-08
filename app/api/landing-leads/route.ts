import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

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
};

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!url || !secretKey) {
    throw new Error("Supabase env vars are not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY.");
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
    return trimmed.length > 0 ? trimmed.slice(0, 500) : null;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return value;
  }

  if (Array.isArray(value)) {
    return value
      .map((item) => cleanMetadataValue(item, depth + 1))
      .filter((item) => item != null)
      .slice(0, 20);
  }

  if (typeof value === "object" && depth < 2) {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .slice(0, 40)
        .map(([key, item]) => [key, cleanMetadataValue(item, depth + 1)])
        .filter(([, item]) => item != null),
    );
  }

  return null;
}

function collectRequestMetadata(request: NextRequest) {
  return {
    user_agent: request.headers.get("user-agent"),
    referer: request.headers.get("referer"),
    origin: request.headers.get("origin"),
    host: request.headers.get("host"),
    accept_language: request.headers.get("accept-language"),
    forwarded_for: request.headers.get("x-forwarded-for"),
    real_ip: request.headers.get("x-real-ip"),
    country: request.headers.get("x-vercel-ip-country"),
    region: request.headers.get("x-vercel-ip-country-region"),
    city: request.headers.get("x-vercel-ip-city"),
    latitude: request.headers.get("x-vercel-ip-latitude"),
    longitude: request.headers.get("x-vercel-ip-longitude"),
    timezone: request.headers.get("x-vercel-ip-timezone"),
  };
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

      const { data, error } = await supabase
        .from(tableName)
        .insert({
          company_url: normalizedCompanyUrl,
          source: "homepage",
          status: "company_submitted",
          metadata: {
            company_input: companyUrl,
            request: cleanMetadataValue(collectRequestMetadata(request)),
            client: cleanMetadataValue(payload.clientMetadata),
          },
        })
        .select("id")
        .single();

      if (error) {
        console.error("Landing lead company save failed", error);
        return landingLeadError("Could not save that company link yet.", 500);
      }

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

      const { data, error } = await supabase
        .from(tableName)
        .update({
          email,
          status: "contact_submitted",
          updated_at: new Date().toISOString(),
        })
        .eq("id", leadId)
        .select("id")
        .single();

      if (error) {
        console.error("Landing lead contact save failed", error);
        return landingLeadError("Could not save your contact details yet.", 500);
      }

      return NextResponse.json({ id: data.id });
    }

    return landingLeadError("Unknown lead capture step.");
  } catch (caughtError) {
    console.error("Landing lead request failed", caughtError);
    return landingLeadError("Could not save this right now.", 500);
  }
}
