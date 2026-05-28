import Link from "next/link";

import Header from "./Header";

const TERMLY_API_BASE_URL = "https://app.termly.io/api/v1/consumer/policies";

type LegalPolicy = {
  title: string;
  description: string;
  policyUuid: string;
  sourceUrl: string;
};

type TermlyPolicyResponse = {
  content?: string;
};

export const PRIVACY_POLICY: LegalPolicy = {
  title: "Privacy Policy",
  description:
    "This Privacy Policy describes how DevelopIQ Inc. and Puffle collect, use, disclose, and protect information when you use Puffle's websites, applications, and services.",
  policyUuid: "a66fefbe-11ff-441f-9d4c-42bbd48daf82",
  sourceUrl:
    "https://app.termly.io/policy-viewer/policy.html?policyUUID=a66fefbe-11ff-441f-9d4c-42bbd48daf82",
};

export const TERMS_POLICY: LegalPolicy = {
  title: "Terms of Service",
  description:
    "These Terms of Service govern access to and use of Puffle's websites, applications, and services.",
  policyUuid: "53c9b308-2fea-4556-b207-9bb50dcd2f16",
  sourceUrl:
    "https://app.termly.io/policy-viewer/policy.html?policyUUID=53c9b308-2fea-4556-b207-9bb50dcd2f16",
};

async function getPolicyContent(policyUuid: string) {
  try {
    const response = await fetch(`${TERMLY_API_BASE_URL}/${policyUuid}/content`, {
      next: { revalidate: 21600 },
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as TermlyPolicyResponse;
    return typeof data.content === "string" && data.content.trim().length > 0
      ? data.content
      : null;
  } catch {
    return null;
  }
}

function LegalFooter() {
  return (
    <footer>
      <div className="container footer-bar">
        <span className="footer-logo">Puffle</span>
        <span className="footer-copy">&copy; 2025 DevelopIQ Inc.</span>
        <div className="footer-links">
          <Link href="/pricing">Pricing</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}

export default async function LegalPage({ policy }: { policy: LegalPolicy }) {
  const policyContent = await getPolicyContent(policy.policyUuid);

  return (
    <>
      <Header />
      <main className="legal-page">
        <section className="legal-shell">
          <div className="legal-heading">
            <p className="legal-eyebrow">Puffle legal</p>
            <h1>{policy.title}</h1>
            <p>{policy.description}</p>
            <div className="legal-meta">
              <span>DevelopIQ Inc.</span>
              <a href="mailto:support@puffle.ai">support@puffle.ai</a>
            </div>
          </div>

          <article className="legal-document">
            {policyContent ? (
              <div
                className="legal-policy-content"
                dangerouslySetInnerHTML={{ __html: policyContent }}
              />
            ) : (
              <div className="legal-fallback">
                <p>
                  The published policy is maintained by Termly. Open the source
                  document if the embedded policy does not load.
                </p>
                <a href={policy.sourceUrl} target="_blank" rel="noopener noreferrer">
                  Open {policy.title}
                </a>
              </div>
            )}
          </article>
        </section>
      </main>
      <LegalFooter />
    </>
  );
}
