import MovieDB from "moviedb";
const mdb = MovieDB("92b418e837b833be308bbfb1fb2aca1e");

export const listMovies = ({
  genreId,
  query,
  page = 1,
  isSuggestionOnly = false,
}) => async dispatch => {
  dispatch({ type: "LIST_MOVIES" });

  console.log(genreId, page);
  try {
    if (query) {
      // If a search text is given, search it as a query
      mdb.searchMulti({ query, page }, (err, res) => {
        // Filter the results to only get the movies and TV Shows
        const moviesOnly = res.results.filter(r =>
          ["movie", "tv"].includes(r.media_type),
        );

        dispatch({
          type: "LIST_MOVIES_SUCCESS",
          page: res.page,
          totalPages: res.total_pages,
          movies: moviesOnly,
          isSuggestionOnly,
          query,
        });
      });
    } else if (genreId) {
      // If the id of the genre is given, search the movies related to this genre
      mdb.genreMovies({ id: genreId, page }, (err, res) => {
        console.log(res);
        dispatch({
          type: "LIST_MOVIES_SUCCESS",
          page: res.page,
          totalPages: res.total_pages,
          movies: res.results,
          genreId,
        });
      });
    }
  } catch (error) {
    dispatch({ type: "LIST_MOVIES_FAILURE", error });
  }
};

export const listGenres = () => async dispatch => {
  dispatch({ type: "LIST_GENRES" });

  try {
    const genres = {};
    mdb.genreMovieList((err, res) => {
      res.genres.forEach(genre => {
        genres[genre.id] = genre.name;
      });

      dispatch({
        type: "LIST_GENRES_SUCCESS",
        genres,
      });
    });
  } catch (error) {
    dispatch({ type: "LIST_GENRES_FAILURE", error });
  }
};
