async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Request failed (${res.status}): ${text}`);
  }
  return res.json();
}

export async function getPopularMovies(page = 1) {
  return fetchJson(`/api/tmdb/popular?page=${encodeURIComponent(String(page))}`);
}

export async function searchMovies(query, page = 1) {
  return fetchJson(`/api/tmdb/search?q=${encodeURIComponent(query)}&page=${encodeURIComponent(String(page))}`);
}

