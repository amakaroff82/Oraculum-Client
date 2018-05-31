import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Grid from 'material-ui/Grid';
import {compose, lifecycle} from "recompose";
import {connect} from "react-redux";
import { logoutUser } from './Actions/auth';

class LogoutForm extends Component {
  render() {
    const { auth } = this.props;

    if (!auth.user) {
      return <Redirect to={'/login'} />;
    }
    return (
      <Grid />
    );
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => {
      dispatch(logoutUser());
    }
  };
};

export default compose(
  connect(({ auth }) => ({ auth }), mapDispatchToProps),
  lifecycle({
    componentWillMount() {
      const {logoutUser} = this.props;

      console.log(">>> logout route")

      logoutUser();
    }
  })
)(LogoutForm);
