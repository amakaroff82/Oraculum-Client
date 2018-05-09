import { connect } from 'react-redux';
import { logoutUser } from './Actions/auth';
import SignOutComponent from './SignOutComponent';

// Connects to the store and injects select state and action creators into component props
export default connect(({ auth }) => ({ auth }), {
  logoutUser,
})(SignOutComponent);
