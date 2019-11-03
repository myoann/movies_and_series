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

        <div className="detailedMovieFooter__metadata">
          <section className="detailedMovieFooter__metadata__section">
            <h3>Information</h3>

            <div className="detailedMovieFooter__metadata__section__category">
              <span className="detailedMovieFooter__metadata__section__category__title">
                Tagline
              </span>
              <span className="detailedMovieFooter__metadata__section__category__value">
                {media.tagline || "N/A"}
              </span>
            </div>

            <div className="detailedMovieFooter__metadata__section__category">
              <span className="detailedMovieFooter__metadata__section__category__title">
                Genres
              </span>
              <span className="detailedMovieFooter__metadata__section__category__value">
                {media.genres.map(genre => (
                  <div key={genre.id}>{genre.name}</div>
                ))}
              </span>
            </div>

            {media.release_date && (
              <div className="detailedMovieFooter__metadata__section__category">
                <span className="detailedMovieFooter__metadata__section__category__title">
                  Release Year
                </span>
                <span className="detailedMovieFooter__metadata__section__category__value">
                  {new Date(media.release_date).getFullYear()}
                </span>
              </div>
            )}

            {media.first_air_date && (
              <div className="detailedMovieFooter__metadata__section__category">
                <span className="detailedMovieFooter__metadata__section__category__title">
                  First Air Year
                </span>
                <span className="detailedMovieFooter__metadata__section__category__value">
                  {new Date(media.first_air_date).getFullYear()}
                </span>
              </div>
            )}
          </section>

          <section className="detailedMovieFooter__metadata__section">
            <h3>Details</h3>

            {media.spoken_languages && (
              <div className="detailedMovieFooter__metadata__section__category">
                <span className="detailedMovieFooter__metadata__section__category__title">
                  Language
                </span>
                <span className="detailedMovieFooter__metadata__section__category__value">
                  {media.spoken_languages[0].name}
                </span>
              </div>
            )}

            {media.runtime && (
              <div className="detailedMovieFooter__metadata__section__category">
                <span className="detailedMovieFooter__metadata__section__category__title">
                  Runtime
                </span>
                <span className="detailedMovieFooter__metadata__section__category__value">
                  {media.runtime}
                </span>
              </div>
            )}

            {media.number_of_seasons && (
              <div className="detailedMovieFooter__metadata__section__category">
                <span className="detailedMovieFooter__metadata__section__category__title">
                  Seasons
                </span>
                <span className="detailedMovieFooter__metadata__section__category__value">
                  {media.number_of_seasons}
                </span>
              </div>
            )}

            {media.number_of_episodes && (
              <div className="detailedMovieFooter__metadata__section__category">
                <span className="detailedMovieFooter__metadata__section__category__title">
                  Episodes
                </span>
                <span className="detailedMovieFooter__metadata__section__category__value">
                  {media.number_of_episodes}
                </span>
              </div>
            )}

            <div className="detailedMovieFooter__metadata__section__category">
              <span className="detailedMovieFooter__metadata__section__category__title">
                Also known as
              </span>
              <span className="detailedMovieFooter__metadata__section__category__value">
                {media.original_title || media.original_name}
              </span>
            </div>
          </section>

          <section className="detailedMovieFooter__metadata__section">
            <h3>Box Office</h3>

            <div className="detailedMovieFooter__metadata__section__category">
              <span className="detailedMovieFooter__metadata__section__category__title">
                Budget
              </span>
              <span className="detailedMovieFooter__metadata__section__category__value">
                {media.budget
                  ? `${media.budget
                      .toFixed(2)
                      .replace(/\d(?=(\d{3})+\.)/g, "$&,")} $`
                  : "N/A"}
              </span>
            </div>

            <div className="detailedMovieFooter__metadata__section__category">
              <span className="detailedMovieFooter__metadata__section__category__title">
                Revenue
              </span>
              <span className="detailedMovieFooter__metadata__section__category__value">
                {media.revenue
                  ? `${media.revenue
                      .toFixed(2)
                      .replace(/\d(?=(\d{3})+\.)/g, "$&,")} $`
                  : "N/A"}
              </span>
            </div>
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
