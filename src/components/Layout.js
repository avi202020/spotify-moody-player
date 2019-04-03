import React from "react";
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

class Layout extends React.Component {
  static audio;

  state = {
    open: false,
    dynamicCover: defaultCover,
    dynamicBGColor: "rgba(2,136,209,0.6)", //default song
    dynamicDarkText: false, //dark text for a light theme according to color shade
    //Switch states
    hiddenPlaylist: false,
    dynamicColor: true,
    darkMode: true
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.songFeatures.energy &&
      this.props.songFeatures !== prevProps.songFeatures
    ) {
      this.setState(state => ({
        dynamicCover: this.props.songDetails.album.images[0].url,
        dynamicBGColor: hexToRGBA(
          colorShade(
            this.props.songFeatures.energy,
            this.props.songFeatures.valence
          ),
          0.6
        ),
        dynamicDarkText: isTextDark(
          this.props.songFeatures.energy,
          this.props.songFeatures.valence
        )
      }));
    }
    if (this.audio !== undefined) {
      this.audio.volume = this.props.volume / 100;
    }
  }

  calculateTime() {
    const routine = setInterval(() => {
      if (this.audio.ended) {
        this.pauseSong();
        this.props.updateSongTime(0);
      } else if (!this.props.songsInfo.songPaused) {
        this.props.updateSongTime(this.audio.currentTime);
      }
    }, 1000);
    this.setState({
      routine: routine
    });
  }

  stopSong = () => {
    if (this.audio) {
      this.props.stopSong();
      this.audio.pause();
      this.props.updateSongTime(0);
      clearInterval(this.state.routine);
    } else {
      this.props.stopSong();
      this.props.updateSongTime(0);
      clearInterval(this.state.routine);
    }
  };

  resumeSong = () => {
    if (this.audio) {
      this.props.resumeSong();
      this.audio.play();
      this.calculateTime();
    }
  };

  pauseSong = () => {
    if (this.audio) {
      this.props.pauseSong();
      this.audio.pause();
      clearInterval(this.state.routine);
    }
  };

  playAudio = song => {
    const { updateSongTime } = this.props;
    clearInterval(this.state.routine);
    if (song.track.preview_url !== null) {
      if (this.audio === undefined) {
        this.audio = new Audio(song.track.preview_url);
        this.audio.play();
        this.calculateTime();
      } else {
        updateSongTime(0);
        this.audio.pause();
        this.audio = new Audio(song.track.preview_url);
        this.audio.play();
        this.calculateTime();
      }
    } else {
      this.stopSong();
    }
  };

  handleClickSettings = event => {
    this.setState(state => ({
      open: !state.open
    }));
  };

  handleClickAway = () => {
    this.setState({
      open: false
    });
  };

  handleChangeSettings = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { classes } = this.props;
    const { open, dynamicCover } = this.state;
    document.body.style.backgroundImage = `url(${dynamicCover})`;

    return (
      <MuiThemeProvider
        theme={
          this.props.switchState.uiDynamicColor
            ? this.state.dynamicDarkText
              ? themeLight
              : themeDark
            : this.props.switchState.uiDarkMode
            ? themeDark
            : themeLight
        }
      >
        <ContainerOuter
          bcolor={
            this.props.switchState.uiDynamicColor
              ? this.state.dynamicBGColor
              : this.props.switchState.uiDarkMode
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
                    {this.props.auth.token ? (
                      <div className={classes.wholeSet}>
                        <ClickAwayListener onClickAway={this.handleClickAway}>
                          <div>
                            <IconButton
                              disableRipple={true}
                              className={classes.iconSelection}
                              onClick={this.handleClickSettings}
                            >
                              <IconBCustom
                                iconName="more_horiz"
                                iconSize={40}
                              />
                            </IconButton>
                            {open ? <SettingsSwitches /> : null}
                          </div>
                        </ClickAwayListener>
                      </div>
                    ) : null}
                  </Grid>
                </Grid>
                {this.props.switchState.uiHiddenPlaylist ? (
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
                    alignItems="center" //flex-start
                    className={classes.topRow}
                  >
                    <Grid item container xs justify="flex-end">
                      <Cover albumcover={dynamicCover} />
                    </Grid>
                    <Grid item container xs={6}>
                      {this.props.auth.token ? (
                        <Playlists playAudio={this.playAudio} />
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
                  {this.props.auth.token ? (
                    <React.Fragment>
                      <Grid item>
                        <PlaybackButtons
                          pauseAudio={this.pauseSong}
                          resumeAudio={this.resumeSong}
                          playAudio={this.playAudio}
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
  }
}

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
    volume: state.soundReducer.volume
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
