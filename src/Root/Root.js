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
import PagesArea, { AllPagesArea } from '../Pages';
import PrivateRoute from '../Shared/PrivateRoute';
import SignInContainer from '../Root/SignInContainer';
import SignOutContainer from '../Root/SignOutContainer';
import ConfirmNavigationDialogContainer from '../Root/ConfirmNavigationDialogContainer';
import SignUpContainer from '../Root/SignUpContainer';
import AccountArea from '../Account';
import PageArea from '../Page';

const subComponents = {};
subComponents[COMPONENT_NAMES.PAGES_AREA] = withHostContext(PagesArea);
subComponents[COMPONENT_NAMES.ALL_PAGES_AREA] = withHostContext(AllPagesArea);
subComponents[COMPONENT_NAMES.PAGE_AREA] = withHostContext(PageArea);
subComponents[COMPONENT_NAMES.ACCOUNT_AREA] = withHostContext(AccountArea);

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
                  <Route exact path="/signup" component={SignUpContainer} />
                  <Route exact={false} path="/logout" component={SignOutContainer} />
              </Switch>
            </div>
          </Router>
        </Provider>
      </ThemeProvider>
  );
};

export default withStyles(styles, { name: 'Root' })(Root);
