import React from 'react';
import { Grid, Toolbar } from 'material-ui';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    height: theme.spacing.unit * 12,
  },
});

export const TableHeader = ({
  classes,
  headerLabel,
  leftButtons,
  rightButtons,
}) => {
  return (
    <Grid container alignItems="center" wrap="nowrap" className={classes.root}>
      <Grid item xs={6}>
        <Toolbar>
          <Typography type="title">{headerLabel}</Typography>
          <Toolbar>{leftButtons}</Toolbar>
        </Toolbar>
      </Grid>
      <Grid item xs={6}>
        <Grid container justify="flex-end">
          <Grid item>
            <Toolbar>{rightButtons}</Toolbar>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles, { name: 'TableHeader' })(TableHeader);
