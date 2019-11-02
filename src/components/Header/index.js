import React, { Component } from "react";
import Autosuggest from "react-autosuggest";
import AutosuggestHighlightMatch from "autosuggest-highlight/match";
import AutosuggestHighlightParse from "autosuggest-highlight/parse";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import defaultImage from "../../assets/images/default-poster.png";
import * as actions from "../../actions";
import "./index.scss";

const mapStateToProps = ({ movies }) => ({ suggestions: movies.suggestions });

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.title || suggestion.name;

const renderSuggestion = (suggestion, { query }) => {
  const suggestionText = getSuggestionValue(suggestion);
  const matches = AutosuggestHighlightMatch(suggestionText, query);
  const parts = AutosuggestHighlightParse(suggestionText, matches);

  return (
    <span className="suggestion-content">
      <img
        alt={`Poster of ${suggestionText}`}
        src={
          suggestion.poster_path
            ? `https://image.tmdb.org/t/p/w92/${suggestion.poster_path}`
            : defaultImage
        }
      />
      <span className="name">
        {parts.map((part, index) => {
          const className = part.highlight ? "highlight" : null;

          return (
            <span className={className} key={index}>
              {part.text}
            </span>
          );
        })}
      </span>
      <span className="mediaType">
        {suggestion.media_type === "movie" ? "– in Movies" : "– in TV Shows"}
      </span>
    </span>
  );
};

const seeMediaDetails = mediaId => {
  console.log(mediaId);
};

class Header extends Component {
  state = {
    value: "",
    suggestions: [],
  };

  componentWillReceiveProps = nextProps => {
    this.setState({ suggestions: nextProps.suggestions });
  };

  onChange = (event, { newValue, method }) => {
    this.setState({ value: newValue });
  };

  onSubmit = e => {
    e.preventDefault();
    const { listMovies } = this.props;
    const { value } = this.state;

    listMovies({ query: value });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = async ({ value }) => {
    if (value.length >= 3) {
      const { listMovies } = this.props;

      listMovies({ query: value, isSuggestionOnly: true });
    }
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] });
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: "What are you looking for ?",
      value,
      onChange: this.onChange,
    };
    console.log(suggestions);

    return (
      <header>
        <div className="searchbar">
          <span
            className="searchbar__iconbox"
            role="img"
            aria-label="Icone d'une loupe"
          >
            <img
              alt="Magnifier icon"
              src="https://png.pngtree.com/svg/20170217/magnifier_278592.png"
              className="searchbar__icon"
            />
          </span>
          <form
            className="searchbar__inputbox"
            role="search"
            onSubmit={this.onSubmit}
          >
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
            />
          </form>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  suggestions: PropTypes.array.isRequired,
  listMovies: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  actions,
)(Header);
