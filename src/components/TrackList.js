import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {
  getSongFeatures,
  getSongIndex,
  playSong
} from "../actions/songActions";

const styles = theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 0,
    overflow: "auto",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
      width: "0",
      height: "0"
    }
  },
  table: {
    maxWidth: 500
  },
  tableC: {
    borderBottomColor: theme.palette.divider
  },
  tableRow: {
    "&:hover": {
      cursor: "pointer"
    }
  }
});

const TrackList = props => {
  const [selectedIndexSong, setSelectedIndexSong] = useState(props.songIndex);
  let tableScroll = null;

  useEffect(() => {
    if (props.songs.playlistId) {
      if (tableScroll) {
        tableScroll.scrollTop = 0;
      }
    }
  }, [props.songs.playlistId]);

  useEffect(() => {
    setSelectedIndexSong(props.songIndex);
  }, [props.songIndex]);

  const msToMinutesAndSeconds = ms => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  const SelectSongToPlay = (song, index) => {
    props.getSongIndex(index);
    props.playSong(song.track);
    props.getSongFeatures(song.track.id, props.token);
    props.playAudio(song);
  };

  const { classes } = props;
  if (props.songs.songs) {
    return (
      <React.Fragment>
        <div
          className={classes.content}
          ref={div => {
            tableScroll = div;
          }}
        >
          <Table className={classes.table}>
            <TableHead>
              <TableRow key="headertable">
                <TableCell className={classes.tableC}>TITLE</TableCell>
                <TableCell className={classes.tableC} align="left">
                  ARTIST
                </TableCell>
                <TableCell className={classes.tableC} align="left">
                  DURATION
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.songs.songs.map((row, index) => (
                <TableRow
                  selected={selectedIndexSong === index ? true : false}
                  className={classes.tableRow}
                  hover={true}
                  key={index + "" + row.track.id}
                  onClick={() => SelectSongToPlay(row, index)}
                >
                  <TableCell
                    className={classes.tableC}
                    component="th"
                    scope="row"
                  >
                    {row.track.name}
                  </TableCell>
                  <TableCell className={classes.tableC} align="left">
                    {row.track.artists[0].name}
                  </TableCell>
                  <TableCell className={classes.tableC} align="left">
                    {msToMinutesAndSeconds(row.track.duration_ms)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </React.Fragment>
    );
  } else {
    return null;
  }
};

const mapStateToProps = state => {
  return {
    songs: state.songsReducer.songs ? state.songsReducer : "",
    token: state.tokenReducer.token ? state.tokenReducer.token : "",
    playlists: state.playlistsReducer,
    songIndex: state.songsReducer.songIndex
  };
};

const mapDispatchToProps = {
  getSongFeatures,
  getSongIndex,
  playSong
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TrackList));
