import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import toolboxTheme from '../assets/react-toolbox/theme';
import '../assets/react-toolbox/theme.css';
import withHostContext from '../Shared/withHostContext';
import { getRoutes, COMPONENT_NAMES } from '../Shared/routes';
import Loader from '../Shared/Loader';
import PagesArea from '../Pages';
import PrivateRoute from '../Shared/PrivateRoute';
import SignInContainer from '../Root/SignInContainer';
import SignOutContainer from '../Root/SignOutContainer';
import ConfirmNavigationDialogContainer from '../Root/ConfirmNavigationDialogContainer';

const subComponents = {};
subComponents[COMPONENT_NAMES.PAGES_AREA] = withHostContext(PagesArea);

const styles = theme => ({
  '@global': {
    '*': {
      fontFamily: theme.typography.fontFamily,
    },
    html: {
      background: theme.palette.background.default,
    },
    a: {
      textDecoration: 'none',
      color: theme.palette.primary[500],
    },
  },
});

const Root = ({ store, userConfirmationHandler, classes, auth }) => {
  const routes = getRoutes();

  if (auth.isSubmitting) {
    return <Loader />;
  }

  // We have window.App OR it could not be loaded (api isn't running); do a normal render
  return (
      <ThemeProvider theme={toolboxTheme}>
        <Provider store={store}>
          <Router getUserConfirmation={userConfirmationHandler}>
            <div className={classes.root}>
              <ConfirmNavigationDialogContainer />
              <Switch>
                {routes.map((route, index) => (
                  <PrivateRoute
                    key={index}
                    exact={route.exact}
                    path={route.path}
                    component={subComponents[route.componentName]}
                  />
                ))}
                  <Route exact path="/login" component={SignInContainer} />
                  <Route exact={false} path="/logout" component={SignOutContainer} />
              </Switch>
            </div>
          </Router>
        </Provider>
      </ThemeProvider>
  );
};

export default withStyles(styles, { name: 'Root' })(Root);
