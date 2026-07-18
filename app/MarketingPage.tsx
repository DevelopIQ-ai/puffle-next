import Link from "next/link";

import Footer from "./Footer";
import Header from "./Header";
import JsonLd from "./JsonLd";
import { APP_URL, SITE_NAME, SITE_URL } from "./site";

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
  primaryCta = "Try Puffle free",
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
              <a className="btn btn-primary large" href={APP_URL}>
                {primaryCta}
              </a>
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
            <p className="content-eyebrow">Turn strategy into action</p>
            <h2>Give Puffle your company. Get the next GTM move.</h2>
            <a className="btn btn-primary large" href={APP_URL}>
              Try Puffle free
            </a>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
