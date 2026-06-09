import { Resend } from "resend";

export type LandingLeadNotification = {
  step: "company" | "contact";
  leadId: string;
  companyInput?: string | null;
  companyUrl?: string | null;
  email?: string | null;
  pageUrl?: string | null;
  requestUrl?: string | null;
  submittedAt?: string | null;
};

let cachedApiKey: string | null = null;
let cachedResend: Resend | null = null;

function getResendClient(apiKey: string) {
  if (!cachedResend || cachedApiKey !== apiKey) {
    cachedApiKey = apiKey;
    cachedResend = new Resend(apiKey);
  }

  return cachedResend;
}

function getNotificationRecipients() {
  const recipientValue =
    process.env.LEAD_NOTIFICATION_EMAILS ??
    process.env.LEAD_NOTIFICATION_EMAIL ??
    process.env.RESEND_NOTIFICATION_EMAIL ??
    process.env.NOTIFICATION_EMAIL;

  return (
    recipientValue
      ?.split(",")
      .map((email) => email.trim())
      .filter(Boolean)
      .slice(0, 50) ?? []
  );
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isValidEmailAddress(value: string | null | undefined): value is string {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function compactValue(value: string | null | undefined) {
  return value && value.trim().length > 0 ? value.trim() : null;
}

function buildNotificationContent(notification: LandingLeadNotification) {
  const title = notification.step === "contact" ? "New Puffle lead email" : "New Puffle company lead";
  const primaryValue =
    notification.step === "contact"
      ? compactValue(notification.email)
      : compactValue(notification.companyUrl) ?? compactValue(notification.companyInput);

  const fields: Array<[string, string | null | undefined]> = [
    ["Step", notification.step],
    ["Lead ID", notification.leadId],
    ["Company input", notification.companyInput],
    ["Normalized company", notification.companyUrl],
    ["Email", notification.email],
    ["Page URL", notification.pageUrl],
    ["Request URL", notification.requestUrl],
    ["Submitted at", notification.submittedAt ?? new Date().toISOString()],
  ];
  const visibleFields = fields.filter((field): field is [string, string] => Boolean(compactValue(field[1])));

  const text = [
    title,
    "",
    ...visibleFields.map(([label, value]) => `${label}: ${value}`),
  ].join("\n");

  const rows = visibleFields
    .map(
      ([label, value]) =>
        `<tr><th align="left" style="padding:6px 12px 6px 0;">${escapeHtml(label)}</th><td style="padding:6px 0;">${escapeHtml(
          value,
        )}</td></tr>`,
    )
    .join("");

  return {
    subject: primaryValue ? `${title}: ${primaryValue}` : title,
    text,
    html: `<h1>${escapeHtml(title)}</h1><table>${rows}</table>`,
  };
}

export async function sendLandingLeadNotification(notification: LandingLeadNotification) {
  const apiKey = process.env.RESEND_API_KEY;
  const recipients = getNotificationRecipients();
  const from = compactValue(process.env.RESEND_FROM_EMAIL) ?? "Puffle <puffle@sender.puffle.ai>";

  if (!apiKey || recipients.length === 0) {
    console.warn("Landing lead notification skipped", {
      missingResendApiKey: !apiKey,
      missingRecipient: recipients.length === 0,
    });
    return;
  }

  try {
    const content = buildNotificationContent(notification);
    const { error } = await getResendClient(apiKey).emails.send(
      {
        from,
        to: recipients,
        subject: content.subject,
        text: content.text,
        html: content.html,
        replyTo: isValidEmailAddress(notification.email) ? notification.email : undefined,
        tags: [
          { name: "source", value: "landing_lead" },
          { name: "step", value: notification.step },
        ],
      },
      {
        idempotencyKey: `landing-lead-${notification.step}-${notification.leadId}`,
      },
    );

    if (error) {
      console.error("Landing lead notification email failed", error);
    }
  } catch (caughtError) {
    console.error("Landing lead notification email failed", caughtError);
  }
}
