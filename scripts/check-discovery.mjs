const baseUrl = (process.env.PUFFLE_SITE_URL || "https://www.puffle.ai").replace(
  /\/$/,
  "",
);

const pageChecks = [
  ["/", "AI GTM Operator"],
  ["/ai-gtm-agent", "AI GTM Agent"],
  ["/how-it-works", "How Puffle Works"],
  ["/founder-led-gtm", "Founder-Led GTM"],
  ["/outbound-automation", "AI Outbound Automation"],
  ["/compare/puffle-vs-clay", "Puffle vs. Clay"],
  ["/pricing", "Pricing"],
  ["/about", "About Puffle"],
];

const failures = [];
const results = [];

async function get(path) {
  const response = await fetch(`${baseUrl}${path}`, {
    redirect: "follow",
    headers: { "user-agent": "PuffleDiscoveryAudit/1.0" },
  });
  return { response, body: await response.text() };
}

for (const [path, titleFragment] of pageChecks) {
  try {
    const { response, body } = await get(path);
    const checks = {
      status: response.ok,
      title: new RegExp(`<title>[^<]*${titleFragment}`, "i").test(body),
      description: /<meta[^>]+name=["']description["'][^>]+content=["'][^"']+/i.test(
        body,
      ),
      canonical: new RegExp(
        `<link[^>]+rel=["']canonical["'][^>]+href=["']${baseUrl.replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&",
        )}${path === "/" ? "/?" : path}`,
        "i",
      ).test(body),
      structuredData: /application\/ld\+json/i.test(body),
    };

    const failedChecks = Object.entries(checks)
      .filter(([, passed]) => !passed)
      .map(([name]) => name);

    results.push({ path, status: response.status, failedChecks });
    if (failedChecks.length > 0) {
      failures.push(`${path}: ${failedChecks.join(", ")}`);
    }
  } catch (error) {
    failures.push(`${path}: ${error.message}`);
  }
}

for (const path of ["/robots.txt", "/sitemap.xml", "/llms.txt", "/.well-known/integrations.json"]) {
  try {
    const { response, body } = await get(path);
    const passed = response.ok && body.trim().length > 40;
    results.push({ path, status: response.status, failedChecks: passed ? [] : ["content"] });
    if (!passed) failures.push(`${path}: missing or empty`);
  } catch (error) {
    failures.push(`${path}: ${error.message}`);
  }
}

console.table(
  results.map((result) => ({
    path: result.path,
    status: result.status,
    result:
      result.failedChecks.length === 0
        ? "pass"
        : `fail: ${result.failedChecks.join(", ")}`,
  })),
);

if (failures.length > 0) {
  console.error(`\nDiscovery audit failed:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}

console.log(`\nDiscovery audit passed for ${baseUrl}.`);
