import {
  TOGGLE_HIDE_PLAYLIST,
  TOGGLE_DYNAMIC_COLOR,
  TOGGLE_DARK_MODE
} from "../actions/types";

const defaultState = {
  uiHiddenPlaylist: false,
  uiDynamicColor: true,
  uiDarkMode: true
};

export const uiReducer = (state = defaultState, action) => {
  switch (action.type) {
    case TOGGLE_HIDE_PLAYLIST:
      return {
        ...state,
        uiHiddenPlaylist: !state.uiHiddenPlaylist
      };
    case TOGGLE_DYNAMIC_COLOR:
      return {
        ...state,
        uiDynamicColor: !state.uiDynamicColor
      };
    case TOGGLE_DARK_MODE:
      return {
        ...state,
        uiDarkMode: !state.uiDarkMode
      };
    default:
      return state;
  }
};

export default uiReducer;
