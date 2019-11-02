import React, { Component } from "react";
import PropTypes from "prop-types";

import defaultImage from "../../assets/images/default-poster.png";
import "./index.scss";

class MovieCard extends Component {
  seeMediaDetails = mediaId => {
    console.log(mediaId);
  };

  render() {
    const { movie } = this.props;
    console.log(movie);
    return (
      <div className="movieCard" onClick={() => this.seeMediaDetails(movie.id)}>
        <img
          alt={`Poster of ${movie.title || movie.name}`}
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w154/${movie.poster_path}`
              : defaultImage
          }
        />
      </div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default MovieCard;
