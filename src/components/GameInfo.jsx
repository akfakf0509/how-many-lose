import React, { Component } from "react";
import PropTypes from "prop-types";
import store from "../store";
import "../css/GameInfo.css";

class GameInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      win: null,
      currentSummoner: {},
      game: {},
    };
  }

  componentDidMount() {
    const { summoner } = store.getState();
    const { gameId } = this.props;

    fetch(`/riot-api/game?gameId=${gameId}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.status) {
          return;
        }

        this.setState({ game: res });
        res.info.participants.forEach((e) => {
          if (summoner.name === e.summonerName) {
            this.setState({ win: e.win, currentSummoner: e });
          }
        });
      });
  }

  getWhetherWin() {
    const { win } = this.state;

    let currentComponent;

    if (win === null) {
      currentComponent = <div className="game-whether-win" />;
    } else if (win) {
      currentComponent = (
        <div className="game-whether-win" style={{ background: "blue" }}>
          <p>승리</p>
        </div>
      );
    } else {
      currentComponent = (
        <div className="game-whether-win" style={{ background: "red" }}>
          <p>패배</p>
        </div>
      );
    }

    return currentComponent;
  }

  getInfoContent() {
    const { game } = this.state;

    let gameCreation = Date.now() - game.info.gameCreation;
    let { gameDuration } = game.info;

    gameCreation /= 1000;
    if (gameCreation > 60 * 60 * 24) {
      gameCreation /= 60 * 60 * 24;
      gameCreation = `${Math.floor(gameCreation)}일`;
    } else if (gameCreation > 60 * 60) {
      gameCreation /= 60 * 60;
      gameCreation = `${Math.floor(gameCreation)}시`;
    } else if (gameCreation > 60) {
      gameCreation /= 60;
      gameCreation = `${Math.floor(gameCreation)}분`;
    } else {
      gameCreation = "1분 미만";
    }

    gameDuration /= 1000 * 60;
    gameDuration = `${Math.floor(gameDuration)}분`;

    return (
      <div>
        <p>{game.info.gameMode}</p>
        <p>{gameCreation} 전</p>
        <p>{gameDuration}</p>
      </div>
    );
  }

  getParticipantsContent() {
    const { currentSummoner, game } = this.state;
    const { participants } = game.info;

    const team1 = [];
    const team2 = [];

    let currentComponent;

    for (let i = 0; i < 10; i += 1) {
      const isCurrentSummoner =
        participants[i].summonerName === currentSummoner.summonerName;
      currentComponent = <span>{participants[i].summonerName}</span>;
      const currentComponent1 = (
        <span className="game-content-container-kda">
          <span className="game-content-kda">{participants[i].kills}</span>

          <span className="game-content-contour">/</span>

          <span className="game-content-kda game-content-deaths">
            {participants[i].deaths}
          </span>

          <span className="game-content-contour">/</span>

          <span className="game-content-kda">{participants[i].assists}</span>
        </span>
      );

      if (i < 5) {
        team1.push(
          <li
            className={isCurrentSummoner ? "game-content-current-summoner" : ""}
            key={i}
          >
            {currentComponent}
            {currentComponent1}
          </li>
        );
      } else {
        team2.push(
          <li
            className={isCurrentSummoner ? "game-content-current-summoner" : ""}
            key={i}
          >
            {currentComponent1}
            {currentComponent}
          </li>
        );
      }
    }

    return (
      <div className="game-content-participants">
        <ul className="game-content-team game-content-team1">{team1}</ul>
        <ul className="game-content-team game-content-team2">{team2}</ul>
      </div>
    );
  }

  getGameContent() {
    const { game } = this.state;

    let currentComponent;

    if (game.info) {
      currentComponent = (
        <div className="game-content">
          {this.getInfoContent()}
          {this.getParticipantsContent()}
        </div>
      );
    } else {
      currentComponent = <div className="game-content">Content is empty</div>;
    }
    return currentComponent;
  }

  render() {
    return (
      <div className="game-info">
        {this.getWhetherWin()}
        {this.getGameContent()}
      </div>
    );
  }
}

GameInfo.propTypes = {
  gameId: PropTypes.string.isRequired,
};

export default GameInfo;
