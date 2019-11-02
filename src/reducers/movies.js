const initialState = {
  movies: [],
  page: 1,
  totalPages: 1,
  suggestions: [],
  genreId: null,
  query: null,
  loading: true,
};

const movies = (state = initialState, action) => {
  switch (action.type) {
    case "LIST_MOVIES": {
      return { ...state, loading: true, error: null };
    }
    case "LIST_MOVIES_SUCCESS": {
      const {
        movies: moviesList,
        page,
        totalPages,
        genreId,
        query,
        isSuggestionOnly,
      } = action;
      return {
        ...state,
        movies: isSuggestionOnly
          ? state.movies
          : page === 1
          ? moviesList
          : [...state.movies, ...moviesList],
        suggestions: isSuggestionOnly ? moviesList : [],
        page,
        totalPages,
        genreId,
        query,
        loading: false,
        error: null,
      };
    }
    case "LIST_MOVIES_FAILURE": {
      const { error } = action;
      return { ...state, loading: false, error };
    }
    default: {
      return state;
    }
  }
};

export default movies;
