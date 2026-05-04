"use client";

import MovieCard from "../components/MovieCard";
import "../styles/Favorites.css";
import { useMovieContext } from "../context/MovieContext";
import Link from "next/link";

export default function FavoritesPage() {
  const { favorites, user } = useMovieContext();

  if (!user) {
    return (
      <div className="favorites-page-empty">
        <h2>Sign in to see your favorites</h2>
        <p>Your favorite movies are saved to your account.</p>
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

  if (favorites.length > 0) {
    return (
      <div className="favorites-page">
        <h2>Favorite Movies List</h2>
        <div className="movies-grid">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-page-empty">
      <h2>No movies added to favorites yet!</h2>
      <p>Start exploring movies and add your favorites to this list.</p>
      <div className="favorites-cta">
        <Link className="favorites-cta-button" href="/">
          Browse movies
        </Link>
      </div>
    </div>
  );
}

