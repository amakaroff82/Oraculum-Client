import { connect } from 'react-redux';
import { registerUser } from './Actions/auth';
import SignUpComponent from './SignUpComponent';

// Connects to the store and injects select state and action creators into component props
export default connect(({ auth }) => ({ auth }), {
  registerUser
})(SignUpComponent);