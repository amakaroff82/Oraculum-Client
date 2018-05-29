import {createOrUpdateUsers, registerUser} from './graphQLClient';

const INVALID_CREDENTIALS = "Invalid Credentials";
const chrome = window.chrome;

let userData = null;

export function getUserData() {
  return Object.assign({}, userData);
};

export function checkUserToken(callback) {
  chrome.storage.sync.get("token", function (data) {
    if (data.token) {
      console.log("get token from cache", data.token);
      handleToken(data.token, callback);
    } else {
      // nothing to do
    }
  });
}

export function loginWithGoogle(callback) {
  chrome.identity.getAuthToken({
    interactive: true
  }, function (token) {
    if (chrome.runtime.lastError) {
      console.log(chrome.runtime.lastError.message);
      return;
    }

    chrome.storage.sync.set({"token": token}, function () {

    });

    handleToken(token, callback);
  });
}

export function register(data, callback) {
  registerUser(data).then(function({auth, token, user}) {
    if (auth) {
      console.log('registered user:', user);
      userData = user;
    } else {
      console.log('can\'t register user');
    }

    callback();
  });
}

export function logout(callback) {
  console.log(">>> Call logout")
  chrome.storage.sync.get("token", function (data) {
    console.log(">>> Get token", data.token)

    if (data.token) {
      chrome.storage.sync.set({"token": null});
      chrome.identity.removeCachedAuthToken({
        'token': data.token
      }, function () {
        console.log(">>> removeCachedAuthToken")

        window.fetch(`https://accounts.google.com/o/oauth2/revoke?token=${data.token}`).then(function (response) {
          console.log(">>> google revoked token", response)
          //console.log(response)
          userData = null;

          if (callback) {
            console.log(">>> start callback")

            callback();
          }
        }).catch(function (err) {
          console.log(">>> ERROR: ", err)
          userData = null;

          if (callback) {
            console.log(">>> start callback")
            callback();
          }
        })
      });
    }
  });
}

export function handleToken(token, callback) {
  loadUserData(token).then(
    function ({
                id,
                name,
                given_name,
                family_name,
                email,
                verified_email,
                picture,
                hd
              }) {

      const user = {
        googleId: id,
        name,
        given_name,
        family_name,
        email,
        verified_email,
        picture,
        hd
      };

      createOrUpdateUsers(user).then(function ({_id}) {
        console.log("load user:", user);
        user._id = _id;
        userData = user;
        callback();
        //startApp();
      });
    },
    function (err) {
      console.log("error handle token");
      if (err.error && err.error.message === INVALID_CREDENTIALS) {
        // remove token and relogin
        console.log("remove invalid token");
        chrome.identity.removeCachedAuthToken(
          {'token': token},
          () => {
            console.log("try to relogin");
            return loginWithGoogle(callback);
          }
        );
      } else {
        console.log("Error: ", err);
      }
      ;
    });
}

export function loadUserData(token) {
  return new Promise(function (resolve, reject) {
    var x = new XMLHttpRequest();
    x.open('GET', 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + token);
    x.onload = function () {
      if (this.status === 401) {
        // This status may indicate that the cached
        // access token was invalid. Retry once with
        // a fresh token.
        reject({
          error: {
            message: INVALID_CREDENTIALS,
            code: 401
          }
        });
        return;
      }

      resolve(JSON.parse(x.response));
    };
    x.onerror = function (err) {
      reject(err);
    };
    x.send();
  });
}

