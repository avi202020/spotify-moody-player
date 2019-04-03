import React from "react";
import Layout from "./Layout";
import CssBaseline from "@material-ui/core/CssBaseline";
import { connect } from "react-redux";
import { setToken, fetchUser } from "../actions";
class App extends React.Component {
  componentDidMount() {
    let hashParams = {};
    let e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    if (hashParams.access_token) {
      this.props.setToken(hashParams.access_token);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.token !== this.props.token) {
      this.props.fetchUser(this.props.token.token);
    }
  }

  render() {
    return (
      <div>
        <CssBaseline />
        <Layout />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.tokenReducer
  };
};

export default connect(
  mapStateToProps,
  { setToken, fetchUser }
)(App);
