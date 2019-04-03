import {
  FETCH_PLAYLIST_SONGS_ERROR,
  FETCH_PLAYLIST_SONGS_PENDING,
  FETCH_PLAYLIST_SONGS_SUCCESS,
  PLAY_SONG,
  STOP_SONG,
  PAUSE_SONG,
  RESUME_SONG,
  UPDATE_SONG_TIME,
  GET_SONG_FEATURES_ERROR,
  GET_SONG_FEATURES_PENDING,
  GET_SONG_FEATURES_SUCCESS,
  GET_SONG_INDEX
} from "../actions/types";

const defaultState = {
  fetchSongsPending: true,
  songPlaying: false,
  timeElapsed: 0,
  songId: 0,
  viewType: "songs",
  songPaused: true
};

export const songsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_PLAYLIST_SONGS_PENDING:
      return {
        ...state,
        fetchSongsPending: true
      };
    case FETCH_PLAYLIST_SONGS_SUCCESS:
      return {
        ...state,
        songs: action.songs,
        fetchArtistSongsError: false,
        fetchArtistSongsPending: false,
        playlistId: action.playlistId,
        fetchSongsPending: false
      };
    case FETCH_PLAYLIST_SONGS_ERROR:
      return {
        ...state,
        fetchArtistSongsError: true,
        fetchArtistSongsPending: false,
        fetchSongsPending: true
      };
    case PLAY_SONG:
      return {
        ...state,
        songPlaying: true,
        songDetails: action.song,
        songId: action.song.id,
        timeElapsed: 0,
        songPaused: false
      };
    case STOP_SONG:
      return {
        ...state,
        songPlaying: false,
        timeElapsed: 0,
        songPaused: true
      };
    case PAUSE_SONG:
      return {
        ...state,
        songPaused: true
      };
    case RESUME_SONG:
      return {
        ...state,
        songPaused: false
      };
    case UPDATE_SONG_TIME:
      return {
        ...state,
        timeElapsed: action.time
      };
    case GET_SONG_INDEX:
      return {
        ...state,
        songIndex: action.songIndex
      };
    case GET_SONG_FEATURES_ERROR:
      return {
        ...state,
        getSongFeaturesError: true,
        getSongFeaturesPending: false
      };
    case GET_SONG_FEATURES_PENDING:
      return {
        ...state,
        getSongFeaturesPending: true,
        getSongFeaturesError: false
      };
    case GET_SONG_FEATURES_SUCCESS:
      return {
        ...state,
        features: action.features,
        getSongFeaturesError: false,
        getSongFeaturesPending: false
      };
    default:
      return state;
  }
};

export default songsReducer;
