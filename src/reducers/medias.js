const initialState = {
  uniqueMedia: {},
  medias: [],
  page: 1,
  totalPages: 1,
  suggestions: [],
  genreId: null,
  query: null,
  loading: true,
};

const medias = (state = initialState, action) => {
  console.log("action", action);
  switch (action.type) {
    case "FIND_MEDIA": {
      return { ...state, error: null };
    }
    case "FIND_MEDIA_SUCCESS": {
      const { movie } = action;
      return { ...state, uniqueMedia: movie };
    }
    case "FIND_MEDIA_FAILURE": {
      const { error } = action;
      return { ...state, error };
    }
    case "LIST_MEDIAS": {
      return { ...state, loading: true, error: null };
    }
    case "LIST_MEDIAS_SUCCESS": {
      const {
        medias: mediasList,
        page,
        totalPages,
        genreId,
        query,
        isSuggestionOnly,
      } = action;
      return {
        ...state,
        medias: isSuggestionOnly
          ? state.medias
          : page === 1
          ? mediasList
          : [...state.medias, ...mediasList],
        suggestions: isSuggestionOnly ? mediasList : [],
        page,
        totalPages,
        genreId,
        query,
        loading: false,
        error: null,
      };
    }
    case "LIST_MEDIAS_FAILURE": {
      const { error } = action;
      return { ...state, loading: false, error };
    }
    default: {
      return state;
    }
  }
};

export default medias;
