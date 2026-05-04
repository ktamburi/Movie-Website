"use client";

import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
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
    <div className="box-border w-full py-8 max-md:py-4">
      <form
        onSubmit={handleSearch}
        className="mx-auto mb-8 flex max-w-[600px] flex-wrap items-center gap-4 px-4 box-border max-md:mb-4"
      >
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="min-w-0 flex-1 rounded border border-[color:var(--border)] bg-[color-mix(in_srgb,var(--surface-2),var(--bg)_35%)] px-4 py-3 text-[color:var(--text-1)] placeholder:text-[color:var(--text-2)] focus:border-[color-mix(in_srgb,var(--primary),white_10%)] focus:outline-none focus:ring-2 focus:ring-[color:var(--focus)]"
        />
        <button
          type="submit"
          className="inline-flex shrink-0 items-center justify-center rounded-[10px] bg-[color:var(--primary)] px-5 py-3.5 font-semibold text-white transition hover:-translate-y-px hover:bg-[color:var(--primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus)] disabled:cursor-not-allowed disabled:opacity-65 disabled:hover:translate-y-0"
          disabled={loading}
        >
          Search
        </button>
      </form>

      {error && (
        <div className="mx-auto mb-4 max-w-[600px] rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-red-200">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center text-[color:var(--text-2)]">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} showRating="saved" />
          ))}
        </div>
      )}
    </div>
  );
}
