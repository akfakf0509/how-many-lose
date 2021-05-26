import React, { Component } from "react";
import "./App.css";
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
      currentContent = "";
    }

    return currentContent;
  }

  render() {
    return <div className="App">{this.getContent()}</div>;
  }
}

export default App;
