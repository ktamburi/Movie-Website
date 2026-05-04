"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

function IconSun({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
      />
    </svg>
  );
}

function IconMoon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
      />
    </svg>
  );
}

function IconSettings({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 15.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7z"
      />
      <path
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.14 12.94a7.4 7.4 0 000-1.88l2.02-1.57a.7.7 0 00.17-.9l-1.9-3.3a.7.7 0 00-.86-.3l-2.38.96a7.43 7.43 0 00-1.63-.94l-.36-2.53A.7.7 0 0013.5 2h-3.8a.7.7 0 00-.7.59l-.36 2.53c-.58.23-1.13.55-1.63.94l-2.38-.96a.7.7 0 00-.86.3l-1.9 3.3a.7.7 0 00.17.9l2.02 1.57a7.4 7.4 0 000 1.88l-2.02 1.57a.7.7 0 00-.17.9l1.9 3.3a.7.7 0 00.86.3l2.38-.96c.5.39 1.05.71 1.63.94l.36 2.53a.7.7 0 00.7.59h3.8a.7.7 0 00.7-.59l.36-2.53c.58-.23 1.13-.55 1.63-.94l2.38.96a.7.7 0 00.86-.3l1.9-3.3a.7.7 0 00-.17-.9l-2.02-1.57z"
      />
    </svg>
  );
}

function IconUser({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 21a8 8 0 10-16 0"
      />
      <path
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 13a4 4 0 100-8 4 4 0 000 8z"
      />
    </svg>
  );
}

