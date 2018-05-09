import { connect } from 'react-redux';
import { loginUser, loginCachedUser } from './Actions/auth';
import SignInComponent from './SignInComponent';

// Connects to the store and injects select state and action creators into component props
export default connect(({ auth }) => ({ auth }), {
  loginUser,
  loginCachedUser,
})(SignInComponent);
