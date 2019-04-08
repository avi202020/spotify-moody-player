import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Slider from "./Slider";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
const styles = theme => ({
  root: {
    flexGrow: 0
  },
  volIcon: {
    float: "right",
    marginRight: "-10px",
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  ico: {
    float: "right",
    marginTop: "12px",
    marginRight: "5px",
    color: theme.palette.primary.main
  }
});

const Volume = props => {
  const { classes } = props;

  return (
    <Grid className={classes.root} container direction="row">
      <Grid item xs={2}>
        <Icon className={classes.ico} style={{ fontSize: 20 }}>
          volume_up
        </Icon>
      </Grid>
      <Grid item xs>
        <Slider />
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(Volume);