export default function NavBar() {
  const { user, initializing, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const mobileGearRef = useRef(null);
  const profileMenuRef = useRef(null);
  const profileBtnRef = useRef(null);

  const linkBase =
    "whitespace-nowrap px-2.5 py-2 text-xs font-medium text-[color:var(--text-2)] transition-colors hover:text-[color:var(--text-1)] active:text-[color:var(--text-1)] sm:px-3 sm:text-sm md:px-4";

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    const onPointerDown = (e) => {
      const menuEl = mobileMenuRef.current;
      const gearEl = mobileGearRef.current;
      if (!menuEl || !gearEl) return;
      if (menuEl.contains(e.target) || gearEl.contains(e.target)) return;
      setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!profileMenuOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setProfileMenuOpen(false);
    };
    const onPointerDown = (e) => {
      const menuEl = profileMenuRef.current;
      const btnEl = profileBtnRef.current;
      if (!menuEl || !btnEl) return;
      if (menuEl.contains(e.target) || btnEl.contains(e.target)) return;
      setProfileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [profileMenuOpen]);

  return (
    <nav className="sticky top-0 z-50 border-b border-[color:var(--border)] bg-[color-mix(in_srgb,var(--bg)_92%,var(--surface-2))] backdrop-blur-xl md:bg-[color-mix(in_srgb,var(--bg)_88%,var(--surface-2))]">
      <div className="mx-auto grid h-14 max-w-[1400px] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 px-4 md:h-16 md:gap-6 md:px-8">
        <div className="flex min-w-0 items-center justify-self-start">
          <Link href="/" className="truncate text-lg font-bold tracking-tight text-[color:var(--text-1)] md:text-xl">
            <span className="sm:hidden">Movies</span>
            <span className="hidden sm:inline">Movie App</span>
          </Link>
        </div>

        <div className="flex items-center justify-center justify-self-center gap-1 md:gap-2">
          <Link href="/" className={linkBase}>
            Home
          </Link>
          <Link href="/favorites" className={linkBase}>
            Favorites
          </Link>
          <Link href="/watched" className={linkBase}>
            Watched
          </Link>
        </div>

        <div className="flex min-w-0 items-center justify-end justify-self-end gap-2 md:gap-3">
          <button
            ref={mobileGearRef}
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface-2)] p-0 text-[color:var(--text-1)] hover:bg-[color-mix(in_srgb,var(--surface-2),var(--text-1)_10%)] md:hidden"
            type="button"
            onClick={() => setMobileMenuOpen((s) => !s)}
            aria-label="Open settings"
            aria-expanded={mobileMenuOpen}
          >
            <IconSettings className="size-[18px] shrink-0" />
          </button>

          <button
            className="hidden size-9 shrink-0 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface-2)] p-0 text-[color:var(--text-1)] hover:bg-[color-mix(in_srgb,var(--surface-2),var(--text-1)_10%)] md:inline-flex md:size-10"
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? (
              <IconMoon className="size-[18px] shrink-0 md:size-5" />
            ) : (
              <IconSun className="size-[18px] shrink-0 md:size-5" />
            )}
          </button>

          {!initializing && user && (
            <div className="relative hidden md:block lg:hidden">
              <button
                ref={profileBtnRef}
                className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface-2)] p-0 text-[color:var(--text-1)] hover:bg-[color-mix(in_srgb,var(--surface-2),var(--text-1)_10%)] md:size-10"
                type="button"
                onClick={() => setProfileMenuOpen((s) => !s)}
                aria-label="Account"
                aria-expanded={profileMenuOpen}
              >
                <IconUser className="size-[18px] shrink-0 md:size-5" />
              </button>

              {profileMenuOpen && (
                <div
                  ref={profileMenuRef}
                  className="absolute right-0 top-12 z-50 w-[280px] rounded-[14px] border border-[color:var(--border)] bg-[color:var(--bg)] p-3 shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
                  role="dialog"
                  aria-label="Account menu"
                >
                  <div className="mb-2 rounded-[10px] border border-[color:var(--border)] bg-[color:var(--surface-2)] px-3 py-2">
                    <div className="text-xs text-[color:var(--text-2)]">Signed in</div>
                    <div className="truncate text-sm text-[color:var(--text-1)]">{user.email}</div>
                  </div>
                  <button
                    className="inline-flex w-full items-center justify-center rounded-[10px] bg-[color:var(--primary)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[color:var(--primary-hover)]"
                    type="button"
                    onClick={async () => {
                      await signOut();
                      setProfileMenuOpen(false);
                    }}
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          )}
          {initializing ? (
            <span className={`${linkBase} text-[color:var(--text-2)]`}>Loading...</span>
          ) : user ? (
            <>
              <span className="hidden max-w-[140px] truncate text-sm text-[color:var(--text-2)] lg:inline lg:max-w-[220px] xl:max-w-xs">
                {user.email}
              </span>
              <button className={`${linkBase} hidden shrink-0 lg:inline-flex`} onClick={signOut} type="button">
                Sign out
              </button>
            </>
          ) : (
            <Link href="/auth" className={`${linkBase} hidden shrink-0 md:inline-flex`}>
              Sign in
            </Link>
          )}
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden">
          <div
            ref={mobileMenuRef}
            className="fixed right-3 top-16 z-50 w-[min(86vw,300px)] rounded-[14px] border border-[color:var(--border)] bg-[color:var(--bg)] p-3 shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
            role="dialog"
            aria-label="Settings"
          >
            {initializing ? (
              <div className="rounded-[10px] px-3 py-2 text-sm text-[color:var(--text-2)]">Loading…</div>
            ) : user ? (
              <div className="mb-2 rounded-[10px] border border-[color:var(--border)] bg-[color:var(--surface-2)] px-3 py-2">
                <div className="text-xs text-[color:var(--text-2)]">Signed in</div>
                <div className="truncate text-sm text-[color:var(--text-1)]">{user.email}</div>
              </div>
            ) : (
              <div className="mb-2 rounded-[10px] border border-[color:var(--border)] bg-[color:var(--surface-2)] px-3 py-2 text-sm text-[color:var(--text-2)]">
                Not signed in
              </div>
            )}

            <div className="grid gap-2">
              <button
                className="inline-flex w-full items-center justify-between rounded-[10px] border border-[color:var(--border)] bg-[color:var(--surface-2)] px-3 py-2.5 text-sm font-medium text-[color:var(--text-1)]"
                type="button"
                onClick={() => {
                  toggleTheme();
                  setMobileMenuOpen(false);
                }}
              >
                <span>Theme</span>
                {theme === "dark" ? <IconSun className="size-4" /> : <IconMoon className="size-4" />}
              </button>

              {user ? (
                <button
                  className="inline-flex w-full items-center justify-center rounded-[10px] bg-[color:var(--primary)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[color:var(--primary-hover)]"
                  type="button"
                  onClick={async () => {
                    await signOut();
                    setMobileMenuOpen(false);
                  }}
                >
                  Sign out
                </button>
              ) : (
                <Link
                  href="/auth"
                  className="inline-flex w-full items-center justify-center rounded-[10px] bg-[color:var(--primary)] px-4 py-2.5 text-sm font-semibold text-white no-underline transition hover:bg-[color:var(--primary-hover)]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign in
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
