import React, { Component } from "react";
import store from "../store";
import "../css/UserInfo.css";

class UserInfo extends Component {
  constructor(props) {
    super(props);

    const storeState = store.getState();

    this.state = {
      profileIconId: storeState.summoner.profileIconId,
      name: storeState.summoner.name,
      summonerLevel: storeState.summoner.summonerLevel,
    };
  }

  render() {
    const { version } = store.getState();
    const { profileIconId, name, summonerLevel } = this.state;

    return (
      <div className="profile-container">
        <img
          className="profile-img"
          src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${profileIconId}.png`}
          alt="Summoner Icon"
          width="128px"
        />
        <div className="profile-info">
          <h1>{name}</h1>
          <span>Level {summonerLevel}</span>
        </div>
      </div>
    );
  }
}

export default UserInfo;
