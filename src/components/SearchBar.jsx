import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./SearchBar.css";
import PropTypes from "prop-types";

function SearchBar({ onSubmit }) {
  return (
    <form
      action="/summoner"
      method="post"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e.target.summoner.value);
      }}
    >
      <h5>Why You Lose?</h5>
      <div className="search-bar">
        <input type="text" name="summoner" id="summoner" />
        <span />
        <button type="submit">
          <FontAwesomeIcon icon={faSearch} size="2x" color="#555555" />
        </button>
      </div>
    </form>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
