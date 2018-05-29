import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import { Redirect } from 'react-router-dom';
import { Button } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import { TextField } from 'material-ui';

import Loader from '../Shared/Loader';
import {loginUser} from "./Actions/auth";

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    'text-align': 'center',
  },
  container: {
    height: 400,
  },
  messages: {
    'padding-top': 50,
    height: '100%',
  },
  buttonsContainer: {
    display: 'flex',
    'justify-content': 'space-between',
    'padding-top': 20,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class SubmitValidationForm extends Component {
  state = { email: '', password: '' };

  submit = e => {
    e.preventDefault();
    this.props.loginUser({
      email: this.state.email,
      password: this.state.password,
    });
  };

  loginUserWithGoogle = () => {
    this.props.loginUserWithGoogle();
  };

  render() {
    const { auth, classes, error } = this.props;
    const { from } = this.props.location.state || {
      from: { pathname: '/' },
    };
    if (auth.user && auth.user._id) {
      if (window.App) {
        window.App.user = auth.user;
      } else {
        window.App = { user: auth.user };
      }

      return <Redirect to={from} />;
    }

    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Grid
            container
            className={classes.container}
            alignItems="center"
            justify="center"
            direction="row"
          >
            <Grid item xs={3}>
              <form onSubmit={this.submit}>
                <Typography className={classes.title} type="headline" component="h3">
                  {'Oraculum'}
                </Typography>
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  id="email"
                  onChange={event =>
                    this.setState({ email: event.target.value })}
                  value={this.state.email}
                />
                <br />
                <br />
                <TextField
                  label="Password"
                  type="password"
                  id="password"
                  fullWidth
                  onChange={event =>
                    this.setState({ password: event.target.value })}
                  value={this.state.password}
                />
                {error && <strong>{error}</strong>}
                <div className={classes.buttonsContainer}>
                  <Button
                    className={classes.button}
                    type="submit"
                    disabled={auth.isSubmitting}
                    color="primary"
                    raised
                  >
                    {'Log In'}
                  </Button>
                  <Button
                    onClick={this.loginUserWithGoogle}
                    className={classes.button}
                    disabled={auth.isSubmitting}
                    color="primary"
                  >
                    {'Log In with Google'}
                  </Button>
                  <Button
                    href="#signup"
                    className={classes.button}
                    disabled={auth.isSubmitting}
                    color="primary"
                  >
                    {'Sign Up'}
                  </Button>
                </div>
                <div className={classes.messages}>
                  {auth.isSubmitting ? <Loader /> : ''}
                  {!auth.isSubmitting && auth.isError ? (
                    <Typography type="headline" component="h3">
                      {'Login Failed.'}
                    </Typography>
                  ) : (
                    ''
                  )}
                </div>
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles, { name: 'SubmitValidationForm' })(
  SubmitValidationForm
);
