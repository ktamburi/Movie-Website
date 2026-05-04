"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function NavBar() {
  const { user, initializing, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link href="/">Movie App</Link>
      </div>
      <div className="navbar-links">
        <Link href="/" className="nav-link">
          Home
        </Link>
        <Link href="/favorites" className="nav-link">
          Favorites
        </Link>
        <Link href="/watched" className="nav-link">
          Watched
        </Link>
      </div>
      <div className="navbar-links">
        <button
          className="theme-toggle"
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        >
          {theme === "dark" ? "☾" : "☀"}
        </button>
        {initializing ? (
          <span className="nav-link">Loading...</span>
        ) : user ? (
          <>
            <span className="nav-link">{user.email}</span>
            <button className="nav-link" onClick={signOut} type="button">
              Sign out
            </button>
          </>
        ) : (
          <Link href="/auth" className="nav-link">
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
}

