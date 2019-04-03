import React from "react";
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

class SliderComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.volume
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
    this.props.updateVolume(Math.ceil(value));
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

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
        onChange={this.handleChange}
        onDragEnd={this.props.jumpAtTime}
      />
    );
  }
}

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
