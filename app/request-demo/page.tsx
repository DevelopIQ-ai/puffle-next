import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function RequestDemoPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  if (user.app_metadata?.approved) {
    redirect("/dashboard");
  }

  return (
    <div className="request-demo-page">
      <div className="request-demo-card">
        <a href="/" className="request-demo-logo">
          <Image
            src="/spiked-ball.svg"
            alt="Puffle Logo"
            width={24}
            height={24}
            style={{ filter: "invert(1) brightness(2)" }}
          />
          Puffle
        </a>

        <h1 className="request-demo-heading">You&rsquo;re on the list</h1>
        <p className="request-demo-subtext">
          Your account is pending approval. In the meantime, book a demo to see
          Puffle in action.
        </p>

        <a
          href="https://zcal.co/i/BT5kddcb"
          target="_blank"
          rel="noopener noreferrer"
          className="request-demo-button"
        >
          Book a Demo
        </a>
      </div>

      <style>{`
        .request-demo-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #000;
          padding: 2rem;
        }
        .request-demo-card {
          width: 100%;
          max-width: 380px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .request-demo-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-serif);
          font-weight: 700;
          font-size: 1.4rem;
          color: var(--text-primary);
          text-decoration: none;
          margin-bottom: 2.5rem;
        }
        .request-demo-heading {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          font-weight: 500;
          color: var(--text-primary);
          text-align: center;
          margin-bottom: 0.5rem;
        }
        .request-demo-subtext {
          color: var(--text-secondary);
          font-size: 0.875rem;
          text-align: center;
          margin-bottom: 2rem;
          line-height: 1.5;
        }
        .request-demo-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 0.75rem;
          background-color: var(--accent-primary);
          color: white;
          border: none;
          border-radius: 0.375rem;
          font-size: 0.9rem;
          font-family: var(--font-serif);
          font-weight: 500;
          cursor: pointer;
          letter-spacing: 0.03em;
          text-decoration: none;
          transition: background-color 0.15s ease;
        }
        .request-demo-button:hover {
          background-color: var(--accent-hover);
        }
      `}</style>
    </div>
  );
}
