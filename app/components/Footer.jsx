"use client";

import { useEffect, useId, useState } from "react";

import GitHubIcon from "./icons/GitHubIcon";
import InstagramIcon from "./icons/InstagramIcon";
import LinkedInIcon from "./icons/LinkedInIcon";
import PinterestIcon from "./icons/PinterestIcon";
import SpotifyIcon from "./icons/SpotifyIcon";


export default function Footer() {
  const year = new Date().getFullYear();
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (!privacyOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setPrivacyOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [privacyOpen]);

  return (
    <footer className="mt-auto border-t border-[color:var(--border)]">
      <div className="mx-auto w-full max-w-[1400px] px-4 py-6 text-center md:px-8">
        <p className="mx-auto max-w-[900px] text-xs leading-relaxed text-[color:var(--text-2)]">
          Not affiliated with TMDB. Movie data and images belong to their respective owners. Built for educational and
          entertainment purposes.
        </p>

        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-[color:var(--text-2)]">
          <span>© {year}</span>
          <span className="select-none text-[color:var(--border)]" aria-hidden="true">
            |
          </span>
          <a
            className="font-semibold text-[color:var(--text-1)] underline decoration-transparent underline-offset-4 transition hover:decoration-[color:var(--text-1)]"
            href="https://github.com/ktamburi"
            target="_blank"
            rel="noopener noreferrer"
          >
            Klaudia Tamburi
          </a>
          <span className="select-none text-[color:var(--border)]" aria-hidden="true">
            |
          </span>
          <button
            type="button"
            onClick={() => setPrivacyOpen(true)}
            className="font-semibold text-[color:var(--text-1)] underline decoration-transparent underline-offset-4 transition hover:decoration-[color:var(--text-1)]"
          >
            Privacy and Policy
          </button>
          <span className="select-none text-[color:var(--border)]" aria-hidden="true">
            |
          </span>
          <span className="inline-flex items-center gap-2 text-[color:var(--text-1)]">
            <a
              className="inline-flex rounded-md p-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus)]"
              href="https://github.com/ktamburi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <GitHubIcon className="size-[18px]" />
            </a>
            <a
              className="inline-flex rounded-md p-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus)]"
              href="https://www.linkedin.com/in/klaudiatamburi/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="size-[18px]" />
            </a>
            <a
              className="inline-flex rounded-md p-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus)]"
              href="https://www.instagram.com/prettybluesoul/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <InstagramIcon className="size-[18px]" />
            </a>
            <a
              className="inline-flex rounded-md p-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus)]"
              href="https://www.pinterest.com/prettybluesoul/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pinterest"
            >
              <PinterestIcon className="size-[18px]" />
            </a>
            <a
              className="inline-flex rounded-md p-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus)]"
              href="https://open.spotify.com/user/3kw6aa9ugbdtv4gpyu80ho6xx?si=VKIPStRhQOiqHuMdooPP0Q"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Spotify"
            >
              <SpotifyIcon className="size-[18px]" />
            </a>
          </span>
        </div>
      </div>

      {privacyOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center px-4 py-8">
          <button
            type="button"
            className="absolute inset-0 cursor-default bg-black/45"
            aria-label="Close privacy dialog"
            onClick={() => setPrivacyOpen(false)}
          />
          <div className="relative w-full max-w-[560px] rounded-[18px] border border-[color:var(--border)] bg-[color:var(--bg)] p-5 shadow-[0_22px_70px_rgba(0,0,0,0.55)]">
            <div className="mb-3 flex items-start justify-between gap-3">
              <h2 id={titleId} className="text-lg font-semibold text-[color:var(--text-1)]">
                Privacy and Policy
              </h2>
              <button
                type="button"
                className="inline-flex size-9 items-center justify-center rounded-[10px] border border-[color:var(--border)] bg-[color:var(--surface-2)] text-[color:var(--text-1)] transition hover:bg-[color-mix(in_srgb,var(--surface-2),var(--text-1)_10%)]"
                onClick={() => setPrivacyOpen(false)}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="space-y-3 text-sm leading-relaxed text-[color:var(--text-2)]" role="dialog" aria-labelledby={titleId}>
              <p>
                This app runs in your browser. Your sign-in uses Firebase Authentication, and your favorites/watched lists are stored
                in Firebase Realtime Database under your account.
              </p>
              <p>
                Movie data comes from TMDB. Requests are proxied through this app's server routes.
              </p>
              <p>
                You can delete your account with all the saved data by clicking delete account in the profile menu in the navbar.
              </p>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}

