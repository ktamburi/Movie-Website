# Movies (Next.js)

Personal project built for **educational and entertainment purposes**.

This app lets you discover movies via TMDB, sign in, save favorites, track watched movies, and leave star ratings.

## Tech stack

- **Framework**: Next.js (App Router)
- **UI**: React + CSS
- **Movie data**: TMDB API (requests proxied via server routes so the API key stays server-side)
- **Auth**: Firebase Authentication (Email/Password)
- **Database**: Firebase Realtime Database (favorites, watched, and star ratings)
- **Dev/Deploy**: Docker for local dev, Vercel for deployment

## Features

- TMDB browsing + search
- Email/password sign-in
- Favorites list
- Watched list + personal star rating
- Light/Dark theme toggle

## Notes / disclaimer

- This is **not** an official TMDB product.
- TMDB data (posters, titles, ratings, etc.) belongs to their respective owners.

## Local development (Docker + Firebase)

- **Docker**: used for local development with hot reload
- **Firebase**: create a **Realtime Database** and enable **Email/Password** auth
- **TMDB**: create your own API key on TMDB
- **Env vars**: copy `.env.example` → `.env` and fill in the Firebase + TMDB values

Create your env file:

```bash
cp .env.example .env
```

In `.env`, set:

- `TMDB_API_KEY` (server-only)
- `NEXT_PUBLIC_FIREBASE_*` and `NEXT_PUBLIC_FIREBASE_DATABASE_URL` (from Firebase console)

Then run:

```bash
docker compose up --build dev
```

Open `http://localhost:3000`.
