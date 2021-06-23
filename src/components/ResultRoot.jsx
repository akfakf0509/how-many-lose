import { faBackspace } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import store from "../store";
import "../css/ResultRoot.css";
import UserInfo from "./UserInfo";

class ResultRoot extends Component {
  constructor(props) {
    super(props);

    this.currentContent = "";
  }

  getUserInfo() {
    const { summoner } = store.getState();

    if (summoner.name) {
      this.currentContent = <UserInfo />;

      fetch(`/riot-api/summoner/games?puuid=${summoner.puuid}&start=0&count=20`)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
        });
    } else {
      this.currentContent = "User is undefined";
    }

    return this.currentContent;
  }

  render() {
    return (
      <div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();

            store.dispatch({ type: "SEARCH", summoner: null });
          }}
          className="btn-back"
        >
          <FontAwesomeIcon icon={faBackspace} size="3x" color="white" />
        </button>
        <div className="result-root">
          <h1>Why You Lose?</h1>
          <div className="container">{this.getUserInfo()}</div>
        </div>
      </div>
    );
  }
}

export default ResultRoot;
