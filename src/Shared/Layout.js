import React from 'react';
import NavBar from './NavBar/NavBar';
import Footer from './Footer';
import { withStyles } from 'material-ui/styles';

const styles = {
  layoutContainer: {
    padding: '16px 24px',
  },
};

const Layout = ({ children, classes }) => (
  <div className={classes.layoutContainer}>
    <NavBar window={window} />
    <div className="content-container">{children}</div>
    <Footer />
  </div>
);

export default withStyles(styles, { name: 'Layout' })(Layout);
