import React from "react";
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

class PlaybackButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playPauseIcon: !props.songPaused ? "pause" : "play_arrow"
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.songPaused !== prevProps.songPaused) {
      this.setState({
        playPauseIcon: !this.props.songPaused ? "pause" : "play_arrow"
      });
    }
  }
  handleClickNext = () => {
    const { songList, songId, songIndex, token } = this.props;

    if (songId && songIndex !== null) {
      if (songIndex + 1 >= songList.length) {
        //back to zero because we ran out of songs
        this.props.playAudio(songList[0]);
        this.props.playSong(songList[0].track);
        this.props.getSongFeatures(songList[0].track.id, token);
        this.props.getSongIndex(0);
      } else {
        this.props.playAudio(songList[songIndex + 1]);
        this.props.playSong(songList[songIndex + 1].track);
        this.props.getSongFeatures(songList[songIndex + 1].track.id, token);
        this.props.getSongIndex(songIndex + 1);
      }
    }
  };

  handleClickPrevious = () => {
    const { songList, songId, songIndex, token } = this.props;
    if (songId && songIndex !== null) {
      if (songIndex === 0) {
        //Play the last song of the playlist since there is no previous song
        this.props.getSongIndex(songList.length - 1);
        this.props.playSong(songList[songList.length - 1].track);
        this.props.getSongFeatures(
          songList[songList.length - 1].track.id,
          token
        );
        this.props.playAudio(songList[songList.length - 1]);
      } else {
        this.props.getSongIndex(songIndex - 1);
        this.props.playSong(songList[songIndex - 1].track);
        this.props.getSongFeatures(songList[songIndex - 1].track.id, token);
        this.props.playAudio(songList[songIndex - 1]);
      }
    }
  };
  handleClickPlayPause = () => {
    const { songPlaying, songPaused, songId } = this.props;
    if (songPlaying && songPaused) {
      this.props.resumeAudio();
    }
    if (songPlaying && !songPaused) {
      this.props.pauseAudio();
    }
    if (!songPlaying && songId) {
      console.log(this.props);
      //Song selected but it's not being played, let's play it again then
      this.props.resumeAudio();
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid className={classes.root} container direction="row" spacing={0}>
        <Grid item>
          <IconButton
            disableRipple={true}
            className={classes.buttonSO}
            onClick={this.handleClickPrevious}
          >
            <IconBCustom iconName="skip_previous" iconSize={40} />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            disableRipple={true}
            className={classes.buttonSO}
            onClick={this.handleClickPlayPause}
          >
            <IconBCustom iconName={this.state.playPauseIcon} iconSize={40} />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            disableRipple={true}
            className={classes.buttonSO}
            onClick={this.handleClickNext}
          >
            <IconBCustom iconName="skip_next" iconSize={40} />
          </IconButton>
        </Grid>
      </Grid>
    );
  }
}

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
