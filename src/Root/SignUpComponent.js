import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import { Redirect } from 'react-router-dom';
import { Button } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import { TextField } from 'material-ui';

import Loader from '../Shared/Loader';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    'text-align': 'center',
  },
  container: {
    //height: 400,
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
  state = {
    name: '',
    email: '',
    password: '',
    confirmedPassword: '',
    errors: null,
  };

  submit = e => {
    e.preventDefault();
    if (this.state.password === this.state.confirmedPassword) {
      this.props.registerUser({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      });
    } else {
      this.setState({
        errors: [{
          state: {
            confirmedPassword: ['Passwords doesn\'t match']
          },
        }],
      });
    }
  };

  render() {
    const { auth, classes, error } = this.props;
    const { from } = this.props.location.state || {
      from: { pathname: '/' },
    };
    if (auth.errors) {
      this.setState({ errors: auth.errors });
      auth.errors = null;
    }

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
                  label="Name"
                  type="text"
                  fullWidth
                  id="name"
                  required
                  onChange={event =>
                    this.setState({ name: event.target.value })}
                  value={this.state.name}
                />
                <br />
                <br />
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  id="email"
                  required
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
                  inputProps={{minLength: 6}}
                  required
                  onChange={event =>
                    this.setState({ password: event.target.value })}
                  value={this.state.password}
                />
                <br />
                <br />
                <TextField
                  label="Confirm Password"
                  type="password"
                  id="confirm-password"
                  fullWidth
                  inputProps={{minLength: 6}}
                  required
                  onChange={event =>
                    this.setState({ confirmedPassword: event.target.value })}
                  value={this.state.confirmedPassword}
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
                    {'Sign Up'}
                  </Button>
                  <Button
                    href="#login"
                    className={classes.button}
                    disabled={auth.isSubmitting}
                    color="primary"
                  >
                    {'Go to Login Page'}
                  </Button>
                </div>
                <div className={classes.messages}>
                  {auth.isSubmitting ? <Loader /> : ''}
                  {!auth.isSubmitting && this.state.errors ? (
                    <Typography type="headline" component="h3">
                      {'Sign Up Failed.'}
                      {this.state.errors.map((error, i) => (
                        <pre key={i}>
                          {Object.keys(error.state).map((key, i) => (
                            <span key={i}>{error.state[key]}</span>
                          ))}
                        </pre>
                      ))}
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
