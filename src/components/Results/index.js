import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroller";

import * as actions from "../../actions";
import MovieCard from "../MovieCard";
import "./index.scss";

const mapStateToProps = ({ medias }) => ({
  medias: medias.medias,
  page: medias.page,
  totalPages: medias.totalPages,
  genreId: medias.genreId,
  query: medias.query,
  loading: medias.loading,
});

class Results extends Component {
  loadMoreMovies = () => {
    const { listMedias, page, query, genreId } = this.props;
    listMedias({ page: page + 1, query, genreId });
  };

  render() {
    const { medias } = this.props;

    return (
      <main>
        {medias.length > 0 ? (
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
            {medias.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </InfiniteScroll>
        ) : (
          <div className="noResults">
            <h1>
              Choose a category or type a movie / tv show name to start the
              experience :)
            </h1>
            {[...Array(5)].map((movie, id) => (
              <MovieCard key={id} movie={{ title: "" }} />
            ))}
          </div>
        )}
      </main>
    );
  }
}

Results.defaultProps = {
  query: null,
  genreId: null,
};

Results.propTypes = {
  listMedias: PropTypes.func.isRequired,
  medias: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  query: PropTypes.string,
  genreId: PropTypes.string,
};

export default connect(
  mapStateToProps,
  actions,
)(Results);
