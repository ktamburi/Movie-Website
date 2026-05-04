"use client";

import { useEffect, useMemo, useState } from "react";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import { useMovieContext } from "../context/MovieContext";
import Link from "next/link";

const emptyShell =
  "mx-auto my-8 max-w-[600px] rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-2)] px-8 py-16 text-center";

const primaryBtn =
  "inline-flex items-center justify-center rounded-[10px] bg-[color:var(--primary)] px-5 py-3.5 font-semibold text-white no-underline transition hover:-translate-y-px hover:bg-[color:var(--primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus)]";

export default function FavoritesPage() {
  const { favorites, user } = useMovieContext();
  const [page, setPage] = useState(1);
  const pageSize = 20;

  useEffect(() => {
    setPage(1);
  }, [favorites.length]);

  const pageCount = Math.max(1, Math.ceil(favorites.length / pageSize));
  const pageMovies = useMemo(() => {
    const safe = Math.min(Math.max(1, page), pageCount);
    const start = (safe - 1) * pageSize;
    return favorites.slice(start, start + pageSize);
  }, [favorites, page, pageCount]);

  useEffect(() => {
    if (page > pageCount) setPage(pageCount);
  }, [page, pageCount]);

  if (!user) {
    return (
      <div className={emptyShell}>
        <h2 className="mb-4 text-2xl text-[color-mix(in_srgb,var(--primary),white_10%)]">Sign in to see your favorites</h2>
        <p className="text-lg leading-relaxed text-[color:var(--text-2)]">Your favorite movies are saved to your account.</p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Link className={primaryBtn} href="/auth">
            Sign in
          </Link>
          <Link
            className={primaryBtn}
            href="/"
          >
            Browse movies
          </Link>
        </div>
      </div>
    );
  }

  if (favorites.length > 0) {
    return (
      <div className="box-border w-full py-8">
        <h2 className="mb-8 text-center text-4xl text-[color:var(--text-1)] drop-shadow-md max-md:text-3xl">Favorite Movies List</h2>
        <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {pageMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
      </div>
    );
  }

  return (
    <div className={emptyShell}>
      <h2 className="mb-4 text-2xl text-[color-mix(in_srgb,var(--primary),white_10%)]">No movies added to favorites yet!</h2>
      <p className="text-lg leading-relaxed text-[color:var(--text-2)]">Start exploring movies and add your favorites to this list.</p>
      <div className="mt-5 flex justify-center">
        <Link className={primaryBtn} href="/">
          Browse movies
        </Link>
      </div>
    </div>
  );
}
