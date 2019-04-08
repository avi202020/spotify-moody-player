import { combineReducers } from "redux";
import { SET_TOKEN, UPDATE_VOLUME } from "../actions/types";
import { uiReducer as uiSwitches } from "./uiReducer";
import userReducer from "./userReducer";
import playlistsReducer from "./playlistsReducer";
import songsReducer from "./songsReducer";

const tokenReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.token
      };
    default:
      return state;
  }
};

const soundReducer = (state = { volume: 100 }, action) => {
  switch (action.type) {
    case UPDATE_VOLUME:
      return {
        volume: action.volume
      };
    default:
      return state;
  }
};

export default combineReducers({
  userReducer,
  uiSwitches,
  playlistsReducer,
  songsReducer,
  soundReducer,
  tokenReducer
});
