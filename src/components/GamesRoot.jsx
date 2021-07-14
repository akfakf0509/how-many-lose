import React, { Component } from "react";
import store from "../store";
import GameInfo from "./GameInfo";

class GamesRoot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      queueJSON: [],
      summonerJSON: {},
      gameInfos: [],
      loadedGamed: 0,
    };
  }

  componentDidMount() {
    const { version } = store.getState();

    fetch(
      `https://static.developer.riotgames.com/docs/lol/queues.json?${Math.random()}`
    )
      .then((res) => res.json())
      .then((queueJSON) => {
        fetch(
          `https://ddragon.leagueoflegends.com/cdn/${version}/data/ko_KR/summoner.json`
        )
          .then((res) => res.json())
          .then((res) => {
            this.setState({ queueJSON, summonerJSON: res });
            this.loadNewGames();
          });
      });

    window.addEventListener("scroll", this.scrollBottom.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollBottom.bind(this));
  }

  loadNewGames() {
    const { queueJSON, summonerJSON, gameInfos, loadedGamed } = this.state;
    const { summoner } = store.getState();

    if (summoner.name) {
      fetch(
        `/riot-api/summoner/games?puuid=${summoner.puuid}&start=${loadedGamed}&count=10`
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.status) {
            this.setState({ gameInfos: res.status.message });

            return;
          }

          let index = loadedGamed - 1;

          const newGameInfos = res.map((e) => {
            index += 1;
            return (
              <GameInfo
                key={index}
                gameId={e}
                summonerJSON={summonerJSON.data}
                queueJSON={queueJSON}
              />
            );
          });

          this.setState({ gameInfos: gameInfos.concat(newGameInfos) });
        });

      this.setState({ loadedGamed: loadedGamed + 10 });
    }
  }

  scrollBottom(e) {
    const { scrollingElement } = e.target;

    if (
      scrollingElement.scrollHeight - scrollingElement.scrollTop ===
      scrollingElement.clientHeight
    ) {
      this.loadNewGames();
    }
  }

  render() {
    const { gameInfos } = this.state;
    return <div>{gameInfos}</div>;
  }
}

export default GamesRoot;
