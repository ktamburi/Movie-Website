export async function GET(req) {
  const key = process.env.TMDB_API_KEY;
  if (!key) {
    return Response.json({ error: "Missing TMDB_API_KEY" }, { status: 500 });
  }

  const { searchParams } = new URL(req.url);
  const rawPage = Number(searchParams.get("page") || "1");
  const page = Math.min(500, Math.max(1, Number.isFinite(rawPage) ? rawPage : 1));

  const url = new URL("https://api.themoviedb.org/3/movie/popular");
  url.searchParams.set("api_key", key);
  url.searchParams.set("page", String(page));

  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    return Response.json({ error: text || "TMDB error" }, { status: 502 });
  }

  const data = await res.json();
  const totalPages = Math.min(Number(data.total_pages) || 1, 500);
  const totalResults = Math.min(Number(data.total_results) || 0, totalPages * 20);

  return Response.json({
    page: Math.min(Number(data.page) || page, totalPages),
    total_pages: totalPages,
    total_results: totalResults,
    results: data.results || [],
  });
}

