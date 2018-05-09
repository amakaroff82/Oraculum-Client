import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import { Redirect } from 'react-router-dom';
import { Button } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import { TextField } from 'material-ui';

import Loader from '../Shared/Loader';

const styles = {
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
  button: {
    'text-align': 'center',
    'padding-top': 20,
  },
};

class SubmitValidationForm extends Component {
  state = { username: '', password: '' };

  submit = e => {
    e.preventDefault();
    this.props.loginUser();
  };

  render() {
    const { auth, classes, error } = this.props;
    const { from } = this.props.location.state || {
      from: { pathname: '/' },
    };
    if (auth.user && auth.user.id) {
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
                {error && <strong>{error}</strong>}
                <div className={classes.button}>
                  <Button
                    type="submit"
                    disabled={auth.isSubmitting}
                    color="primary"
                    raised
                  >
                    {'Log In'}
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
