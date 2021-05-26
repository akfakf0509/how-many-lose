import React from "react";
import "./ResultRoot.css";
import UserInfo from "./UserInfo";

function ResultRoot() {
  return (
    <div className="result-root">
      <h1>Why You Lose?</h1>
      <div className="container">
        <UserInfo />
      </div>
    </div>
  );
}

export default ResultRoot;
