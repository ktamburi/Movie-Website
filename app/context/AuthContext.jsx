"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { ref, remove } from "firebase/database";
import { auth, rtdb } from "../lib/firebaseClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    if (!auth) {
      setInitializing(false);
      return;
    }
    const unsub = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setInitializing(false);
    });
    return () => unsub();
  }, []);

  const value = useMemo(() => {
    return {
      user,
      initializing,
      authError,
      clearAuthError: () => setAuthError(null),
      signInWithEmail: async (email, password) => {
        setAuthError(null);
        try {
          await signInWithEmailAndPassword(auth, email, password);
        } catch (e) {
          setAuthError(e?.message || "Sign in failed");
          throw e;
        }
      },
      signUpWithEmail: async (email, password) => {
        setAuthError(null);
        try {
          await createUserWithEmailAndPassword(auth, email, password);
        } catch (e) {
          setAuthError(e?.message || "Sign up failed");
          throw e;
        }
      },
      signOut: async () => {
        setAuthError(null);
        await signOut(auth);
      },
      deleteAccount: async () => {
        setAuthError(null);
        const current = auth?.currentUser;
        if (!current) return;
        try {
          if (rtdb) {
            await remove(ref(rtdb, `users/${current.uid}`));
          }
          await deleteUser(current);
        } catch (e) {
          setAuthError(e?.message || "Delete account failed");
          throw e;
        }
      },
    };
  }, [user, initializing, authError]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

