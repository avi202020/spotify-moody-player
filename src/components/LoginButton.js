import React from "react";
import Fab from "@material-ui/core/Fab";
import { withStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const spotifyauthurl = "https://accounts.spotify.com/authorize?";
const client_id = "yourcliedidhere"; // Your client id
const redirect_uri = "http://localhost:3000/callback"; // Your redirect uri
const scope =
  "playlist-read-private%20playlist-read-collaborative%20user-library-read%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state";

const styles = theme => ({
  fab: {
    backgroundColor: "#1DB954",
    "&:hover": {
      backgroundColor: "#14813a"
    }
  },
  container: {
    maxWidth: "640px"
  },
  text: {
    paddingBottom: "30px"
  }
});

const LoginButton = props => {
  const { classes } = props;

  const reqURL = () => {
    return (window.location.href =
      spotifyauthurl +
      "client_id=" +
      client_id +
      "&scope=" +
      scope +
      "&response_type=token" +
      "&redirect_uri=" +
      redirect_uri);
  };

  return (
    <div className={classes.container}>
      <Typography className={classes.text} variant="h4" color="primary">
        The colors will match the mood of the song.
      </Typography>
      <Fab variant="extended" className={classes.fab} onClick={reqURL}>
        <Typography color="primary">LOG IN WITH SPOTIFY</Typography>
      </Fab>
    </div>
  );
};

export default withStyles(styles)(LoginButton);
