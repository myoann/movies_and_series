import React, { Component } from "react";
import MovieDB from "moviedb";

import "./index.scss";
const mdb = MovieDB("92b418e837b833be308bbfb1fb2aca1e");

class LeftColumn extends Component {
  state = { genres: null };

  componentWillMount = async () => {
    const genres = {};
    mdb.genreMovieList((err, res) => {
      res.genres.forEach(genre => {
        genres[genre.id] = genre.name;
      });

      this.setState({ genres });
    });
  };

  selectCategory = categoryId => {
    mdb.genreMovies({ id: categoryId }, (err, res) => {
      console.log(res);
    });
  };

  render() {
    const { genres } = this.state;

    return (
      <div className="leftColumn">
        <div className="leftColumn__heading">Categories</div>

        {genres && (
          <ul>
            {Object.keys(genres).map(g => (
              <li
                className="leftColumn__category"
                key={g}
                onClick={() => this.selectCategory(g)}
              >
                {genres[g]}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default LeftColumn;
