export async function GET(req) {
  const key = process.env.TMDB_API_KEY;
  if (!key) {
    return Response.json({ error: "Missing TMDB_API_KEY" }, { status: 500 });
  }

  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";

  const url = new URL("https://api.themoviedb.org/3/search/movie");
  url.searchParams.set("api_key", key);
  url.searchParams.set("query", q);

  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    return Response.json({ error: text || "TMDB error" }, { status: 502 });
  }
  const data = await res.json();
  return Response.json({ results: data.results || [] });
}

