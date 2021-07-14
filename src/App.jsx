import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";
import PropTypes from "prop-types";
import ResultRoot from "./Components/ResultRoot";
import SearchBar from "./Components/SearchBar";
import store from "./store";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "SEARCH",
    };
  }

  componentDidMount() {
    const { versionPatch } = this.props;

    versionPatch();
    store.subscribe(() => {
      if (store.getState().summoner) {
        this.setState({ mode: "INFORMATION" });
      } else {
        this.setState({ mode: "SEARCH" });
      }
    });
  }

  getContent() {
    const { mode } = this.state;
    let currentContent = "";

    if (mode === "SEARCH") {
      currentContent = <SearchBar />;
    }
    if (mode === "INFORMATION") {
      currentContent = <ResultRoot />;
    }

    return currentContent;
  }

  render() {
    return <div className="App">{this.getContent()}</div>;
  }
}

App.propTypes = {
  versionPatch: PropTypes.func.isRequired,
};

export default connect(null, (dispatch) => ({
  versionPatch: () => {
    fetch("https://ddragon.leagueoflegends.com/api/versions.json")
      .then((res) => res.json())
      .then((res) => {
        dispatch({ type: "VERSION", version: res[0] });
      });
  },
}))(App);
