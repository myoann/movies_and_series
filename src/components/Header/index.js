import React, { Component } from "react";
import Autosuggest from "react-autosuggest";
import AutosuggestHighlightMatch from "autosuggest-highlight/match";
import AutosuggestHighlightParse from "autosuggest-highlight/parse";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import defaultImage from "../../assets/images/default-poster.png";
import * as actions from "../../actions";
import "./index.scss";

const mapStateToProps = ({ medias }) => ({ suggestions: medias.suggestions });

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.title || suggestion.name;

const seeMediaDetails = suggestion => {
  /* const history = useHistory();
  history.push(`/search?id=${mediaId}&mediaType=${mediaId ? "tv" : "movie"}`); */
  // Temporary
  window.location.href = `/search?id=${suggestion.id}&mediaType=${
    suggestion.media_type === "movie" ? "movie" : "tv"
  }`;
};

const renderSuggestion = (suggestion, { query }) => {
  const suggestionText = getSuggestionValue(suggestion);
  const matches = AutosuggestHighlightMatch(suggestionText, query);
  const parts = AutosuggestHighlightParse(suggestionText, matches);

  return (
    <span
      className="suggestion-content"
      onClick={() => seeMediaDetails(suggestion)}
    >
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

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      suggestions: [],
      prevScrollpos: window.pageYOffset,
      visible: true,
    };
  }

  // Adds an event listener when the component is mount.
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillReceiveProps = nextProps => {
    this.setState({ suggestions: nextProps.suggestions });
  };

  // Remove the event listener when the component is unmount.
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  // Hide or show the menu.
  handleScroll = () => {
    const { prevScrollpos } = this.state;
    const currentScrollPos = window.pageYOffset;
    const visible = prevScrollpos > currentScrollPos;

    this.setState({
      prevScrollpos: currentScrollPos,
      visible,
    });
  };

  onChange = (event, { newValue }) => {
    this.setState({ value: newValue });
  };

  onSubmit = e => {
    e.preventDefault();
    const { listMedias } = this.props;
    const { value } = this.state;

    listMedias({ query: value });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = async ({ value }) => {
    if (value.length >= 3) {
      const { listMedias } = this.props;

      listMedias({ query: value, isSuggestionOnly: true });
    }
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] });
  };

  render() {
    const { value, suggestions, visible } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: "What are you looking for ?",
      value,
      onChange: this.onChange,
    };

    return (
      <header className={`header ${!visible ? "header--hidden" : ""}`}>
        <a href="/" className="homeButton">
          <img
            src="https://image.flaticon.com/icons/png/512/18/18625.png"
            alt="Home"
          />
        </a>

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
  listMedias: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  actions,
)(Header);
