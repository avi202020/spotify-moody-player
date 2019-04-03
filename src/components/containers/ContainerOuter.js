import React from "react";
import { withStyles } from "@material-ui/core";

const styles = {
  outer: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.6)"
  }
};

const ContainerOuter = props => {
  const { classes } = props;
  return (
    <div className={classes.outer} style={{ backgroundColor: props.bcolor }}>
      {props.children}
    </div>
  );
};
export default withStyles(styles)(ContainerOuter);
