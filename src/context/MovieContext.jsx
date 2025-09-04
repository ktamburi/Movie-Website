import { createContext, useEffect, useState, useContext } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({children}) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) setFavorites(JSON.parse(storedFavorites))
    }, []);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const addMovieToFavorites = (movie) => {
        setFavorites(prev => [...prev, movie]);
    };

    const removeMovieFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId));
    };

    const isMovieFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId);
    };

    const value= {
        favorites,
        addMovieToFavorites,
        removeMovieFromFavorites,
        isMovieFavorite
    };

    return (
    <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
    );
}
