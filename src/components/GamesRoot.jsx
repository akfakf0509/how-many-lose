import React, { Component } from "react";
import store from "../store";
import GameInfo from "./GameInfo";

class GamesRoot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameInfos: [],
    };
  }

  componentDidMount() {
    const { summoner } = store.getState();

    if (summoner.name) {
      fetch(`/riot-api/summoner/games?puuid=${summoner.puuid}&start=0&count=10`)
        .then((res) => res.json())
        .then((res) => {
          if (res.status) {
            this.setState({ gameInfos: res.status.message });

            return;
          }

          let index = -1;

          const gameInfos = res.map((e) => {
            index += 1;
            return <GameInfo gameId={e} key={index} />;
          });

          this.setState({ gameInfos });
        });
    }
  }

  render() {
    const { gameInfos } = this.state;

    return <div>{gameInfos}</div>;
  }
}

export default GamesRoot;
