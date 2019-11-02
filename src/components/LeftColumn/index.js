import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import * as actions from "../../actions";
import "./index.scss";

const mapStateToProps = ({ genres }) => ({
  genres: genres.genres,
  loading: genres.loading,
});

class LeftColumn extends Component {
  componentDidMount = () => {
    const { genres, listGenres } = this.props;

    if (!genres.length) {
      listGenres();
    }
  };

  render() {
    const { genres, listMovies } = this.props;

    return (
      <div className="leftColumn">
        <div className="leftColumn__heading">Categories</div>

        {genres && (
          <ul>
            {Object.keys(genres).map(genreId => (
              <li
                className="leftColumn__category"
                key={genreId}
                onClick={() => listMovies({ genreId })}
              >
                {genres[genreId]}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

LeftColumn.propTypes = {
  genres: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  listGenres: PropTypes.func.isRequired,
  listMovies: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  actions,
)(LeftColumn);
