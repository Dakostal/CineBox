import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MovieSchema, type MovieFormData } from '../../lib/types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { addMovie } from '../../redux/slices/movieSlice';
import styles from './AddMovieForm.module.scss';

const genres = [
  'Комедия', 'Драма', 'Боевик', 'Ужасы', 'Фантастика', 'Триллер', 'Документальный',
] as const;

export const AddMovieForm = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.user.currentUser);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MovieFormData>({
    resolver: zodResolver(MovieSchema),
    defaultValues: {
      title: '',
      year: new Date().getFullYear(),
      genre: '',
      watched: false,
    },
  });

  const onSubmit = (data: MovieFormData) => {
    if (!currentUser) return;

    dispatch(
      addMovie({
        ...data,
        ownerId: currentUser.email,
      })
    );
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.field}>
        <label className={styles.label}>Название</label>
        <Controller
          control={control}
          name="title"
          render={({ field }) => (
            <input
              {...field}
              placeholder="Название фильма"
              className={styles.input}
            />
          )}
        />
        {errors.title && <p className={styles.error}>{errors.title.message}</p>}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Год</label>
        <Controller
          control={control}
          name="year"
          render={({ field }) => (
            <input
              type="number"
              placeholder="2023"
              min="1800"
              className={styles.input}
              value={field.value ?? ''}
              onChange={(e) => {
                const value = e.target.value;
                field.onChange(value === '' ? undefined : Number(value));
              }}
            />
          )}
        />
        {errors.year && <p className={styles.error}>{errors.year.message}</p>}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Жанр</label>
        <Controller
          control={control}
          name="genre"
          render={({ field }) => (
            <select {...field} className={styles.select}>
              <option value="">Выберите жанр</option>
              {genres.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          )}
        />
        {errors.genre && <p className={styles.error}>{errors.genre.message}</p>}
      </div>

      <div className={styles.field}>
        <Controller
          control={control}
          name="watched"
          render={({ field }) => (
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={field.value}
                onChange={field.onChange}
              />
              Уже посмотрел
            </label>
          )}
        />
      </div>

      <button type="submit" className={styles.submitButton}>
        Добавить фильм
      </button>
    </form>
  );
};