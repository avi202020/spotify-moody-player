import * as actionTypes from "./types";

export const setToken = token => {
  return {
    type: actionTypes.SET_TOKEN,
    token
  };
};

export const updateVolume = volume => {
  return {
    type: actionTypes.UPDATE_VOLUME,
    volume
  };
};

export const toggleHiddenPlaylist = () => {
  return {
    type: actionTypes.TOGGLE_HIDE_PLAYLIST
  };
};

export const toggleDynamicColor = () => {
  return {
    type: actionTypes.TOGGLE_DYNAMIC_COLOR
  };
};

export const toggleDarkMode = () => {
  return {
    type: actionTypes.TOGGLE_DARK_MODE
  };
};

export const fetchUserSuccess = user => {
  return {
    type: actionTypes.FETCH_USER_SUCCESS,
    user
  };
};

export const fetchUserError = () => {
  return {
    type: actionTypes.FETCH_USER_ERROR
  };
};

export const fetchUser = accessToken => {
  return dispatch => {
    const request = new Request("https://api.spotify.com/v1/me", {
      headers: new Headers({
        Authorization: "Bearer " + accessToken
      })
    });

    fetch(request)
      .then(res => {
        if (res.statusText === "Unauthorized") {
          window.location.href = "./";
        }
        return res.json();
      })
      .then(res => {
        dispatch(fetchUserSuccess(res));
      })
      .catch(err => {
        dispatch(fetchUserError(err));
      });
  };
};
