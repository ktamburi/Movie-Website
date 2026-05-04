"use client";

import { AuthProvider } from "../context/AuthContext";
import { MovieProvider } from "../context/MovieContext";
import { ThemeProvider } from "../context/ThemeContext";

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MovieProvider>{children}</MovieProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

