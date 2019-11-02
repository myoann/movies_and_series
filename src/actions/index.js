import MovieDB from "moviedb";
const mdb = MovieDB("92b418e837b833be308bbfb1fb2aca1e");

export const listMovies = ({
  genreId,
  query,
  isSuggestionOnly = false,
}) => async dispatch => {
  dispatch({ type: "LIST_MOVIES" });
  console.log("GENRE ID", genreId);

  try {
    if (query) {
      // If a search text is given, search it as a query
      mdb.searchMulti({ query }, (err, res) => {
        // Filter the results to only get the movies and TV Shows
        const moviesOnly = res.results.filter(r =>
          ["movie", "tv"].includes(r.media_type),
        );

        dispatch({
          type: "LIST_MOVIES_SUCCESS",
          movies: moviesOnly,
          isSuggestionOnly,
        });
      });
    } else if (genreId) {
      // If the id of the genre is given, search the movies related to this genre
      mdb.genreMovies({ id: genreId }, (err, res) => {
        dispatch({
          type: "LIST_MOVIES_SUCCESS",
          movies: res.results,
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
