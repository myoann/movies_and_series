import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import defaultImage from "../../assets/images/default-poster.png";
import "./index.scss";

function MovieCard({ movie }) {
  const history = useHistory();

  const seeMediaDetails = () => {
    history.push(
      `/search?id=${movie.id}&mediaType=${movie.name ? "tv" : "movie"}`,
    );
  };

  return (
    <div className="movieCard" onClick={() => movie.id && seeMediaDetails()}>
      <img
        alt={`Poster of ${movie.title || movie.name || "default image"}`}
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w154/${movie.poster_path}`
            : defaultImage
        }
      />
    </div>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default MovieCard;
