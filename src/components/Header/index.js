import React, { Component } from "react";
import Autosuggest from "react-autosuggest";
import AutosuggestHighlightMatch from "autosuggest-highlight/match";
import AutosuggestHighlightParse from "autosuggest-highlight/parse";
import MovieDB from "moviedb";

import "./index.scss";
const mdb = MovieDB("92b418e837b833be308bbfb1fb2aca1e");

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.title || suggestion.name;

// Use your imagination to render suggestions.
/*const renderSuggestion = suggestion => (
  <div onClick={() => seeMediaDetails(suggestion.id)}>
    {getSuggestionValue(suggestion)}
  </div>
);*/

const renderSuggestion = (suggestion, { query }) => {
  const suggestionText = getSuggestionValue(suggestion);
  const matches = AutosuggestHighlightMatch(suggestionText, query);
  const parts = AutosuggestHighlightParse(suggestionText, matches);

  return (
    <span className="suggestion-content">
      <img
        alt={`Poster of ${suggestionText}`}
        src={`https://image.tmdb.org/t/p/w92/${suggestion.poster_path}`}
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

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    if (value.length >= 3) {
      mdb.searchMulti({ query: value }, (err, res) => {
        const mediasOnly = res.results.filter(r =>
          ["movie", "tv"].includes(r.media_type),
        );

        this.setState({ suggestions: mediasOnly });
      });
    }
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
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
            aria-label="Sur cette page"
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

export default Header;
