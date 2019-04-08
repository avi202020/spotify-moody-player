import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import IconButton from "@material-ui/core/IconButton";
import Playlists from "./Playlists";
import PlaybackButtons from "./PlaybackButtons";
import Cover from "./Cover";
import SongProgress from "./SongProgress";
import Volume from "./Volume";
import IconBCustom from "./IconButton";
import SongHeader from "./Header";
import ContainerOuter from "./containers/ContainerOuter";
import ContainerInner from "./containers/ContainerInner";
import LogInButton from "./LoginButton";
import defaultCover from "../assets/cover.jpg";
import SettingsSwitches from "./SettingsSwitches";
import Icon from "@material-ui/core/Icon";
import {
  colorShade,
  isTextDark,
  hexToRGBA
} from "../scripts/createDynamicTheme";
import {
  stopSong,
  pauseSong,
  resumeSong,
  updateSongTime
} from "../actions/songActions";

const themeDark = createMuiTheme({
  palette: {
    type: "dark", // Switching the dark mode on is a single property value change.
    primary: {
      main: "#ffffff",
      light: "#1DB954"
    },
    secondary: {
      main: "#1DB954"
    }
  },
  typography: { useNextVariants: true }
});

const themeLight = createMuiTheme({
  palette: {
    type: "light",

    primary: {
      main: "#242424",
      light: "#1DB954"
    },
    secondary: {
      main: "#1DB954"
    }
  },
  typography: { useNextVariants: true }
});

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    height: "100vh"
  },
  gridContainer: {},
  topRow: {
    height: "85vh",
    overflow: "hidden"
  },
  paper: {
    position: "absolute",
    top: 60,
    right: 0,
    left: -100
  },
  iconSelection: {
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  iconPlaceholder: {
    color: "rgba(0,0,0,0)"
  },
  wholeSet: {
    position: "relative"
  },
  fieldSet: {
    marginLeft: "10px"
  },
  ContainerOuter: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.6)"
  },
  ContainerInner: {
    width: "100%",
    height: "100%",
    position: "absolute",
    transform: "scale(0.89)"
  }
});

