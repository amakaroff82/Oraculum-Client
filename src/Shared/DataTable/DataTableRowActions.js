import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import DataTableRowAction from './DataTableRowAction';

const styles = {
  root: {
    display: 'block',
  },
};

export const DataTableRowActions = ({ actions, classes }) => {
  return (
    <div className={classes.root}>
      {actions &&
        actions.map((action, index) => {
          return <DataTableRowAction key={index} {...action} />;
        })}
    </div>
  );
};

DataTableRowActions.propTypes = {
  actions: PropTypes.array.isRequired,
};

export default withStyles(styles, { name: 'DataTableRowActions' })(
  DataTableRowActions
);
