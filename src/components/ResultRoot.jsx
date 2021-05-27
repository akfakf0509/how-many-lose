import { faBackspace } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import store from "../store";
import "./ResultRoot.css";
import UserInfo from "./UserInfo";

class ResultRoot extends Component {
  getUserInfo() {
    let currentContent = "";

    if (store.getState().summoner.name) {
      currentContent = <UserInfo />;
    }

    return currentContent;
  }

  render() {
    return (
      <div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();

            dispatch({ type: "SEARCH", summoner: null });
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
