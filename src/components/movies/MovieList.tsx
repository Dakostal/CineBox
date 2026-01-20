import { useAppSelector, useAppDispatch } from '../../redux/hooks/hooks';
import { toggleWatched, deleteMovie } from '../../redux/slices/movieSlice';
import { useState } from 'react';
import styles from './MovieList.module.scss';

type FilterType = 'all' | 'watched' | 'unwatched';

export const MovieList = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const movies = useAppSelector((state) => state.movies.movies);

  const [filter, setFilter] = useState<FilterType>('all');
  const [genreFilter, setGenreFilter] = useState<string>('');

  const userMovies = movies.filter((m) => m.ownerId === currentUser?.email);

  const filteredMovies = userMovies.filter((movie) => {
    if (filter === 'watched') return movie.watched;
    if (filter === 'unwatched') return !movie.watched;
    if (genreFilter && movie.genre !== genreFilter) return false;
    return true;
  });

  const genres = Array.from(new Set(movies.map((m) => m.genre))).filter(Boolean);

  if (userMovies.length === 0) {
    return <p className={styles.emptyMessage}>У вас пока нет фильмов. Добавьте первый!</p>;
  }

  return (
    <div>
      <div className={styles.filters}>
        <button
          onClick={() => setFilter('all')}
          className={`${styles.filterButton} ${filter === 'all' ? styles.active : ''}`}
        >
          Все
        </button>
        <button
          onClick={() => setFilter('watched')}
          className={`${styles.filterButton} ${filter === 'watched' ? styles.active : ''}`}
        >
          Просмотренные
        </button>
        <button
          onClick={() => setFilter('unwatched')}
          className={`${styles.filterButton} ${filter === 'unwatched' ? styles.active : ''}`}
        >
          Не просмотренные
        </button>

        <select
          value={genreFilter}
          onChange={(e) => setGenreFilter(e.target.value)}
          className={styles.genreSelect}
        >
          <option value="">Все жанры</option>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      <div>
        {filteredMovies.map((movie) => (
          <div key={movie.id} className={styles.movieCard}>
            <div className={styles.movieInfo}>
              <strong>{movie.title}</strong> ({movie.year}) — {movie.genre}
              <br />
              <small className={movie.watched ? styles.watched : styles.unwatched}>
                {movie.watched ? 'Просмотрен' : 'Не просмотрен'}
              </small>
            </div>
            <div className={styles.actions}>
              <button
                onClick={() => dispatch(toggleWatched(movie.id))}
                className={styles.toggleButton}
              >
                {movie.watched ? 'Не смотрел' : 'Посмотрел'}
              </button>
              <button
                onClick={() => dispatch(deleteMovie(movie.id))}
                className={styles.deleteButton}
              >
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};