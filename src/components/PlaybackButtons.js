import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withStyles, IconButton } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import IconBCustom from "./IconButton";
import {
  playSong,
  getSongFeatures,
  getSongIndex
} from "../actions/songActions";

const styles = {
  root: {
    flexGrow: 1
  },
  buttonSO: {
    padding: "0px",
    "&:hover": {
      backgroundColor: "transparent"
    }
  }
};

const PlaybackButtons = props => {
  const [playPauseIcon, setplayPauseIcon] = useState(
    !props.songPaused ? "pause" : "play_arrow"
  );

  useEffect(() => {
    setplayPauseIcon(!props.songPaused ? "pause" : "play_arrow");
  }, [props.songPaused]);

  const handleClickNext = () => {
    const { songList, songId, songIndex, token } = props;

    if (songId && songIndex !== null) {
      if (songIndex + 1 >= songList.length) {
        //back to zero because we ran out of songs
        props.playSong(songList[0].track);
        props.getSongFeatures(songList[0].track.id, token);
        props.getSongIndex(0);
        props.playAudio(songList[0]);
      } else {
        props.playSong(songList[songIndex + 1].track);
        props.getSongFeatures(songList[songIndex + 1].track.id, token);
        props.getSongIndex(songIndex + 1);
        props.playAudio(songList[songIndex + 1]);
      }
    }
  };

  const handleClickPrevious = () => {
    const { songList, songId, songIndex, token } = props;
    if (songId && songIndex !== null) {
      if (songIndex === 0) {
        //Play the last song of the playlist since there is no previous song
        props.playSong(songList[songList.length - 1].track);
        props.getSongIndex(songList.length - 1);
        props.getSongFeatures(songList[songList.length - 1].track.id, token);
        props.playAudio(songList[songList.length - 1]);
      } else {
        props.playSong(songList[songIndex - 1].track);
        props.getSongIndex(songIndex - 1);
        props.getSongFeatures(songList[songIndex - 1].track.id, token);
        props.playAudio(songList[songIndex - 1]);
      }
    }
  };
  const handleClickPlayPause = () => {
    const { songPlaying, songPaused } = props;
    if (songPlaying && songPaused) {
      props.resumeAudio();
    }
    if (songPlaying && !songPaused) {
      props.pauseAudio();
    }
  };

  const { classes } = props;
  return (
    <Grid className={classes.root} container direction="row" spacing={0}>
      <Grid item>
        <IconButton
          disableRipple={true}
          className={classes.buttonSO}
          onClick={handleClickPrevious}
        >
          <IconBCustom iconName="skip_previous" iconSize={40} />
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton
          disableRipple={true}
          className={classes.buttonSO}
          onClick={handleClickPlayPause}
        >
          <IconBCustom iconName={playPauseIcon} iconSize={40} />
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton
          disableRipple={true}
          className={classes.buttonSO}
          onClick={handleClickNext}
        >
          <IconBCustom iconName="skip_next" iconSize={40} />
        </IconButton>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => {
  return {
    songPaused: state.songsReducer.songPaused,
    songPlaying: state.songsReducer.songPlaying,
    songDetails: state.songsReducer.songDetails,
    songList: state.songsReducer.songs ? state.songsReducer.songs : null,
    songId: state.songsReducer.songId ? state.songsReducer.songId : null,
    songIndex: state.songsReducer.songIndex,
    token: state.tokenReducer.token ? state.tokenReducer.token : ""
  };
};

const mapDispatchToProps = {
  playSong,
  getSongFeatures,
  getSongIndex
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PlaybackButtons));
