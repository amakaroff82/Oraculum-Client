import React from 'react';
import lifecycle from 'recompose/lifecycle';

import Layout from '../Shared/Layout';
import Loader from '../Shared/Loader';
import { Grid, Toolbar, Paper, Typography } from 'material-ui';
import { withStyles } from 'material-ui/styles/index';
import { compose } from 'recompose';

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
});

export const PageComponent = ({ page, classes }) => {


  return (
    <Layout>
      {page.isLoading ?
        <Loader /> :
        <Paper>
          <Grid container alignItems="center" wrap="nowrap" className={classes.header}>
            <Grid item xs={12}>
              <Toolbar>
                <Typography type="title">{page.data.title}</Typography>
              </Toolbar>
            </Grid>
          </Grid>
          <Grid container alignItems="center" wrap="nowrap" className={classes.body}>
            <div dangerouslySetInnerHTML={{__html: (page.data.parsedContent || page.data.content)}}></div>
          </Grid>
        </Paper>
      }
    </Layout>
  );
};

const enhance = compose(
  withStyles(styles, { name: 'PageComponent' }),
  lifecycle({
    componentWillMount() {
      const { loadPage, match } = this.props;
      loadPage(match.params.id);
    },
  })
);

export default enhance(PageComponent);
