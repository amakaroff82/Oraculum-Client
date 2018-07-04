import React from 'react';
import lifecycle from 'recompose/lifecycle';

import Layout from '../Shared/Layout';
import Loader from '../Shared/Loader';
import { Grid, Toolbar, Paper, Typography } from 'material-ui';
import { withStyles } from 'material-ui/styles/index';
import { compose } from 'recompose';
import { Button } from 'material-ui';

const styles = theme => ({
  header: {
    height: theme.spacing.unit * 12,
  },
  title: {
    flex: 1,
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
                <Typography type="title" className={classes.title}>{page.data.title}</Typography>
                <Button
                  href={page.data.url}
                  target="_blank"
                  color="primary"
                >View original</Button>
              </Toolbar>
            </Grid>
          </Grid>
          <Grid container alignItems="center" wrap="nowrap" className={classes.body}>
            <div
              ref="content"
              dangerouslySetInnerHTML={{__html: (page.data.parsedContent || page.data.content)}}
            ></div>
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
    componentDidUpdate() {
      if (this.refs.content) {
        const links = this.refs.content.getElementsByTagName('a');

        for (let i = 0; i < links.length; i++) {
          links[i].setAttribute('target', '_blank');
        }
      }
    }
  })
);

export default enhance(PageComponent);
