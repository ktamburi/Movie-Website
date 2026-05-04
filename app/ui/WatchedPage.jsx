"use client";

import MovieCard from "../components/MovieCard";
import "../styles/Favorites.css";
import { useMovieContext } from "../context/MovieContext";
import Link from "next/link";

export default function WatchedPage() {
  const { watched, user } = useMovieContext();

  if (!user) {
    return (
      <div className="favorites-page-empty">
        <h2>Sign in to see your watched list</h2>
        <p>Your watched movies and star ratings are saved to your account.</p>
        <div className="favorites-cta">
          <Link className="favorites-cta-button" href="/auth">
            Sign in
          </Link>
          <Link className="favorites-cta-secondary" href="/">
            Browse movies
          </Link>
        </div>
      </div>
    );
  }

  if (watched.length > 0) {
    return (
      <div className="favorites-page">
        <h2>Watched Movies</h2>
        <div className="movies-grid">
          {watched.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-page-empty">
      <h2>No watched movies yet!</h2>
      <p>Mark a movie as watched and add your star rating.</p>
    </div>
  );
}

