"use client";

import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import "../styles/Home.css";
import { getPopularMovies, searchMovies } from "../lib/tmdbClient";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch popular movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchPopularMovies();
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;
    setLoading(true);
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch movie search results.");
    } finally {
      setLoading(false);
    }
    setSearchQuery("");
  };

  return (
    <div className="home-page">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} showRating="saved" />
          ))}
        </div>
      )}
    </div>
  );
}

