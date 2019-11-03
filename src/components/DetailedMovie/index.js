import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import * as actions from "../../actions";
import "./index.scss";

const mapStateToProps = ({ medias }) => ({
  uniqueMedia: medias.uniqueMedia,
});

class DetailedMovie extends Component {
  componentDidMount = () => {
    const {
      location: { search },
      uniqueMedia,
      findMediaById,
    } = this.props;
    const urlParams = JSON.parse(
      `{"${decodeURI(search.substring(1))
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')}"}`,
    );

    if (!uniqueMedia.id && urlParams.id) {
      findMediaById({ id: urlParams.id, mediaType: urlParams.mediaType });
    }
  };

  render() {
    const { uniqueMedia: media } = this.props;
    console.log(media);

    return media.id ? (
      <div className="detailedMovie">
        {media.backdrop_path && (
          <img
            alt={`Poster of ${media.title || media.name}`}
            src={`https://image.tmdb.org/t/p/w1280/${media.backdrop_path}`}
          />
        )}

        {media.imdb_id && (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://www.imdb.com/title/${media.imdb_id}`}
            className="detailedMovie__link detailedMovie__link--imdb"
          >
            View it on IMDB
          </a>
        )}

        {media.homepage && (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={media.homepage}
            className="detailedMovie__link detailedMovie__link--homepage"
          >
            Official website
          </a>
        )}

        <div className="detailedMovieFooter">
          <h2>About</h2>

          <div className="reviewCard">
            <div className="reviewCard__title">
              <span>{media.title || media.name}</span>
              <span className="reviewCard__title--sub">
                <ul className="reviewCard__title--sub--list">
                  {media.genres.map(genre => (
                    <li key={genre.id}>{genre.name}</li>
                  ))}
                </ul>
              </span>
            </div>

            {media.overview}
          </div>
        </div>

        <div className="detailedMovieFooter__metadata">
          <section className="detailedMovieFooter__metadata__section">
            <h3>Information</h3>
          </section>
          <section className="detailedMovieFooter__metadata__section">
            Languages
          </section>
          <section className="detailedMovieFooter__metadata__section">
            Test
          </section>
        </div>
      </div>
    ) : (
      <div>Loading...</div>
    );
  }
}

DetailedMovie.defaultProps = {
  uniqueMedia: {},
};

DetailedMovie.propTypes = {
  location: PropTypes.shape({ search: PropTypes.string }).isRequired,
  findMediaById: PropTypes.func.isRequired,
  uniqueMedia: PropTypes.object,
};

export default connect(
  mapStateToProps,
  actions,
)(DetailedMovie);
