import React from "react";
import { connect } from "react-redux";
import {
  fetchPlaylists,
  fetchPlaylistSongs,
  getPlaylistIndex
} from "../actions/playlistsActions";
import {
  playSong,
  getSongFeatures,
  getSongIndex
} from "../actions/songActions";

import { withStyles } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TrackList from "./TrackList";
import Typography from "@material-ui/core/Typography";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex",
    maxHeight: "640px" //height of spotify album cover
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    position: "relative",
    background: "transparent",
    overflow: "auto",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
      width: "0",
      height: "0"
    }
  },
  playTitle: {
    position: "absolute",
    marginLeft: "15px",
    marginTop: "-25px"
  },
  tracklistTotal: {
    position: "absolute",
    marginLeft: "265px",
    marginTop: "640px"
  }
});

class Playlists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndexPL: this.props.playlists.playlistIndex,
      selectedIndexSong: this.props.songIndex
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (this.props.userId !== prevProps.userId) {
        if (this.props.userId !== "" && this.props.token !== "") {
          this.props.fetchPlaylists(this.props.userId, this.props.token);
        }
      }
    }
  }

  renderList() {
    if (this.props.playlists.playlists) {
      return this.props.playlists.playlists.map((playlist, index) => {
        return (
          <ListItem
            variant="body2"
            button
            selected={this.state.selectedIndexPL === index}
            key={playlist.id}
            onClick={() =>
              this.FetchSongs(
                this.props.userId,
                playlist.id,
                this.props.token,
                index
              )
            }
          >
            <ListItemText primary={playlist.name} />
          </ListItem>
        );
      });
    } else {
      return (
        <React.Fragment>
          <ListItem variant="body2" key="generic">
            <ListItemText primary="Loading Playlists..." />
          </ListItem>
        </React.Fragment>
      );
    }
  }

  FetchSongs(userId, playlistId, token, index) {
    //We avoid fetching the same tracklist
    if (this.props.songs.playlistId !== playlistId) {
      this.props.fetchPlaylistSongs(userId, playlistId, token);
      this.props.getPlaylistIndex(index);
      this.props.getSongIndex(null);
      this.setState({ selectedIndexPL: index });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Typography className={classes.playTitle} variant="overline" noWrap>
          PLAYLISTS
        </Typography>
        <Typography
          className={classes.tracklistTotal}
          variant="overline"
          noWrap
        >
          {this.props.songs.songs
            ? this.props.songs.songs.length + " SONGS"
            : null}
        </Typography>
        <div className={classes.root}>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper
            }}
            anchor="left"
          >
            <List component="nav">{this.renderList()}</List>
          </Drawer>
          {!this.props.fetchSongsPending ? (
            <TrackList playAudio={this.props.playAudio} />
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.userReducer.user ? state.userReducer.user.id : "",
    token: state.tokenReducer.token ? state.tokenReducer.token : "",
    playlists: state.playlistsReducer,
    songs: state.songsReducer.songs ? state.songsReducer : "",
    selectedSongId: state.songsReducer.songId,
    songIndex: state.songsReducer.songIndex,
    fetchSongsPending: state.songsReducer.fetchSongsPending
  };
};

const mapDispatchToProps = {
  fetchPlaylists,
  fetchPlaylistSongs,
  playSong,
  getSongFeatures,
  getSongIndex,
  getPlaylistIndex
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Playlists));
