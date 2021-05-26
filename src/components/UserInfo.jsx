import React, { Component } from "react";
import store from "../store";
import "./UserInfo.css";

class UserInfo extends Component {
  constructor(props) {
    super(props);

    const storeState = store.getState();

    this.state = {
      profileIconId: storeState.summoner.profileIconId,
      name: storeState.summoner.name,
    };
  }

  render() {
    const { profileIconId, name } = this.state;

    return (
      <div className="profile-container">
        <img
          className="profile-img"
          src={`http://ddragon.leagueoflegends.com/cdn/11.11.1/img/profileicon/${profileIconId}.png`}
          alt="Summoner Icon"
          width="128px"
        />
        <p>{name}</p>
      </div>
    );
  }
}

export default UserInfo;
