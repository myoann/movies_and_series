import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import * as actions from "../../actions";
import MovieCard from "../MovieCard";
import "./index.scss";

const mapStateToProps = ({ movies }) => ({
  movies: movies.movies,
  loading: movies.loading,
});

class Results extends Component {
  render() {
    const { movies } = this.props;

    console.log(movies);
    return (
      <main>
        {movies.length > 0 ? (
          movies.map(movie => <MovieCard movie={movie} />)
        ) : (
          <h1>Search for a movie or a TV show to start the experience</h1>
        )}
      </main>
    );
  }
}

Results.propTypes = {
  movies: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default connect(
  mapStateToProps,
  actions,
)(Results);
