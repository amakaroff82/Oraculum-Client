import { connect } from 'react-redux';
import { editUser } from '../Root/Actions/auth';
import AccountComponent from './AccountComponent';

export default connect(({ auth }) => ({ auth }), {
  editUser,
})(AccountComponent);
