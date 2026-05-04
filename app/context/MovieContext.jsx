"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { onValue, ref, remove, set } from "firebase/database";
import { rtdb } from "../lib/firebaseClient";
import { useAuth } from "./AuthContext";

const MovieContext = createContext(null);

export const useMovieContext = () => useContext(MovieContext);

export function MovieProvider({ children }) {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [watched, setWatched] = useState([]);
  const [loadingLibrary, setLoadingLibrary] = useState(false);

  const favoritesById = useMemo(() => {
    const map = new Map();
    for (const m of favorites) map.set(m.id, m);
    return map;
  }, [favorites]);

  const watchedById = useMemo(() => {
    const map = new Map();
    for (const m of watched) map.set(m.id, m);
    return map;
  }, [watched]);

  const savedMoviesById = useMemo(() => {
    const map = new Map();
    for (const [id, m] of favoritesById) map.set(id, m);
    for (const [id, m] of watchedById) map.set(id, m);
    return map;
  }, [favoritesById, watchedById]);

  useEffect(() => {
    if (!user || !rtdb) {
      setFavorites([]);
      setWatched([]);
      return;
    }

    setLoadingLibrary(true);
    const favRef = ref(rtdb, `users/${user.uid}/favorites`);
    const watchedRef = ref(rtdb, `users/${user.uid}/watched`);

    const unsubFav = onValue(
      favRef,
      (snap) => {
        const v = snap.val() || {};
        setFavorites(Object.values(v));
      },
      () => {}
    );

    const unsubWatched = onValue(
      watchedRef,
      (snap) => {
        const v = snap.val() || {};
        const list = Object.values(v).sort((a, b) => (b.watchedAt || 0) - (a.watchedAt || 0));
        setWatched(list);
      },
      () => {}
    );

    setLoadingLibrary(false);
    return () => {
      unsubFav();
      unsubWatched();
    };
  }, [user]);

  const addMovieToFavorites = (movie) => {
    if (!user || !rtdb) return;
    setFavorites((prev) => (prev.some((m) => m.id === movie.id) ? prev : [...prev, movie]));
    const docRef = ref(rtdb, `users/${user.uid}/favorites/${movie.id}`);
    return set(docRef, { ...movie, createdAt: Date.now() });
  };

  const removeMovieFromFavorites = (movieId) => {
    if (!user || !rtdb) return;
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
    const docRef = ref(rtdb, `users/${user.uid}/favorites/${movieId}`);
    return remove(docRef);
  };

  const isMovieFavorite = (movieId) => favorites.some((movie) => movie.id === movieId);

  const setMovieWatched = (movie, userRating = 0) => {
    if (!user || !rtdb) return;
    const entry = { ...movie, userRating, watchedAt: Date.now() };
    setWatched((prev) => {
      const next = prev.filter((m) => m.id !== movie.id);
      next.unshift(entry);
      return next;
    });
    const docRef = ref(rtdb, `users/${user.uid}/watched/${movie.id}`);
    return set(docRef, { ...entry, updatedAt: Date.now() });
  };

  const removeMovieFromWatched = (movieId) => {
    if (!user || !rtdb) return;
    setWatched((prev) => prev.filter((movie) => movie.id !== movieId));
    const docRef = ref(rtdb, `users/${user.uid}/watched/${movieId}`);
    return remove(docRef);
  };

  const isMovieWatched = (movieId) => watched.some((movie) => movie.id === movieId);

  const isMovieSaved = (movieId) => savedMoviesById.has(movieId);

  const updateWatchedRating = (movieId, userRating) => {
    if (!user || !rtdb) return;
    setWatched((prev) => prev.map((m) => (m.id === movieId ? { ...m, userRating } : m)));
    const docRef = ref(rtdb, `users/${user.uid}/watched/${movieId}`);
    const existing = watched.find((m) => m.id === movieId) || {};
    return set(docRef, { ...existing, userRating, updatedAt: Date.now() });
  };

  const value = useMemo(
    () => ({
      favorites,
      watched,
      favoritesById,
      watchedById,
      savedMoviesById,
      loadingLibrary,
      user,
      addMovieToFavorites,
      removeMovieFromFavorites,
      isMovieFavorite,
      setMovieWatched,
      removeMovieFromWatched,
      isMovieWatched,
      isMovieSaved,
      updateWatchedRating,
    }),
    [favorites, watched, favoritesById, watchedById, savedMoviesById, loadingLibrary, user]
  );

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
}

