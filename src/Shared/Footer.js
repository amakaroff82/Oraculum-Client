import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  /*widePanel: {
    display: 'none'
  },*/
  dashboardFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '15px 0',
    borderTop: `1px solid ${theme.palette.text.divider}`,
  },
  dashboardFooterLink: {
    display: 'inline-block',
    verticalAlign: 'top',
    marginRight: '40px',
    textDecoration: 'none',
    color: theme.palette.primary[400],
  },
  dashboardFooterCopy: {
    color: theme.palette.primary[400],
  },
});

export const Footer = ({ classes }) => {
  return (
    <div>
      <footer className={`footer ${classes.dashboardFooter}`}>
        <div className={classes.widePanel}>
          <a href="https://www.corevalue.com.ua/" target={'_blank'} className={classes.dashboardFooterLink}>
            <Typography type="caption" color="primary">
              Corevalue Copyrights
            </Typography>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default withStyles(styles, { name: 'Footer' })(Footer);
