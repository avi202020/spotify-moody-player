import {
  PLAY_SONG,
  STOP_SONG,
  PAUSE_SONG,
  RESUME_SONG,
  UPDATE_SONG_TIME,
  GET_SONG_FEATURES_ERROR,
  GET_SONG_FEATURES_PENDING,
  GET_SONG_FEATURES_SUCCESS,
  GET_SONG_INDEX
} from "./types";

export const playSong = song => {
  return {
    type: PLAY_SONG,
    song
  };
};

export const stopSong = () => {
  return {
    type: STOP_SONG
  };
};

export const pauseSong = () => {
  return {
    type: PAUSE_SONG
  };
};

export const resumeSong = () => {
  return {
    type: RESUME_SONG
  };
};

export const updateSongTime = time => {
  return {
    type: UPDATE_SONG_TIME,
    time
  };
};
export const getSongIndex = songIndex => {
  return {
    type: GET_SONG_INDEX,
    songIndex
  };
};

export const getSongFeaturesError = () => {
  return {
    type: GET_SONG_FEATURES_ERROR
  };
};

export const getSongFeaturesPending = () => {
  return {
    type: GET_SONG_FEATURES_PENDING
  };
};

export const getSongFeaturesSuccess = features => {
  return {
    type: GET_SONG_FEATURES_SUCCESS,
    features
  };
};

export const getSongFeatures = (songId, accessToken) => {
  return dispatch => {
    const request = new Request(
      `https://api.spotify.com/v1/audio-features/${songId}`,
      {
        headers: new Headers({
          Authorization: "Bearer " + accessToken
        })
      }
    );
    dispatch(getSongFeaturesPending());
    fetch(request)
      .then(res => {
        if (res.statusText === "Unauthorized") {
          window.location.href = "./";
        }
        return res.json();
      })
      .then(res => {
        dispatch(getSongFeaturesSuccess(res));
      })
      .catch(err => {
        dispatch(getSongFeaturesError(err));
      });
  };
};