const Layout = props => {
  const [open, setOpen] = useState(false);
  const [dynamicCover, setDynamicCover] = useState(defaultCover);
  const [dynamicBGColor, setDynamicBGColor] = useState("rgba(2,136,209,0.6)"); //default song
  const [dynamicDarkText, setDynamicDarkText] = useState(false); //dark text for a light theme according to color shade
  const routine = useRef();
  const audio = useRef();
  useEffect(() => {
    if (props.songFeatures.energy) {
      setDynamicCover(props.songDetails.album.images[0].url);
      setDynamicBGColor(
        hexToRGBA(
          colorShade(props.songFeatures.energy, props.songFeatures.valence),
          0.6
        )
      );
      setDynamicDarkText(
        isTextDark(props.songFeatures.energy, props.songFeatures.valence)
      );
    }
  }, [props.songFeatures]);

  useEffect(() => {
    if (audio.current !== undefined) {
      audio.current.volume = props.volume / 100;
    }
  }, [props.volume]);

  useEffect(() => {
    if (audio.current) {
      if (props.songPaused) {
        clearInterval(routine.current);
        audio.current.pause();
      } else {
        audio.current.play();
        calculateTime();
      }
    }
  }, [props.songPaused]);

  useEffect(() => {
    if (!props.songPlaying) {
      clearInterval(routine.current);
      updateSongTime(0);
    }
  }, [props.songPlaying]);

  const calculateTime = () => {
    clearInterval(routine.current);
    const routinec = setInterval(() => {
      if (audio.current) {
        if (audio.current.ended) {
          clearInterval(routine.current);
          pauseSong();
          props.updateSongTime(0);
        } else if (!props.songsInfo.songPaused) {
          props.updateSongTime(audio.current.currentTime);
        }
      }
    }, 1000);
    routine.current = routinec;
  };

  const stopSong = () => {
    if (audio.current) {
      audio.current.pause();
      props.stopSong();
      clearInterval(routine.current);
      props.updateSongTime(0);
    } else {
      props.stopSong();
      clearInterval(routine.current);
      props.updateSongTime(0);
    }
  };

  const resumeSong = () => {
    if (audio.current) {
      props.resumeSong();
    }
  };

  const pauseSong = () => {
    if (audio.current) {
      props.pauseSong();
      audio.current.pause();
      clearInterval(routine.current);
    }
  };

  const playAudio = song => {
    const { updateSongTime } = props;
    clearInterval(routine.current);
    if (song.track.preview_url !== null) {
      if (audio.current === undefined) {
        audio.current = new Audio(song.track.preview_url);
      } else {
        updateSongTime(0);
        audio.current.pause();
        audio.current = new Audio(song.track.preview_url);
        audio.current.play();
        calculateTime();
      }
    } else {
      stopSong();
    }
  };

  const handleClickSettings = () => {
    setOpen(!open);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const { classes } = props;
  document.body.style.backgroundImage = `url(${dynamicCover})`;

  return (
    <MuiThemeProvider
      theme={
        props.switchState.uiDynamicColor
          ? dynamicDarkText
            ? themeLight
            : themeDark
          : props.switchState.uiDarkMode
          ? themeDark
          : themeLight
      }
    >
      <ContainerOuter
        bcolor={
          props.switchState.uiDynamicColor
            ? dynamicBGColor
            : props.switchState.uiDarkMode
            ? "rgba(0, 0, 0, 0.6)"
            : "rgba(255, 255, 255, 0.4)"
        }
      >
        <ContainerInner>
          <div className={classes.root}>
            <Grid
              container
              justify="space-between"
              alignItems="stretch"
              spacing={16}
              className={classes.gridContainer}
            >
              <Grid
                item
                container
                xs={12}
                direction="row"
                justify="space-between"
                alignItems="center"
                spacing={16}
                wrap="nowrap"
              >
                <Grid item xs={1}>
                  <Icon
                    className={classes.iconPlaceholder}
                    style={{ fontSize: 40 }}
                  >
                    fiber_manual_record
                  </Icon>
                </Grid>
                <Grid item zeroMinWidth>
                  <SongHeader />
                </Grid>
                <Grid item xs={1} container justify="flex-end">
                  {props.auth.token ? (
                    <div className={classes.wholeSet}>
                      <ClickAwayListener onClickAway={handleClickAway}>
                        <div>
                          <IconButton
                            disableRipple={true}
                            className={classes.iconSelection}
                            onClick={handleClickSettings}
                          >
                            <IconBCustom iconName="more_horiz" iconSize={40} />
                          </IconButton>
                          {open ? <SettingsSwitches /> : null}
                        </div>
                      </ClickAwayListener>
                    </div>
                  ) : null}
                </Grid>
              </Grid>
              {props.switchState.uiHiddenPlaylist ? (
                <Grid
                  item
                  container
                  xs={12}
                  direction="row"
                  spacing={16}
                  justify="center"
                  alignItems="center"
                  className={classes.topRow}
                >
                  <Cover albumcover={dynamicCover} />
                </Grid>
              ) : (
                <Grid
                  item
                  container
                  xs={12}
                  direction="row"
                  spacing={16}
                  justify="center"
                  alignItems="center"
                  className={classes.topRow}
                >
                  <Grid item container xs justify="flex-end">
                    <Cover albumcover={dynamicCover} />
                  </Grid>
                  <Grid item container xs={6}>
                    {props.auth.token ? (
                      <Playlists playAudio={playAudio} />
                    ) : (
                      <LogInButton />
                    )}
                  </Grid>
                </Grid>
              )}
              <Grid
                item
                container
                xs={12}
                direction="row"
                justify="space-between"
                spacing={16}
              >
                {props.auth.token ? (
                  <React.Fragment>
                    <Grid item>
                      <PlaybackButtons
                        pauseAudio={pauseSong}
                        resumeAudio={resumeSong}
                        playAudio={playAudio}
                      />
                    </Grid>
                    <Grid item xs>
                      <SongProgress />
                    </Grid>
                    <Grid item sm={1}>
                      <Volume />
                    </Grid>
                  </React.Fragment>
                ) : null}
              </Grid>
            </Grid>
          </div>
        </ContainerInner>
      </ContainerOuter>
    </MuiThemeProvider>
  );
};

Layout.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    switchState: state.uiSwitches,
    auth: state.tokenReducer,
    songDetails: state.songsReducer.songDetails,
    songFeatures: state.songsReducer.features
      ? state.songsReducer.features
      : "",
    songsInfo: state.songsReducer,
    volume: state.soundReducer.volume,
    songPaused: state.songsReducer.songPaused,
    songPlaying: state.songsReducer.songPlaying
  };
};

const mapDispatchToProps = {
  stopSong,
  pauseSong,
  resumeSong,
  updateSongTime
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Layout));
