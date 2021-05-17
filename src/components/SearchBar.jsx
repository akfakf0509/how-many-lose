import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import "./SearchBar.css";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summonerName: "",
    };
  }

  render() {
    return (
      <form action="/summoner">
        <div className="search-bar">
          <input type="text" name="summoner" id="summoner" />
          <span />
          <button type="submit">
            <FontAwesomeIcon icon={faSearch} size="2x" />
          </button>
        </div>
      </form>
    );
  }
}

export default SearchBar;
