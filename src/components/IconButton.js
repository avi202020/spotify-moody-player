import React from "react";
import Icon from "@material-ui/core/Icon";
import { withStyles } from "@material-ui/core";
const styles = theme => ({
  iconHover: {
    color: theme.palette.primary.main,
    "&:hover": {
      color: theme.palette.primary.light
    }
  }
});

const IconButton = props => {
  const { classes } = props;
  return (
    <Icon className={classes.iconHover} style={{ fontSize: props.iconSize }}>
      {props.iconName}
    </Icon>
  );
};

export default withStyles(styles)(IconButton);
