import React from "react";
import { withStyles } from "@material-ui/core";

const styles = {
  inner: {
    width: "100%",
    height: "100%",
    position: "absolute",
    transform: "scale(0.89)"
  }
};

const ContainerInner = props => {
  const { classes } = props;
  return <div className={classes.inner}>{props.children}</div>;
};
export default withStyles(styles)(ContainerInner);
