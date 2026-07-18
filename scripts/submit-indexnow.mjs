const key = "0f4df27b87f14b35b94841f316942b99";
const host = "www.puffle.ai";
const baseUrl = `https://${host}`;

const paths = [
  "/",
  "/ai-gtm-agent",
  "/how-it-works",
  "/founder-led-gtm",
  "/outbound-automation",
  "/compare/puffle-vs-clay",
  "/pricing",
  "/about",
];

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host,
    key,
    keyLocation: `${baseUrl}/${key}.txt`,
    urlList: paths.map((path) => `${baseUrl}${path}`),
  }),
});

if (![200, 202].includes(response.status)) {
  const body = await response.text();
  throw new Error(`IndexNow submission failed (${response.status}): ${body}`);
}

console.log(`IndexNow accepted ${paths.length} Puffle URLs (${response.status}).`);
