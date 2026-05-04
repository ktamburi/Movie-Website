"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function AuthPage() {
  const router = useRouter();
  const { signInWithEmail, signUpWithEmail, authError, clearAuthError } = useAuth();

  const [mode, setMode] = useState("signin"); // signin | signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    clearAuthError?.();
    setBusy(true);
    try {
      if (mode === "signup") await signUpWithEmail(email, password);
      else await signInWithEmail(email, password);
      router.push("/");
    } catch (err) {
      // AuthContext stores errors too; this is just a fallback.
      // eslint-disable-next-line no-console
      console.error(err);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">{mode === "signup" ? "Create account" : "Sign in"}</h1>
        <p className="auth-subtitle">Use email/password to save favorites and watched movies.</p>

        <form onSubmit={submit} className="auth-form">
          <input
            className="auth-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <input
            className="auth-input"
            type="password"
            placeholder="Password (min 6 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            autoComplete={mode === "signup" ? "new-password" : "current-password"}
          />
          <button className="auth-primary" type="submit" disabled={busy}>
            {busy ? "Please wait..." : mode === "signup" ? "Create account" : "Sign in"}
          </button>
        </form>

        {authError && <div className="auth-error">{String(authError)}</div>}

        <div className="auth-footer">
          {mode === "signup" ? (
            <button className="auth-link" type="button" onClick={() => setMode("signin")}>
              I already have an account
            </button>
          ) : (
            <button className="auth-link" type="button" onClick={() => setMode("signup")}>
              Create an account
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

