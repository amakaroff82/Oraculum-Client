import React from 'react';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import OutboundLink from '../OutboundLink';
import { compose, withState, withHandlers } from 'recompose';
import { withRouter } from 'react-router';
import GotoIcon from '../Icons/GotoIcon';
import { NAVBAR_HEIGHT } from './NavBar';

const styles = theme => ({
  menuItemWrapper: {
    position: 'relative',
    height: NAVBAR_HEIGHT,
  },
  menuButton: {
    height: NAVBAR_HEIGHT,
  },
  menu: {
    top: `${NAVBAR_HEIGHT - 2 * theme.spacing.unit}px`,
  },
  menuItem: {
    display: 'flex',
    justifyContent: 'space-between',
    minWidth: '160px',
  },
  externalLinkIcon: {
    height: theme.typography.fontSize,
    marginLeft: theme.spacing.unit * 4,
  },
  alignLeft: {
    marginLeft: 0,
  },
  alignRight: {
    marginLeft: 'auto',
  },
  open: {
    background: theme.menu.active.background,
  },
});

export const NavBarMenu = ({
  classes,
  openMenu,
  closeMenu,
  state: { el, opened },
  menu,
  intl,
}) => {
  const alignment = menu.rightAlign ? classes.alignRight : classes.alignLeft;
  const activeMenu = opened ? classes.open : classes.closed;

  if (menu.menuItems && menu.menuItems.length) {
    return (
      <div className={`${classes.menuItemWrapper} ${alignment}`}>
        <Button
          color="contrast"
          onClick={openMenu}
          className={`${classes.menuButton} ${activeMenu}`}
        >
            {menu.intlMessageId}
        </Button>
        <Menu
          open={opened}
          anchorEl={el}
          onRequestClose={closeMenu}
          className={classes.menu}
        >
          {menu.menuItems.map((page, i) => {
            if (page.isExternal) {
              return (
                <MenuItem
                  className={classes.menuItem}
                  to={page.path}
                  key={`menu_item_${i}`}
                  component={OutboundLink}
                  onClick={closeMenu}
                >
                  "page.intlMessageId"
                  <GotoIcon className={classes.externalLinkIcon} />
                </MenuItem>
              );
            }
            return (
              <MenuItem
                className={classes.menuItem}
                to={page.path}
                key={`menu_item_${i}`}
                component={Link}
                onClick={closeMenu}
              >
                  {page.intlMessageId}
              </MenuItem>
            );
          })}
        </Menu>
      </div>
    );
  } else {
    // no dropdown menu
    return (
      <div className={`${classes.menuItemWrapper} ${alignment}`}>
        <Button
          color="contrast"
          component={Link}
          to={menu.url}
          className={`${classes.menuButton}`}
        >
            {menu.intlMessageId}
        </Button>
      </div>
    );
  }
};

const enhance = compose(
  withStyles(styles, { name: 'NavBarMenu' }),
  withState('state', 'setState', { el: undefined, opened: false }),
  withHandlers({
    openMenu: ({ setState }) => e => {
      setState({ el: e.currentTarget, opened: true });
    },
    closeMenu: ({ setState }) => () => {
      setState({ el: undefined, opened: false });
    },
  })
);

export default enhance(withRouter(NavBarMenu));
