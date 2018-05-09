import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import ReactTable, { ReactTableDefaults } from 'react-table';
import { withStyles } from 'material-ui/styles';
import { Button } from 'material-ui';
import Loader from '../../Shared/Loader';

/**
This module provides an Apollo-styled version of the ReactTable
component. Accepts all standard props of of ReactTable.
See: https://react-table.js.org/#props

Any passed props will override defaults set in this component.
 */

const styles = theme => ({
  dataTable: {
    width: '100%',
    border: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'block',
  },
  tBody: {
    fontSize: theme.typography.body1.fontSize,
    color: theme.palette.text.primary,
  },
  tHeadTr: {
    height: 32,
    '& .rt-th:first-child': {
      paddingLeft: `${theme.spacing.unit * 3}px`,
    },
  },
  header: {
    color: theme.palette.text.primary,
    fontSize: theme.typography.body1.fontSize,
    fontWeight: 600,
    backgroundColor: theme.palette.background.contentFrame,
    whiteSpace: 'pre',
    display: 'flex',
    alignItems: 'center',
  },
  tr: {
    height: 48,
    background: theme.palette.background.paper,
    alignItems: 'center',
    '&:focus': {
      outline: 'none',
    },
    '&:hover, &:focus': {
      background: theme.palette.primary[50],
    },
    '& .rt-td:first-child': {
      paddingLeft: `${theme.spacing.unit * 3}px`,
    },
  },
  cell: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textAlign: 'left',
  },
  pagination: {
    backgroundColor: theme.palette.background.contentFrame,
    fontSize: theme.typography.body1.fontSize,
  },
});

// Provide consistent default filter method
const defaultFilterMethod = (filter, row, column) => {
  const id = filter.pivotId || filter.id;
  return row[id] !== undefined || row[id] !== ''
    ? String(row[id])
        .toLowerCase()
        .includes(filter.value.toLowerCase())
    : true;
};

export const DataTable = ({ classes, intl, ...passThroughProps }) => {
  const PrevComponent = props => {
    return (
      <Button {...props}>
          {"<<<"}
      </Button>
    );
  };

  const NextComponent = props => {
    return (
      <Button {...props}>
          {">>>"}
      </Button>
    );
  };

  // Override ReactTable defaults
  Object.assign(ReactTableDefaults.column, {
    headerClassName: classes.header,
    className: classes.cell,
  });

  // Add props for styling.
  // Props explicity passed to DataTable will override these.
  const reactTableProps = {
    className: classes.dataTable,
    resizable: true,
    showPagination: true,
    defaultPageSize: 10,
    defaultFilterMethod: defaultFilterMethod,
    getTbodyProps: () => ({ className: classes.tBody }),
    getTheadTrProps: () => ({ className: classes.tHeadTr }),
    getTrProps: () => ({ className: classes.tr }),
    getPaginationProps: () => ({ className: classes.pagination }),
    LoadingComponent: ({ loading }) => {
      return loading && <Loader isInner />;
    },
    PreviousComponent: PrevComponent,
    NextComponent: NextComponent,

    pageText: "page",
    ofText: "of",
    rowsText: "rowsText",
    noDataText: "no Results",
    ...passThroughProps,
  };

  return <ReactTable {...reactTableProps} />;
};

DataTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

// Added due to issue describe here:
// https://github.com/adriantoine/enzyme-to-json/issues/19#issuecomment-285781119
DataTable.displayName = 'DataTable';

const enhance = compose(withStyles(styles, { name: 'DataTable' }));

export default enhance(DataTable);
