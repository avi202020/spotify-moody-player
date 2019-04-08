import React, { useState } from "react";
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

const SettingsPanel = props => {
  const [hiddenPlaylist, setHiddenPlaylist] = useState(
    props.switchState.uiHiddenPlaylist
  );
  const [dynamicColor, setDynamicColor] = useState(
    props.switchState.uiDynamicColor
  );
  const [darkMode, setDarkMode] = useState(props.switchState.uiDarkMode);

  const handleChangeSettings = name => event => {
    switch (name) {
      case "hiddenPlaylist":
        props.toggleHiddenPlaylist();
        return setHiddenPlaylist(event.target.checked);
      case "dynamicColor":
        props.toggleDynamicColor();
        return setDynamicColor(event.target.checked);
      case "darkMode":
        props.toggleDarkMode();
        return setDarkMode(event.target.checked);
      default:
        return null;
    }
  };

  const { classes } = props;
  return (
    <Paper className={classes.paper}>
      <FormControl component="fieldset" className={classes.fieldSet}>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={hiddenPlaylist}
                onChange={handleChangeSettings("hiddenPlaylist")}
                value="hiddenPlay"
              />
            }
            label="Hide Playlist"
          />
          <FormControlLabel
            control={
              <Switch
                checked={dynamicColor}
                onChange={handleChangeSettings("dynamicColor")}
                value="dynamicColor"
              />
            }
            label="Dynamic Color"
          />
          {!dynamicColor ? (
            <FormControlLabel
              control={
                <Switch
                  checked={darkMode}
                  onChange={handleChangeSettings("darkMode")}
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
};

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
