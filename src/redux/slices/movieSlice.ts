import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Movie {
  id: string;
  title: string;
  year: number;
  genre: string;
  watched: boolean;
  ownerId: string;
}

interface MovieState {
  movies: Movie[];
}

const loadMoviesFromStorage = (): Movie[] => {
  const stored = localStorage.getItem('movies');
  return stored ? JSON.parse(stored) : [];
};

const initialState: MovieState = {
  movies: loadMoviesFromStorage(),
};

export const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addMovie: (state, action: PayloadAction<Omit<Movie, 'id'>>) => {
      const newMovie: Movie = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.movies.push(newMovie);
      localStorage.setItem('movies', JSON.stringify(state.movies));
    },
    toggleWatched: (state, action: PayloadAction<string>) => {
      const movie = state.movies.find(m => m.id === action.payload);
      if (movie) {
        movie.watched = !movie.watched;
        localStorage.setItem('movies', JSON.stringify(state.movies));
      }
    },
    deleteMovie: (state, action: PayloadAction<string>) => {
      state.movies = state.movies.filter(m => m.id !== action.payload);
      localStorage.setItem('movies', JSON.stringify(state.movies));
    },
  },
});

export const { addMovie, toggleWatched, deleteMovie } = movieSlice.actions;
export default movieSlice.reducer;