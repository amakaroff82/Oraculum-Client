import React from 'react';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';

const styles = theme => ({
  root: {
    position: 'fixed',
    top: '0',
    left: '0',
    bottom: '0',
    right: '0',
    backgroundColor: theme.palette.common.darkWhite,
    zIndex: '99',
    '&.inner': {
      position: 'absolute',
    },
  },
  loader: {
    position: 'absolute',
    top: '0',
    left: '0',
    bottom: '0',
    right: '0',
    margin: 'auto',
    width: '50px',
    height: '50px',
  },
});

const Loader = ({ classes, isInner }) => (
  <div className={`${classes.root} ${isInner ? 'inner' : ''}`}>
    <div className={classes.loader}>
      <CircularProgress size={50} />
    </div>
  </div>
);
export default withStyles(styles, { name: 'Loader' })(Loader);
