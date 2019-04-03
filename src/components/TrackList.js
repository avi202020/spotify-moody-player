import React from "react";
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

class TrackList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndexSong: this.props.songIndex
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.songs.playlistId) {
      if (this.props.songs.playlistId !== prevProps.songs.playlistId) {
        if (this.refs.tcontainer) {
          this.refs.tcontainer.scrollTop = 0;
        }
      }
    }
    if (this.props.songIndex !== prevProps.songIndex) {
      this.setState({ selectedIndexSong: this.props.songIndex });
    }
  }

  msToMinutesAndSeconds(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  SelectSongToPlay(song, index) {
    this.props.getSongIndex(index);
    this.props.playSong(song.track);
    this.props.getSongFeatures(song.track.id, this.props.token);
    this.props.playAudio(song);
  }

  render() {
    const { classes } = this.props;
    if (this.props.songs.songs) {
      return (
        <React.Fragment>
          <div className={classes.content} ref="tcontainer">
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
                {this.props.songs.songs.map((row, index) => (
                  <TableRow
                    selected={
                      this.state.selectedIndexSong === index ? true : false
                    }
                    className={classes.tableRow}
                    hover={true}
                    key={index + "" + row.track.id}
                    onClick={() => this.SelectSongToPlay(row, index)}
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
                      {this.msToMinutesAndSeconds(row.track.duration_ms)}
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
  }
}

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
