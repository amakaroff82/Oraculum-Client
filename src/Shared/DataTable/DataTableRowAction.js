import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';

const styles = theme => ({
  root: {
    background: 'transparent',
    display: 'inline-block',
  },
  icon: {
    cursor: 'pointer',
    '&, & a': {
      color: theme.palette.text.disabled,
    },
    '.rt-tr:hover &, .rt-tr:hover & a': {
      color: theme.palette.primary[500],
    },
    '.rt-tr &:hover, .rt-tr &:hover a': {
      color: theme.palette.primary[900],
    },
  },
  iconDisabled: {
    '.rt-tr:hover &, .rt-tr:hover & a': {
      color: `${theme.palette.text.disabled}`,
    },
  },
});

export const DataTableRowAction = ({
  childComponent,
  text,
  onClick,
  classes,
  disabled,
}) => {
  if (onClick) {
    return (
      <span className={classes.root}>
        <IconButton
          onClick={onClick}
          classes={{ root: disabled ? classes.iconDisabled : classes.icon }}
          title={text}
          disabled={disabled}
        >
          {childComponent}
        </IconButton>
      </span>
    );
  } else {
    return (
      <span className={disabled ? classes.iconDisabled : classes.icon}>
        {childComponent}
      </span>
    );
  }
};

DataTableRowAction.propTypes = {
  childComponent: PropTypes.object,
  text: PropTypes.string,
  onClick: PropTypes.any,
  disabled: PropTypes.bool,
};

export default withStyles(styles, { name: 'DataTableRowAction' })(
  DataTableRowAction
);
