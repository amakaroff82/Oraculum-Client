import {
  cmdAddUpdatePage,
  cmdAddComment,
  cmdGetUserData,
  cmdGetPagesByUrls,
  cmdGetPageByUrl,
  cmdGetTags,
  cmdLoginUserWithGoogle,
  cmdRegisterUser,
  cmdLoginUser,
  cmdLogoutUser,
  cmdEditUser
} from '../Shared/types';
import {createOrUpdatePage, getPagesByUrls, getPageByUrl, createComment, getTags} from './graphQLClient';
import {loginWithGoogle, logout, getUserData, register, login, editUser} from './user'


export function contentHandler(msg, sender, sendResponse) {
  // catch msg only from oraculum client
  if (msg.oraculumCommand && typeof(msg.oraculumCommand) === 'number') {
    switch (msg.oraculumCommand) {
      case cmdAddUpdatePage: {
        getUserData(function(user) {
          msg.oraculumData.authorId = user._id;
          createOrUpdatePage(msg.oraculumData).then((result) =>
            sendResponse(result)
          );
        });
        break;
      }

      case cmdAddComment: {
        getUserData(function(user) {
          msg.oraculumData.authorId = user._id;
          createComment(msg.oraculumData).then((result) =>
            sendResponse(result)
          );
        });
        break;
      }

      case cmdGetUserData: {
        getUserData(sendResponse);
        break;
      }

      case cmdLoginUserWithGoogle: {
        loginWithGoogle(sendResponse);
        break;
      }

      case cmdRegisterUser: {
        register(msg.oraculumData, sendResponse);
        break;
      }

      case cmdLoginUser: {
        login(msg.oraculumData, sendResponse);
        break;
      }

      case cmdEditUser: {
        editUser(msg.oraculumData, sendResponse);
        break;
      }

      case cmdLogoutUser: {

        logout(() => {
          console.log(">>> sendResponse")

          sendResponse();
        });

        break;
      }

      case cmdGetPagesByUrls: {
        getPagesByUrls(msg.oraculumData).then(sendResponse);
        break;
      }
      case cmdGetPageByUrl: {
        getPageByUrl(msg.oraculumData).then(sendResponse);
        break;
      }
      case cmdGetTags: {
        getTags().then(sendResponse);
        break;
      }

      default: {
        console.log("Unhandled command: " + msg.oraculumCommand)
        break;
      }
    }
  }

  return true;
}

