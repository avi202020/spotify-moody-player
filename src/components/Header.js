import React from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";

const Header = props => {
  return (
    <Typography variant="h4" color="primary" noWrap>
      {props.songDetails
        ? props.songDetails.artists[0].name + " - " + props.songDetails.name
        : null}
    </Typography>
  );
};

const mapStateToProps = state => {
  return {
    songDetails: state.songsReducer.songDetails
  };
};

export default connect(mapStateToProps)(Header);
