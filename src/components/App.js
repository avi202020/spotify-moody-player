import React, { useEffect } from "react";
import Layout from "./Layout";
import CssBaseline from "@material-ui/core/CssBaseline";
import { connect } from "react-redux";
import { setToken, fetchUser } from "../actions";
const App = props => {
  useEffect(() => {
    let hashParams = {};
    let e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    if (hashParams.access_token) {
      props.setToken(hashParams.access_token);
    }
  }, []);

  useEffect(() => {
    if (props.token.token) {
      props.fetchUser(props.token.token);
    }
  }, [props.token]);

  return (
    <div>
      <CssBaseline />
      <Layout />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    token: state.tokenReducer
  };
};

export default connect(
  mapStateToProps,
  { setToken, fetchUser }
)(App);
