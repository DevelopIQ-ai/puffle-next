import Link from "next/link";

import Footer from "./Footer";
import Header from "./Header";
import JsonLd from "./JsonLd";
import { SITE_NAME, SITE_URL, WAITLIST_URL } from "./site";

type Faq = {
  question: string;
  answer: string;
};

type MarketingPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  canonicalPath: string;
  children: React.ReactNode;
  faqs?: readonly Faq[];
  primaryCta?: string;
};

export function MarketingSection({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="content-section">
      <div className="content-section-heading">
        <h2>{title}</h2>
        {intro ? <p>{intro}</p> : null}
      </div>
      {children}
    </section>
  );
}

export function StepList({
  items,
}: {
  items: readonly { title: string; description: string }[];
}) {
  return (
    <ol className="content-step-list">
      {items.map((item, index) => (
        <li key={item.title}>
          <span className="content-step-number">{index + 1}</span>
          <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function CardGrid({
  items,
}: {
  items: readonly { title: string; description: string }[];
}) {
  return (
    <div className="content-card-grid">
      {items.map((item) => (
        <article className="content-card" key={item.title}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </article>
      ))}
    </div>
  );
}

export default function MarketingPage({
  eyebrow,
  title,
  description,
  canonicalPath,
  children,
  faqs = [],
  primaryCta = "Join the waitlist",
}: MarketingPageProps) {
  const pageUrl = `${SITE_URL}${canonicalPath}`;
  const structuredData: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      description,
      url: pageUrl,
      isPartOf: {
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Puffle",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: title,
          item: pageUrl,
        },
      ],
    },
  ];

  if (faqs.length > 0) {
    structuredData.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });
  }

  return (
    <>
      <JsonLd data={structuredData} />
      <Header />
      <main className="content-page">
        <article className="content-shell">
          <header className="content-hero">
            <p className="content-eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
            <p className="content-dek">{description}</p>
            <div className="content-actions">
              <Link className="btn btn-primary large" href={WAITLIST_URL}>
                {primaryCta}
              </Link>
              <Link className="content-text-link" href="/how-it-works">
                See how it works
              </Link>
            </div>
          </header>

          {children}

          {faqs.length > 0 ? (
            <section className="content-section content-faq-section">
              <div className="content-section-heading">
                <h2>Frequently asked questions</h2>
              </div>
              <div className="content-faq-list">
                {faqs.map((faq) => (
                  <details key={faq.question}>
                    <summary>{faq.question}</summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          ) : null}

          <section className="content-bottom-cta">
            <p className="content-eyebrow">Your growth function, compressed</p>
            <h2>Keep your growth loop moving.</h2>
            <Link className="btn btn-primary large" href={WAITLIST_URL}>
              Join the waitlist
            </Link>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
