import Footer from "./Footer";
import Header from "./Header";
import type { LegalPolicy } from "./legalPolicies";

interface LegalPolicyPageProps {
  policy: LegalPolicy;
}

export default function LegalPolicyPage({ policy }: LegalPolicyPageProps) {
  return (
    <>
      <Header />
      <main className="legal-page">
        <section className="container legal-container">
          <h1>{policy.title}</h1>
          <article
            className="legal-policy-content"
            dangerouslySetInnerHTML={{ __html: policy.contentHtml }}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
