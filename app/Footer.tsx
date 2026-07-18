import Link from "next/link";
import { legalRoutes } from "./legalPolicies";
import { CONTACT_EMAIL } from "./site";

const FOOTER_NAVIGATION = [
  { href: "/ai-growth-hire", label: "AI growth employee" },
  { href: "/pricing", label: "Pricing" },
] as const;

export default function Footer() {
  return (
    <footer>
      <div className="container footer-bar">
        <span className="footer-logo">Puffle</span>
        <span className="footer-copy">&copy; 2026 DevelopIQ Inc.</span>
        <div className="footer-links">
          {FOOTER_NAVIGATION.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
          <Link href="/about">About</Link>
          <a href={`mailto:${CONTACT_EMAIL}`}>Contact</a>
          <a href="mailto:careers@puffle.ai">Careers</a>
          <Link href={legalRoutes.privacy}>Privacy Policy</Link>
          <Link href={legalRoutes.terms}>Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
