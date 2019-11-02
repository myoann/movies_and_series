import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroller";

import * as actions from "../../actions";
import MovieCard from "../MovieCard";
import "./index.scss";

const mapStateToProps = ({ movies }) => ({
  movies: movies.movies,
  page: movies.page,
  totalPages: movies.totalPages,
  genreId: movies.genreId,
  query: movies.query,
  loading: movies.loading,
});

class Results extends Component {
  loadMoreMovies = () => {
    const { listMovies, page, query, genreId } = this.props;
    listMovies({ page: page + 1, query, genreId });
  };

  render() {
    const { movies } = this.props;

    console.log(movies);
    return (
      <main>
        {movies.length > 0 ? (
          <InfiniteScroll
            pageStart={0}
            loadMore={() => this.loadMoreMovies()}
            hasMore={true || false}
            loader={
              <div className="loader" key={0}>
                Loading ...
              </div>
            }
          >
            {movies.map(movie => (
              <MovieCard movie={movie} />
            ))}
          </InfiniteScroll>
        ) : (
          <h1>Aucune data</h1>
        )}
      </main>
    );
  }
}

Results.propTypes = {
  listMovies: PropTypes.func.isRequired,
  movies: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default connect(
  mapStateToProps,
  actions,
)(Results);
