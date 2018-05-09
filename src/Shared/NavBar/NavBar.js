import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { MuiThemeProvider, withStyles } from 'material-ui/styles';
import { darkTheme } from '../Themes';
import { menus, adminMenus } from './NavBarMenus';
import NavBarMenu from './NavBarMenu';

export const NAVBAR_HEIGHT = 64;

export const styles = {
  appBar: {
    height: NAVBAR_HEIGHT,
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: '100%',
  },
};

export const NavBar = ({ classes, window }) => (
  <MuiThemeProvider theme={darkTheme}>
      <div className={`nav-bar ${classes.appBar}`}>
        <AppBar className={classes.appBar}>
          <Toolbar className={classes.appBar}>
            {menus &&
            menus.map((menuItem, index) => {
                return <NavBarMenu key={index} menu={menuItem} />;
              })}
          </Toolbar>
        </AppBar>
      </div>
  </MuiThemeProvider>
);


export default withStyles(styles, { name: 'NavBar' })(NavBar);
