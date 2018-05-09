import connect from './connect';
import UserComponent from './UserComponent';

const ConnectedUser = connect((_, { user: { name } }) => ({ name }))(
  UserComponent
);

export default ConnectedUser;
