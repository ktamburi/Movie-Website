"use client";

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

export default function NavBar() {
  const { user, initializing, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const linkBase =
    "whitespace-nowrap rounded-lg px-2.5 py-2 text-xs font-medium text-[color:var(--text-1)] transition-colors hover:bg-[color-mix(in_srgb,var(--surface-2),var(--text-1)_8%)] sm:px-3 sm:text-sm md:px-4";

  return (
    <nav className="sticky top-0 z-50 border-b border-[color:var(--border)] bg-[color-mix(in_srgb,var(--bg)_92%,var(--surface-2))] backdrop-blur-xl md:bg-[color-mix(in_srgb,var(--bg)_88%,var(--surface-2))]">
      <div className="mx-auto grid h-14 max-w-[1400px] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 px-4 md:h-16 md:gap-6 md:px-8">
        <div className="flex min-w-0 items-center justify-self-start">
          <Link href="/" className="truncate text-lg font-bold tracking-tight text-[color:var(--text-1)] md:text-xl">
            Movie App
          </Link>
        </div>

        <div className="flex items-center justify-center gap-1 md:gap-2">
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
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface-2)] p-0 text-[color:var(--text-1)] hover:bg-[color-mix(in_srgb,var(--surface-2),var(--text-1)_10%)] md:size-10"
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
          {initializing ? (
            <span className={`${linkBase} text-[color:var(--text-2)]`}>Loading...</span>
          ) : user ? (
            <>
              <span className="hidden max-w-[140px] truncate text-sm text-[color:var(--text-2)] lg:inline lg:max-w-[220px] xl:max-w-xs">
                {user.email}
              </span>
              <button className={`${linkBase} shrink-0`} onClick={signOut} type="button">
                Sign out
              </button>
            </>
          ) : (
            <Link href="/auth" className={`${linkBase} shrink-0`}>
              Sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
