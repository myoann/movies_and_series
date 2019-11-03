import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import * as actions from "../../actions";
import "./index.scss";

const mapStateToProps = ({ genres, medias }) => ({
  genreId: medias.genreId,
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
    const { genreId, genres, listMedias } = this.props;

    return (
      <div className="leftColumn">
        <div className="leftColumn__heading">Categories</div>

        {genres && (
          <ul>
            {Object.keys(genres).map(genre => (
              // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
              <li
                className={`leftColumn__category ${
                  genreId === genre ? "leftColumn__category--selected" : ""
                }`}
                key={genre}
                onClick={() => listMedias({ genreId: genre })}
              >
                {genres[genre]}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

LeftColumn.defaultProps = {
  genreId: null,
};

LeftColumn.propTypes = {
  genreId: PropTypes.string,
  genres: PropTypes.object.isRequired,
  listGenres: PropTypes.func.isRequired,
  listMedias: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  actions,
)(LeftColumn);
