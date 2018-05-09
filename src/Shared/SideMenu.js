import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { MuiThemeProvider, withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import { darkTheme } from './Themes';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import { ListItem } from 'material-ui/List';
import Button from 'material-ui/Button';
import { NAVBAR_HEIGHT } from './NavBar/NavBar';

import List from 'material-ui/List';

export const SIDE_MENU_WIDTH = 240;

const styles = theme => ({
  drawer: {
    display: 'flex',
    position: 'fixed',
    width: SIDE_MENU_WIDTH,
    top: NAVBAR_HEIGHT,
    height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
    marginLeft: '-32px',
    zIndex: 89,
  },
  paddedList: {
    flex: '1 1 auto',
    position: 'relative',
    overflowY: 'auto',
    padding: theme.spacing.unit * 2,
    paddingTop: 0,
    paddingBottom: theme.spacing.unit * 10,
  },
  header: {
    flex: '0 0 auto',
    left: 0,
    right: 0,
    top: 0,
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  headerTitle: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit,
  },
  headerContent: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit,
  },
  buttonBar: {
    justifyContent: 'center',
    '& button': {
      float: 'right',
    },
  },
});

export const SideMenu = ({
  classes,
  titleId,
  listItems,
  buttonAction,
  buttonTextId,
  intl,
  headerItems,
}) => {
  return (
    <MuiThemeProvider theme={darkTheme}>
      <Drawer
        type="permanent"
        classes={{
          paper: classes.drawer,
        }}
      >
        <Divider />
        <div className={classes.header}>
          {titleId && (
            <div className={classes.headerTitle}>
              <Typography type="title" gutterBottom>
                {titleId}
              </Typography>
              <Divider />
            </div>
          )}
          <div className={classes.headerContent}>
            {headerItems && headerItems.map(item => item)}
          </div>
        </div>
        <List className={classes.paddedList}>
          {listItems}
          {listItems &&
          buttonAction &&
          buttonTextId && (
            <ListItem button disableGutters className={classes.buttonBar}>
              <Button raised color="primary" onClick={buttonAction}>
                "buttonTextId"
              </Button>
            </ListItem>
          )}
        </List>
      </Drawer>
    </MuiThemeProvider>
  );
};

SideMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  titleId: PropTypes.string.isRequired,
  listItems: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  buttonAction: PropTypes.func,
  buttonTextId: PropTypes.string,
  intl: PropTypes.object.isRequired,
};

export default compose(withStyles(styles, { name: 'SideMenu' }))(
  SideMenu
);
