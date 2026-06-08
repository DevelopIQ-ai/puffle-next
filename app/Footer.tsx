import Link from "next/link";
import { legalRoutes } from "./legalPolicies";

export default function Footer() {
  return (
    <footer>
      <div className="container footer-bar">
        <span className="footer-logo">Puffle</span>
        <span className="footer-copy">&copy; 2026 DevelopIQ Inc.</span>
        <div className="footer-links">
          <a href="mailto:careers@puffle.ai">Careers</a>
          <Link href={legalRoutes.privacy}>Privacy Policy</Link>
          <Link href={legalRoutes.terms}>Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
