import React, { useState, useEffect } from "react";
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

const Playlists = props => {
  const [selectedIndexPL, setSelectedIndexPL] = useState(
    props.playlists.playlistIndex
  );

  useEffect(() => {
    if (props.userId !== "" && props.token !== "") {
      props.fetchPlaylists(props.userId, props.token);
    }
  }, [props.userId]);

  const renderList = () => {
    if (props.playlists.playlists) {
      return props.playlists.playlists.map((playlist, index) => {
        return (
          <ListItem
            variant="body2"
            button
            selected={selectedIndexPL === index}
            key={playlist.id}
            onClick={() =>
              FetchSongs(props.userId, playlist.id, props.token, index)
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
  };

  const FetchSongs = (userId, playlistId, token, index) => {
    //We avoid fetching the same tracklist
    if (props.songs.playlistId !== playlistId) {
      props.fetchPlaylistSongs(userId, playlistId, token);
      props.getPlaylistIndex(index);
      props.getSongIndex(null);
      setSelectedIndexPL(index);
    }
  };

  const { classes } = props;
  return (
    <React.Fragment>
      <Typography className={classes.playTitle} variant="overline" noWrap>
        PLAYLISTS
      </Typography>
      <Typography className={classes.tracklistTotal} variant="overline" noWrap>
        {props.songs.songs ? props.songs.songs.length + " SONGS" : null}
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
          <List component="nav">{renderList()}</List>
        </Drawer>
        {!props.fetchSongsPending ? (
          <TrackList playAudio={props.playAudio} />
        ) : null}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    userId: state.userReducer.user ? state.userReducer.user.id : "",
    token: state.tokenReducer.token ? state.tokenReducer.token : "",
    playlists: state.playlistsReducer,
    songs: state.songsReducer.songs ? state.songsReducer : "",
    selectedSongId: state.songsReducer.songId,
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
