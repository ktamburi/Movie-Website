async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Request failed (${res.status}): ${text}`);
  }
  return res.json();
}

export async function getPopularMovies() {
  const data = await fetchJson("/api/tmdb/popular");
  return data.results || [];
}

export async function searchMovies(query) {
  const data = await fetchJson(`/api/tmdb/search?q=${encodeURIComponent(query)}`);
  return data.results || [];
}

