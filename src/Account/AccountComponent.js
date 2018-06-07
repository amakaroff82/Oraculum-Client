import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {Button} from 'material-ui';
import {withStyles} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import {TextField} from 'material-ui';
import Paper from 'material-ui/Paper';
import Layout from '../Shared/Layout';
import {Grid, Toolbar, Avatar} from 'material-ui';

import Loader from '../Shared/Loader';
import {editUser} from "../Root/Actions/auth";

const styles = theme => ({
  header: {
    height: theme.spacing.unit * 12,
  },
  body: {
    padding: 20,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    'flex-direction': 'column',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  avatar: {
    width: 150,
    height: 150,
    margin: 10,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class AccountComponent extends Component {

  constructor(props) {
    super(props);
    const { auth } = props;
    this.state = {
      _id: auth.user._id,
      email: auth.user.email,
      name: auth.user.name,
      picture: auth.user.picture || '/assets/user-icon.png',
      errors: null,
    };
  }

  submit = e => {
    e.preventDefault();
    this.props.editUser({
      _id: this.state._id,
      email: this.state.email,
      name: this.state.name,
    });
  };

  render() {
    const {auth, classes, error} = this.props;

    if (auth.errors) {
      this.setState({errors: auth.errors});
      auth.errors = null;
    }

    if (!auth.user) {
      return <Redirect to="/"/>;
    }

    return (

      <Layout>
        <Paper>
          <Grid container alignItems="center" wrap="nowrap" className={classes.header}>
            <Grid item xs={12}>
              <Toolbar>
                <Typography type="title">{'Account'}</Typography>
              </Toolbar>
            </Grid>
          </Grid>
          <Grid container alignItems="center" wrap="nowrap" className={classes.body}>
            <Grid item>
              <Avatar
                src={this.state.picture}
                className={classes.avatar}
              />
            </Grid>
            <Grid item>
              <form className={classes.container} autoComplete="off" onSubmit={this.submit}>
                <TextField
                  label="Name"
                  type="text"
                  fullWidth
                  id="name"
                  required
                  className={classes.textField}
                  margin="normal"
                  onChange={event =>
                    this.setState({name: event.target.value})}
                  value={this.state.name}
                />
                <Button
                  className={classes.button}
                  type="submit"
                  disabled={auth.isSubmitting}
                  color="primary"
                  raised
                >
                  {'Save'}
                </Button>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Layout>
    );
  }
}

export default withStyles(styles, {name: 'AccountComponent'})(
  AccountComponent
);