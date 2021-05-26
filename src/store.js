import { createStore } from "redux";

export default createStore((state, action) => {
  if (state === undefined) {
    return {
      summoner: action.summoner,
    };
  }

  if (action.type === "SEARCH") {
    return {
      ...state,
      summoner: action.summoner,
    };
  }

  return state;
  // eslint-disable-next-line no-underscore-dangle
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
