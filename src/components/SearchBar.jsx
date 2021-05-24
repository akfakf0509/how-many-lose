import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import React from "react";
import "./SearchBar.css";

function SearchBar() {
  const dispatch = useDispatch();

  return (
    <form
      action="/summoner"
      method="post"
      onSubmit={(e) => {
        e.preventDefault();

        dispatch({
          type: "SEARCH",
          summoner: fetch(`/riot-api?name=${e.target.summoner.value}`),
        });
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

export default SearchBar;
