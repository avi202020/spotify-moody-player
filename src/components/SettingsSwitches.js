import React from "react";
import { connect } from "react-redux";
import Switch from "@material-ui/core/Switch";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core";
import {
  toggleDarkMode,
  toggleDynamicColor,
  toggleHiddenPlaylist
} from "../actions";

const styles = theme => ({
  paper: {
    position: "absolute",
    top: 60,
    right: 0,
    left: -100
  },
  wholeSet: {
    position: "relative"
  },
  fieldSet: {
    marginLeft: "10px"
  }
});

class SettingsPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hiddenPlaylist: props.switchState.uiHiddenPlaylist,
      dynamicColor: props.switchState.uiDynamicColor,
      darkMode: props.switchState.uiDarkMode
    };
  }

  handleChangeSettings = name => event => {
    this.setState({ [name]: event.target.checked });
    switch (name) {
      case "hiddenPlaylist":
        return this.props.toggleHiddenPlaylist();
      case "dynamicColor":
        return this.props.toggleDynamicColor();
      case "darkMode":
        return this.props.toggleDarkMode();
      default:
        return null;
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <FormControl component="fieldset" className={classes.fieldSet}>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.hiddenPlaylist}
                  onChange={this.handleChangeSettings("hiddenPlaylist")}
                  value="hiddenPlay"
                />
              }
              label="Hide Playlist"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.dynamicColor}
                  onChange={this.handleChangeSettings("dynamicColor")}
                  value="dynamicColor"
                />
              }
              label="Dynamic Color"
            />
            {!this.state.dynamicColor ? (
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.darkMode}
                    onChange={this.handleChangeSettings("darkMode")}
                    value="darkMode"
                  />
                }
                label="Dark Mode"
              />
            ) : null}
          </FormGroup>
        </FormControl>
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  return {
    switchState: state.uiSwitches
  };
};

const mapDispatchToProps = {
  toggleDarkMode,
  toggleDynamicColor,
  toggleHiddenPlaylist
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SettingsPanel));
