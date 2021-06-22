import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import React from "react";
import "../css/SearchBar.css";

function SearchBar() {
  const dispatch = useDispatch();

  return (
    <form
      action="/summoner"
      method="post"
      onSubmit={(e) => {
        e.preventDefault();

        fetch(`/riot-api/summoner/info?name=${e.target.summoner.value}`)
          .then((response) => response.json())
          .then((response) => {
            dispatch({
              type: "SEARCH",
              summoner: response,
            });

            fetch(
              `/riot-api/summoner/games?puuid=${response.puuid}&start=0&count=20`
            )
              .then((res) => res.json())
              .then((res) => {
                console.log(res);
              });
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
