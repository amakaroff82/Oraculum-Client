import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose, mapProps, withContext } from 'recompose';

// In order to facilitate de-coupled per-tab redux state for the various
// tabs in our application, we've created a custom implementation of
// redux sub-stores. There is one top-level Root store, and many Area
// stores (one per tab).

/**
+---------------------------------------------------------+
|Root Store                                               |
|                                                         |
+---------------------------------------------------------+
+-------------------------+    +--------------------------+
|Journeys Store           |    |Dashboard Store           |
|                         |    |                          |
|                         |    |                          |
|                         |    |                          |
|                         |    |                          |
+-------------------------+    +--------------------------+
*/

/**
 * Define common Actions here.
 * Actions defined here will be passed to ALL components in `ownProps`.
 *
 * To use in your components, use our custom `connect` and destructure `ownProps`
 * as needed, as in this example.
 *
 * import connect from '../Shared/connect';
 * const MyComponent = ({ logout }) => <a onClick={logout}>Logout Link</a>;
 * export default connect((_, { logout }) => ({ logout }))(MyComponent);
 */
const mapDispatchToProps = {
  // login: authContext => ({ payload: authContext, type: 'LOGIN' }),
  logout: () => ({ payload: {}, type: 'LOGOUT' }),
};

/**
 * Creates a higher-order-component that will use its own Area-store
 * and will be passed shared Root State and Actions in its `ownProps`.
 *
 * For example, given a Root-store that contains `user` and and an Area-store
 * that contains `journeys`, you can access both like so...
 *
 * import connect from '../Shared/connect';
 * const MyComponent = ({ user, journeys }) => <div>{user.name}...</div>;
 * export default connect(
 *   ({ journeys }, { user }) => ({ user, journeys })
 * )(MyComponent);
 */
const withHostContext = compose(
  connect(state => state, mapDispatchToProps),
  withContext({ hostContext: PropTypes.object.isRequired }, props => ({
    hostContext: props,
  })),
  // prevent passing props into subapp Root components
  mapProps(() => ({}))
);

export default withHostContext;
