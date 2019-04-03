import {
  FETCH_PLAYLISTS_SUCCESS,
  FETCH_PLAYLISTS_ERROR,
  FETCH_PLAYLISTS_PENDING,
  GET_PLAYLIST_INDEX
} from "../actions/types";

export const playlistsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PLAYLISTS_PENDING:
      return {
        fetchPlaylistsPending: true,
        ...state
      };

    case FETCH_PLAYLISTS_SUCCESS:
      return {
        playlists: action.playlists,
        fetchPlaylistError: false,
        fetchPlaylistsPending: false,
        ...state
      };

    case FETCH_PLAYLISTS_ERROR:
      return {
        fetchPlaylistError: true,
        fetchPlaylistsPending: false,
        ...state
      };
    case GET_PLAYLIST_INDEX:
      return {
        ...state,
        playlistIndex: action.playlistIndex
      };

    default:
      return state;
  }
};

export default playlistsReducer;
