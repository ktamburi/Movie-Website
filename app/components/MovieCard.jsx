"use client";

import { useMovieContext } from "../context/MovieContext";
import StarRating from "./StarRating";
import { useRouter } from "next/navigation";

export default function MovieCard({ movie, showRating = "always" }) {
  const router = useRouter();
  const {
    user,
    watchedById,
    isMovieSaved,
    isMovieFavorite,
    addMovieToFavorites,
    removeMovieFromFavorites,
    isMovieWatched,
    setMovieWatched,
    removeMovieFromWatched,
    updateWatchedRating,
  } = useMovieContext();

  const movieId = movie.id;
  const isFavorite = isMovieFavorite(movieId);
  const isWatched = isMovieWatched(movieId);
  const watchedEntry = watchedById?.get?.(movieId);
  const currentRating = Number(watchedEntry?.userRating ?? 0) || 0;
  const shouldShowRating = Boolean(user) && (showRating === "always" ? true : isMovieSaved(movieId));

  function handleFavoriteClick(e) {
    e.preventDefault();
    if (!user) {
      router.push("/auth");
      return;
    }
    if (isFavorite) removeMovieFromFavorites(movieId);
    else addMovieToFavorites(movie);
  }

  function handleWatchedClick(e) {
    e.preventDefault();
    if (!user) {
      router.push("/auth");
      return;
    }
    if (isWatched) removeMovieFromWatched(movieId);
    else setMovieWatched(movie, currentRating);
  }

  const actionBtn =
    "pointer-events-auto grid size-[34px] cursor-pointer place-items-center overflow-visible rounded-full border text-[1.2rem] transition [backdrop-filter:blur(6px)] active:translate-y-0 hover:-translate-y-px max-md:size-8";
  const favoriteActive = isFavorite
    ? "border-white/20 bg-red-600/60 text-white"
    : "border-white/10 bg-black/55 text-white hover:bg-black/80";
  const watchedActive = isWatched
    ? "border-white/20 bg-green-600/60 text-white"
    : "border-white/10 bg-black/55 text-[rgb(200,200,200)] hover:bg-black/80";

  return (
    <div className="group relative flex h-full max-w-[300px] flex-col overflow-hidden rounded-lg border border-[color:var(--border)] bg-[color-mix(in_srgb,var(--surface-2),var(--bg)_35%)] transition-transform hover:-translate-y-1 max-md:max-w-[500px]">
      <div className="relative aspect-[2/3] w-full">
        <img
          className="h-full w-full object-cover"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={`${movie.title} poster`}
        />
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-b from-black/10 to-black/80 p-4 opacity-0 transition-opacity group-hover:opacity-100">
          <div className="pointer-events-auto ml-auto flex flex-row gap-2.5" aria-label="Movie actions">
            <button
              className={`${actionBtn} ${favoriteActive}`}
              onClick={handleFavoriteClick}
              type="button"
              title={user ? (isFavorite ? "Remove from favorites" : "Add to favorites") : "Sign in to add favorites"}
              aria-label={user ? (isFavorite ? "Remove from favorites" : "Add to favorites") : "Sign in to add favorites"}
            >
              <svg
                className="block h-[18px] w-[18px] shrink-0 text-white max-md:h-4 max-md:w-4"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                />
              </svg>
            </button>
            <button
              className={`${actionBtn} ${watchedActive}`}
              onClick={handleWatchedClick}
              type="button"
              title={user ? (isWatched ? "Remove from watched" : "Mark as watched") : "Sign in to mark watched"}
              aria-label={user ? (isWatched ? "Remove from watched" : "Mark as watched") : "Sign in to mark watched"}
            >
              <svg className="block h-4 w-4 fill-none stroke-current stroke-2 max-md:h-3.5 max-md:w-3.5" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4 max-md:p-3">
        <h3 className="m-0 text-base font-medium">{movie.title}</h3>
        <span className="text-sm text-[color:var(--text-2)]">{movie.release_date?.split("-")[0]}</span>
        <p className="text-sm text-[color:var(--text-2)]">
          {movie.overview.length > 100 ? `${movie.overview.substring(0, 100)}...` : movie.overview}
        </p>
        <span className="mx-auto mt-2 flex w-fit flex-wrap items-center justify-center gap-2 rounded border-0 bg-[color-mix(in_srgb,var(--surface-2),var(--bg)_35%)] px-2 py-2 text-[color:var(--text-1)]">
          TMDB: <span className="text-sm font-bold text-[color:var(--rating)]">{movie.vote_average} ★ </span>
        </span>
        {shouldShowRating && (
          <div className="mt-2 flex flex-wrap items-center justify-center gap-2 rounded border-0 bg-[color-mix(in_srgb,var(--surface-2),var(--bg)_35%)] px-2 py-2 text-[color:var(--text-1)]">
            Your rating:{" "}
            <StarRating
              value={currentRating}
              onChange={(v) => {
                if (isWatched) updateWatchedRating(movieId, v);
                else setMovieWatched(movie, v);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
