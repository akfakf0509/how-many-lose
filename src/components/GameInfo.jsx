import React, { Component } from "react";
import PropTypes from "prop-types";

class GameInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // game: {},
    };
  }

  componentDidMount() {
    const { gameId } = this.props;

    console.log("test");

    fetch(`/riot-api/game?gameId=${gameId}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        // this.setState({ game: res });
      });
  }

  render() {
    return <div>test</div>;
  }
}

GameInfo.propTypes = {
  gameId: PropTypes.string.isRequired,
};

export default GameInfo;
