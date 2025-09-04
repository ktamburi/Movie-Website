import '../css/Favorites.css';
import { useMovieContext } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';

function FavoritesPage() {
    const { favorites } = useMovieContext();

    if (favorites.length > 0) {
        return (
           <div className='favorites-page'>
            <h2>Favorite Movies List</h2>
             <div className="movies-grid">
                {favorites.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
           </div>
        );
    }

    return (
        <div className="favorites-page-empty">
            <h2>No movies added to favorites yet!</h2>
            <p>Start exploring movies and add your favorites to this list.</p>
        </div>
    );
}

export default FavoritesPage;
