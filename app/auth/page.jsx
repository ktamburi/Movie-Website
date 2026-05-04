"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function AuthPage() {
  const router = useRouter();
  const { signInWithEmail, signUpWithEmail, authError, clearAuthError } = useAuth();

  const [mode, setMode] = useState("signin");
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
      console.error(err);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid min-h-[calc(100vh-80px)] place-items-center px-4 py-10">
      <div className="w-full max-w-[460px] rounded-[14px] border border-[color:var(--border)] bg-[color:var(--surface-2)] p-7 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
        <h1 className="mb-2 text-center text-3xl text-[color:var(--text-1)]">
          {mode === "signup" ? "Create account" : "Sign in"}
        </h1>
        <p className="mb-5 text-center text-[color:var(--text-2)]">Use email/password to save favorites and watched movies.</p>

        <form onSubmit={submit} className="mt-3 grid gap-3">
          <input
            className="w-full rounded-[10px] border border-[color:var(--border)] bg-[color-mix(in_srgb,var(--surface-2),var(--bg)_35%)] px-4 py-3.5 text-[color:var(--text-1)] focus:border-[color-mix(in_srgb,var(--primary),white_10%)] focus:outline-none focus:ring-2 focus:ring-[color:var(--focus)]"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <input
            className="w-full rounded-[10px] border border-[color:var(--border)] bg-[color-mix(in_srgb,var(--surface-2),var(--bg)_35%)] px-4 py-3.5 text-[color:var(--text-1)] focus:border-[color-mix(in_srgb,var(--primary),white_10%)] focus:outline-none focus:ring-2 focus:ring-[color:var(--focus)]"
            type="password"
            placeholder="Password (min 6 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            autoComplete={mode === "signup" ? "new-password" : "current-password"}
          />
          <button
            className="w-full rounded-[10px] bg-[color:var(--primary)] py-3.5 font-semibold text-white transition hover:-translate-y-px hover:bg-[color:var(--primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus)] disabled:cursor-not-allowed disabled:opacity-65 disabled:hover:translate-y-0"
            type="submit"
            disabled={busy}
          >
            {busy ? "Please wait..." : mode === "signup" ? "Create account" : "Sign in"}
          </button>
        </form>

        {authError && (
          <div className="mt-3 rounded-[10px] border border-red-500/25 bg-red-500/10 px-3 py-3 text-left text-sm text-red-200 break-words">
            {String(authError)}
          </div>
        )}

        <div className="mt-4 flex justify-center">
          {mode === "signup" ? (
            <button
              className="text-[color-mix(in_srgb,var(--primary),white_40%)] underline decoration-[3px] underline-offset-[3px] hover:text-[color:var(--text-1)]"
              type="button"
              onClick={() => setMode("signin")}
            >
              I already have an account
            </button>
          ) : (
            <button
              className="text-[color-mix(in_srgb,var(--primary),white_40%)] underline decoration-[3px] underline-offset-[3px] hover:text-[color:var(--text-1)]"
              type="button"
              onClick={() => setMode("signup")}
            >
              Create an account
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
