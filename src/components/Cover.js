import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
const styles = {
  image: {
    maxWidth: "640px",
    maxHeight: "640px" //640px
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    boxShadow: "2px 2px 10px #000000"
  }
};
const Cover = props => {
  const { classes } = props;
  return (
    <Grid item xs className={classes.image}>
      <img className={classes.img} alt="AnalBumCover" src={props.albumcover} />
    </Grid>
  );
};
export default withStyles(styles)(Cover);
