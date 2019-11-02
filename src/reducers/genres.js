const initialState = {
  genres: {},
  loading: true,
};

const genres = (state = initialState, action) => {
  switch (action.type) {
    case "LIST_GENRES": {
      return { ...state, loading: true, error: null };
    }
    case "LIST_GENRES_SUCCESS": {
      const { genres: genresObject } = action;
      return {
        ...state,
        genres: genresObject,
        loading: false,
        error: null,
      };
    }
    case "LIST_GENRES_FAILURE": {
      const { error } = action;
      return { ...state, loading: false, error };
    }
    default: {
      return state;
    }
  }
};

export default genres;
