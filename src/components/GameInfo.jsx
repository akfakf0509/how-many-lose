import React, { Component } from "react";
import PropTypes from "prop-types";
import store from "../store";
import "../css/GameInfo.css";

class GameInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      win: null,
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
            this.setState({ win: e.win });
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

  getGameContent() {
    const { game } = this.state;

    let currentComponent;

    if (game.info) {
      currentComponent = (
        <div className="game-content">{game.info.gameMode}</div>
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
