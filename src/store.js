import { createStore } from "redux";

export default createStore((state, action) => {
  if (state === undefined) {
    return {
      summoner: {
        id: "",
        accountId: "",
        puuid: "",
        name: "",
        profileIconId: 0,
        revisionDate: 0,
        summonerLevel: 0,
      },
    };
  }

  if (action.type === "SEARCH") {
    return { ...state, summoner: action.summoner };
  }

  return state;
  // eslint-disable-next-line no-underscore-dangle
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
