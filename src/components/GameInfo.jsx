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

        res.info.participants.forEach((e) => {
          if (summoner.name === e.summonerName) {
            this.setState({ win: e.win, currentSummoner: e, game: res });
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
        <div className="game-whether-win" style={{ background: "#538FFE" }}>
          <p>승리</p>
        </div>
      );
    } else {
      currentComponent = (
        <div className="game-whether-win" style={{ background: "#FF4475" }}>
          <p>패배</p>
        </div>
      );
    }

    return currentComponent;
  }

  getInfoItems() {
    const { version } = store.getState();
    const { currentSummoner } = this.state;

    const items = [
      currentSummoner.item0,
      currentSummoner.item1,
      currentSummoner.item2,
      currentSummoner.item3,
      currentSummoner.item4,
      currentSummoner.item5,
    ];
    const currentComponent = [null, null, null, null, null, null];

    for (let i = 0; i < 6; i += 1) {
      if (items[i] !== 0) {
        currentComponent[i] = (
          <img
            key={i}
            className="game-content-info-item"
            alt={`item${i}`}
            src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${items[i]}.png`}
          />
        );
      } else {
        currentComponent[i] = (
          <div key={i} className="game-content-info-item" />
        );
      }
    }

    return currentComponent;
  }

  getInfoContent() {
    const { queueJSON } = this.props;
    const { currentSummoner, game } = this.state;

    let queueDescription;
    let gameCreation = Date.now() - game.info.gameCreation;
    let { gameDuration } = game.info;

    queueJSON.forEach((e) => {
      if (game.info.queueId === e.queueId) {
        queueDescription = e.description;
      }
    });

    gameCreation /= 1000;
    if (gameCreation > 60 * 60 * 24) {
      gameCreation /= 60 * 60 * 24;
      gameCreation = `${Math.floor(gameCreation)}일`;
    } else if (gameCreation > 60 * 60) {
      gameCreation /= 60 * 60;
      gameCreation = `${Math.floor(gameCreation)}시간`;
    } else if (gameCreation > 60) {
      gameCreation /= 60;
      gameCreation = `${Math.floor(gameCreation)}분`;
    } else {
      gameCreation = "1분 미만";
    }

    gameDuration /= 1000 * 60;
    gameDuration = `${Math.floor(gameDuration)}분`;

    return (
      <div className="game-content-info">
        <p>{queueDescription}</p>
        <p>
          {gameCreation} 전<span className="game-content-contour"> / </span>
          {gameDuration}
        </p>
        <div className="game-content-container-items">
          {this.getInfoItems()}
        </div>
        <span className="game-content-container-kda">
          <span className="game-content-kda" style={{ width: 30 }}>
            {currentSummoner.kills}
          </span>

          <span className="game-content-contour">/</span>

          <span
            className="game-content-kda game-content-deaths"
            style={{ width: 30 }}
          >
            {currentSummoner.deaths}
          </span>

          <span className="game-content-contour">/</span>

          <span className="game-content-kda" style={{ width: 30 }}>
            {currentSummoner.assists}
          </span>
        </span>
      </div>
    );
  }

  getChampionImage() {
    const { version } = store.getState();
    const { currentSummoner } = this.state;
    const { summonerJSON } = this.props;

    let currentComponent = "Spell is null";
    let currentSpell1;
    let currentSpell2;

    Object.keys(summonerJSON).forEach((e) => {
      if (Number(summonerJSON[e].key) === currentSummoner.summoner1Id) {
        currentSpell1 = summonerJSON[e];
      } else if (Number(summonerJSON[e].key) === currentSummoner.summoner2Id) {
        currentSpell2 = summonerJSON[e];
      }
    });

    if (currentSpell1 && currentSpell2) {
      if (currentSummoner.championName === "FiddleSticks") {
        currentSummoner.championName = "Fiddlesticks";
      }

      currentComponent = (
        <div className="game-content-summoner-info">
          <img
            className="game-content-main-champion-image"
            alt="Main Champion"
            src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${currentSummoner.championName}.png`}
          />
          <div className="game-content-spells">
            <img
              className="game-content-spells-image"
              alt="Spell 1"
              src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${currentSpell1.id}.png`}
            />
            <img
              className="game-content-spells-image"
              alt="Spell 2"
              src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${currentSpell2.id}.png`}
            />
          </div>
        </div>
      );
    }

    return currentComponent;
  }

  getParticipantsContent() {
    const { version } = store.getState();
    const { currentSummoner, game } = this.state;
    const { participants } = game.info;

    const team1 = [];
    const team2 = [];

    let currentComponent;

    for (let i = 0; i < 10; i += 1) {
      const isCurrentSummoner =
        participants[i].summonerName === currentSummoner.summonerName;
      currentComponent = (
        <span className="game-content-summoner-name">
          {participants[i].summonerName}
        </span>
      );
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

      if (participants[i].championName === "FiddleSticks") {
        participants[i].championName = "Fiddlesticks";
      }

      if (i < 5) {
        team1.push(
          <li
            className={`game-content-item ${
              isCurrentSummoner ? "game-content-current-summoner" : ""
            }`}
            key={i}
          >
            {currentComponent}
            <img
              className="game-content-champion-name"
              alt="Main Champion"
              src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${participants[i].championName}.png`}
            />
            {currentComponent1}
          </li>
        );
      } else {
        team2.push(
          <li
            className={`game-content-item ${
              isCurrentSummoner ? "game-content-current-summoner" : ""
            }`}
            key={i}
          >
            {currentComponent1}
            <img
              className="game-content-champion-name"
              alt="Main Champion"
              src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${participants[i].championName}.png`}
            />
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
          {this.getChampionImage()}
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
  summonerJSON: PropTypes.shape().isRequired,
  queueJSON: PropTypes.arrayOf(
    PropTypes.shape({
      queueId: PropTypes.number.isRequired,
      map: PropTypes.string.isRequired,
      description: PropTypes.string,
      notes: PropTypes.string,
    })
  ).isRequired,
};

export default GameInfo;
