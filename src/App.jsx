import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <form action="/">
        <input type="text" name="summoner" id="summoner" />
        <button type="submit">
          <i className="fas fa-search" />
        </button>
      </form>
    </div>
  );
}

export default App;
