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

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={`${movie.title} poster`}
        />
        <div className="movie-overlay">
          <div className="movie-actions" aria-label="Movie actions">
            <button
              className={`movie-action-button ${isFavorite ? "active favorite" : "favorite"}`}
              onClick={handleFavoriteClick}
              type="button"
              title={user ? (isFavorite ? "Remove from favorites" : "Add to favorites") : "Sign in to add favorites"}
              aria-label={user ? (isFavorite ? "Remove from favorites" : "Add to favorites") : "Sign in to add favorites"}
            >
              <span className="movie-action-heart" aria-hidden="true">
                ❤
              </span>
            </button>
            <button
              className={`movie-action-button ${isWatched ? "active watched" : "watched"}`}
              onClick={handleWatchedClick}
              type="button"
              title={user ? (isWatched ? "Remove from watched" : "Mark as watched") : "Sign in to mark watched"}
              aria-label={user ? (isWatched ? "Remove from watched" : "Mark as watched") : "Sign in to mark watched"}
            >
              <svg className="movie-action-icon icon-check" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="movie-details">
        <h3>{movie.title}</h3>
        <span>{movie.release_date?.split("-")[0]}</span>
        <p>{movie.overview.length > 100 ? `${movie.overview.substring(0, 100)}...` : movie.overview}</p>
        <span className="rating-select tmdb-rating">
          TMDB: <span className="user-rating">{movie.vote_average} ★ </span>
        </span>
        {shouldShowRating && (
          <div className="rating-select">
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

