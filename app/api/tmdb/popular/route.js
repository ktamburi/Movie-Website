export async function GET() {
  const key = process.env.TMDB_API_KEY;
  if (!key) {
    return Response.json({ error: "Missing TMDB_API_KEY" }, { status: 500 });
  }

  const url = new URL("https://api.themoviedb.org/3/movie/popular");
  url.searchParams.set("api_key", key);

  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    return Response.json({ error: text || "TMDB error" }, { status: 502 });
  }
  const data = await res.json();
  return Response.json({ results: data.results || [] });
}

