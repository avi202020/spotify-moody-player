import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/lab/Slider";

const styles = theme => ({
  root: {
    flexGrow: 0,
    position: "relative"
  },
  elapsedTimeMargin: {
    verticalAlign: "bottom",
    float: "left",
    marginTop: "-10px"
  },
  totalTimeMargin: {
    verticalAlign: "bottom",
    float: "right",
    marginTop: "-10px"
  },
  slider: {
    "&:hover": {
      cursor: "default"
    },
    padding: "22px 0px"
  },
  trackThickness: {
    backgroundColor: theme.palette.primary.main,
    height: 5
  },
  thumbIcon: {
    opacity: 1,
    "&:hover": {
      boxShadow: `0px 0px 0px 5px var(--custom-color)`
    },
    "&$activated": {
      boxShadow: `0px 0px 0px 9px var(--custom-color)!important`
    },
    "&$jumped": {
      boxShadow: `0px 0px 0px 9px var(--custom-color)!important`
    }
  },
  activated: {},
  jumped: {},
  focused: {}
});

const secondFormatter = number => {
  const roundedSeconds = Math.ceil(number);
  if (roundedSeconds < 10) {
    return `0:0${roundedSeconds}`;
  } else {
    return `0:${roundedSeconds}`;
  }
};

const SongProgress = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Slider
        min={0}
        max={30} //previews are no longer than 30 seconds
        step={1}
        className={classes.root}
        classes={{
          container: classes.slider,
          track: classes.trackThickness,
          thumb: classes.thumbIcon,
          activated: classes.activated,
          jumped: classes.jumped,
          focused: classes.focused
        }}
        value={Math.ceil(props.songsInfo.timeElapsed)}
      />

      <div className={classes.elapsedTimeMargin}>
        <Typography variant="caption" noWrap>
          {secondFormatter(props.songsInfo.timeElapsed)}
        </Typography>
      </div>
      <div className={classes.totalTimeMargin}>
        <Typography variant="caption" noWrap>
          0:30
        </Typography>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    songsInfo: state.songsReducer
  };
};

export default connect(mapStateToProps)(withStyles(styles)(SongProgress));
