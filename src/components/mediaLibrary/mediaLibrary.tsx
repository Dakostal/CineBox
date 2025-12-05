import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { logout } from '../../redux/slices/userSlice';
import { AddMovieForm } from '../movies/AddMovieForm';
import { MovieList } from '../movies/MovieList';
import styles from './MediaLibrary.module.scss';

export const MediaLibrary = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.user.currentUser);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          Коллекция фильмов пользователя {currentUser?.email}
        </h1>
        <button
          onClick={() => dispatch(logout())}
          className={styles.logoutButton}
        >
          Выйти
        </button>
      </header>

      <AddMovieForm />
      <MovieList />
    </div>
  );
};