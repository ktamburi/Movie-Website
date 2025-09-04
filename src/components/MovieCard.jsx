import '../css/MovieCard.css';
import { useMovieContext } from '../context/MovieContext';

function MovieCard({ movie }) {
    const { isMovieFavorite, addMovieToFavorites, removeMovieFromFavorites } = useMovieContext();
    const favorite = isMovieFavorite(movie.id);


    function handleFavoriteClick(e) {
        e.preventDefault()
        if (favorite) removeMovieFromFavorites(movie.id);
        else addMovieToFavorites(movie);
    }

    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.title} poster`} />
            </div>
            <div className="movie-overlay">
                <button className={`favorite-button ${favorite ? "active" : ""}`} onClick={handleFavoriteClick}>❤</button>
            </div>
            <div className="movie-details">
                <h3>{movie.title}</h3>
                <span>{movie.release_date?.split('-')[0]}</span>
                <p>{movie.overview.length > 100 ? `${movie.overview.substring(0, 100)}...` : movie.overview}</p>
                <span className='rating-select'>Rating: <span className='user-rating'>{movie.vote_average} ★ </span></span>
            </div>

        </div>
    );
}

export default MovieCard;