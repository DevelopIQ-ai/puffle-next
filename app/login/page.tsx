"use client";

import { useState } from "react";
import { signIn, signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error } = await signIn.email({ email, password });
      if (error) {
        setError("Invalid email or password.");
        return;
      }
      router.push("/dashboard");
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }
    setLoading(true);

    try {
      const { error } = await signUp.email({ email, password, name });
      if (error) {
        setError(error.message ?? "Sign up failed");
        return;
      }
      router.push("/dashboard");
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <a href="/" className="login-logo">
          <Image
            src="/spiked-ball.svg"
            alt="Puffle Logo"
            width={24}
            height={24}
            style={{ filter: "invert(1) brightness(2)" }}
          />
          Puffle
        </a>

        <h1 className="login-heading">
          {isSignUp ? "Create an account" : "Sign in to Puffle"}
        </h1>
        <p className="login-subtext">
          {isSignUp
            ? "Enter your details to get started."
            : "Enter your email and password to continue."}
        </p>

        {error && <p className="login-error">{error}</p>}

        <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="login-form">
          {isSignUp && (
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="login-input"
              autoFocus
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className="login-input"
          />
          <button type="submit" disabled={loading} className="login-button">
            {loading ? (
              <span className="loading-dots">
                <span />
                <span />
                <span />
              </span>
            ) : isSignUp ? (
              "Get Started"
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="login-toggle">
          {isSignUp ? "Already have an account?" : "Don\u2019t have an account?"}{" "}
          <button
            type="button"
            onClick={() => { setIsSignUp(!isSignUp); setError(""); }}
            className="login-toggle-btn"
          >
            {isSignUp ? "Sign in" : "Sign up"}
          </button>
        </p>
      </div>

      <style jsx>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #000;
          padding: 2rem;
        }
        .login-card {
          width: 100%;
          max-width: 380px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .login-logo {
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
        .login-heading {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          font-weight: 500;
          color: var(--text-primary);
          text-align: center;
          margin-bottom: 0.5rem;
        }
        .login-subtext {
          color: var(--text-secondary);
          font-size: 0.875rem;
          text-align: center;
          margin-bottom: 2rem;
          line-height: 1.5;
        }
        .login-error {
          color: #ff4444;
          font-size: 0.8rem;
          text-align: center;
          padding: 0.625rem 1rem;
          background-color: rgba(139, 0, 0, 0.1);
          border-radius: 0.375rem;
          border: 1px solid rgba(139, 0, 0, 0.25);
          width: 100%;
          margin-bottom: 1rem;
        }
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 0.625rem;
          width: 100%;
        }
        .login-input {
          width: 100%;
          padding: 0.75rem 0.875rem;
          background-color: #0a0a0a;
          border: 1px solid #222;
          border-radius: 0.375rem;
          color: var(--text-primary);
          font-size: 0.9rem;
          font-family: var(--font-sans);
          outline: none;
          transition: border-color 0.15s ease;
        }
        .login-input:focus {
          border-color: #444;
        }
        .login-input::placeholder {
          color: #555;
        }
        .login-button {
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
          margin-top: 0.25rem;
          transition: background-color 0.15s ease;
          min-height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .login-button:hover {
          background-color: var(--accent-hover);
        }
        .login-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .login-toggle {
          color: var(--text-secondary);
          font-size: 0.825rem;
          text-align: center;
          margin-top: 1.25rem;
        }
        .login-toggle-btn {
          background: none;
          border: none;
          color: var(--accent-primary);
          font-size: 0.825rem;
          font-family: var(--font-sans);
          cursor: pointer;
          padding: 0;
          text-decoration: none;
        }
        .login-toggle-btn:hover {
          text-decoration: underline;
        }
        .loading-dots {
          display: inline-flex;
          gap: 4px;
          align-items: center;
        }
        .loading-dots span {
          width: 6px;
          height: 6px;
          background-color: white;
          border-radius: 50%;
          animation: bounce 1.2s infinite ease-in-out;
        }
        .loading-dots span:nth-child(2) {
          animation-delay: 0.15s;
        }
        .loading-dots span:nth-child(3) {
          animation-delay: 0.3s;
        }
        @keyframes bounce {
          0%,
          80%,
          100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          40% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
