import {
  FETCH_PLAYLISTS_ERROR,
  FETCH_PLAYLISTS_SUCCESS,
  FETCH_PLAYLISTS_PENDING,
  FETCH_PLAYLIST_SONGS_ERROR,
  FETCH_PLAYLIST_SONGS_PENDING,
  FETCH_PLAYLIST_SONGS_SUCCESS,
  GET_PLAYLIST_INDEX
} from "./types";

export const getPlaylistIndex = playlistIndex => {
  return {
    type: GET_PLAYLIST_INDEX,
    playlistIndex
  };
};

export const fetchPlaylistsPending = () => {
  return {
    type: FETCH_PLAYLISTS_PENDING
  };
};

export const fetchPlaylistsSuccess = playlists => {
  return {
    type: FETCH_PLAYLISTS_SUCCESS,
    playlists
  };
};

export const fetchPlaylistsError = () => {
  return {
    type: FETCH_PLAYLISTS_ERROR
  };
};

export const fetchPlaylists = (userId, accessToken) => {
  return dispatch => {
    const request = new Request(
      `https://api.spotify.com/v1/users/${userId}/playlists?limit=50`,
      {
        headers: new Headers({
          Authorization: "Bearer " + accessToken
        })
      }
    );

    dispatch(fetchPlaylistsPending());

    fetch(request)
      .then(res => {
        if (res.statusText === "Unauthorized") {
          window.location.href = "./";
        }
        return res.json();
      })
      .then(res => {
        dispatch(fetchPlaylistsSuccess(res.items));
      })
      .catch(err => {
        dispatch(fetchPlaylistsError(err));
      });
  };
};

export const fetchPlaylistSongsPending = () => {
  return {
    type: FETCH_PLAYLIST_SONGS_PENDING
  };
};

export const fetchPlaylistSongsSuccess = (songs, playlistId) => {
  return {
    type: FETCH_PLAYLIST_SONGS_SUCCESS,
    songs,
    playlistId
  };
};

export const fetchPlaylistSongsError = () => {
  return {
    type: FETCH_PLAYLIST_SONGS_ERROR
  };
};

export const fetchPlaylistSongs = (userId, playlistId, accessToken) => {
  return dispatch => {
    const request = new Request(
      `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
      {
        headers: new Headers({
          Authorization: "Bearer " + accessToken
        })
      }
    );

    dispatch(fetchPlaylistSongsPending());

    fetch(request)
      .then(res => {
        return res.json();
      })
      .then(res => {
        dispatch(fetchPlaylistSongsSuccess(res.items, playlistId));
      })
      .catch(err => {
        dispatch(fetchPlaylistSongsError(err));
      });
  };
};
