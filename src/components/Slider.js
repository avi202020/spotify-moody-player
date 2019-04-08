import React, { useState } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { updateVolume } from "../actions/";
import Slider from "@material-ui/lab/Slider";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  slider: {
    padding: "22px 0px",
    "&:hover $thumbIcon": {
      opacity: 1
    }
  },
  trackThickness: {
    backgroundColor: theme.palette.primary.main,
    height: 5
  },
  thumbIcon: {
    opacity: 0
  }
});

const SliderComp = props => {
  const [value, setValue] = useState(props.volume);

  const handleChange = (event, value) => {
    setValue(value);
    props.updateVolume(Math.ceil(value));
  };
  const { classes } = props;
  return (
    <Slider
      min={0}
      max={100}
      className={classes.root}
      classes={{
        container: classes.slider,
        track: classes.trackThickness,
        thumb: classes.thumbIcon
      }}
      value={value}
      onChange={handleChange}
    />
  );
};

const mapStateToProps = state => {
  return {
    volume: state.soundReducer.volume
  };
};

const mapDispatchToProps = {
  updateVolume
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SliderComp));
