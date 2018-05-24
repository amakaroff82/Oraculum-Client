import { connect } from 'react-redux';
import { loginUserWithGoogle, loginCachedUser } from './Actions/auth';
import SignInComponent from './SignInComponent';

// Connects to the store and injects select state and action creators into component props
export default connect(({ auth }) => ({ auth }), {
  loginUserWithGoogle: loginUserWithGoogle,
  loginCachedUser,
})(SignInComponent);
