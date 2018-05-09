import { compose, lifecycle, withStateHandlers } from 'recompose';
import { connect } from 'react-redux';
import Root from './Root';
//import api from '../Shared/Services/api.js';
import { defaultAppData } from '../Shared/constants';
import { updateNavDialog } from './Actions/confirmNavigation';
//import { getUserData,  } from '../content/api'
import { loginCachedUser } from './Actions/auth';

export const mapDispatchToProps = dispatch => {
  return {
    userConfirmationHandler: (message, callback) => {
      dispatch(
        updateNavDialog({
          open: true,
          message: message,
          callback: callback,
        })
      );
    },
    loginCachedUser: () => {
      dispatch(loginCachedUser());
    }
  };
};

const enhance = compose(
  connect(({ auth }) => ({ auth }), mapDispatchToProps),
  /*withStateHandlers(
    {
      isAppDataLoaded: window.App
        ? true
        : false, //process.env.NODE_ENV === 'production', // always assume the data is loaded in prod
    },
    {
      setAppDataLoaded: ({ isAppDataLoaded }) => loaded => ({
          isAppDataLoaded: loaded,
      }),
    },
  ),*/
  lifecycle({
    componentWillMount() {
      const { loginCachedUser } = this.props;

      //if(location.hash !== "#/logout"){
        window.App = defaultAppData;
        loginCachedUser();
      //}

    },
  })
);

export default enhance(Root);
