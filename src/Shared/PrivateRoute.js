import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function isLoggedIn(auth) {
    //alert(JSON.stringify(auth))

  return auth.user && auth.user._id;
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { auth } = rest;

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn(auth) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(PrivateRoute);
