const initialState = {
  movies: [],
  suggestions: [],
  loading: true,
};

const movies = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "LIST_MOVIES": {
      return { ...state, loading: true, error: null };
    }
    case "LIST_MOVIES_SUCCESS": {
      const { movies: moviesList, isSuggestionOnly } = action;
      return {
        ...state,
        movies: isSuggestionOnly ? state.movies : moviesList,
        suggestions: isSuggestionOnly ? moviesList : [],
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
