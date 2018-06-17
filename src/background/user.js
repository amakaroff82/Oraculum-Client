import {registerGoogleUser, registerUser, loginUser, updateUser, getUserByGoogleId, getUserByToken} from './graphQLClient';

const INVALID_CREDENTIALS = "Invalid Credentials";
const chrome = window.chrome;

let userData = null;

export function getUserData(callback) {

  if (userData) {
    callback(Object.assign({}, userData));
  } else {
    checkUserTokens(function () {
      callback(Object.assign({}, userData));
    })
  }
};

export function checkUserTokens(callback) {
  chrome.storage.sync.get("token", function (data) {
    if (data.token) {
      console.log("get googleToken from cache", data.token);
      handleGoogleToken(data.token, callback);
    } else {
      chrome.storage.sync.get("applicationToken", function (data) {
        if (data.applicationToken) {
          console.log("get applicationToken from cache", data.applicationToken);
          handleApplicationToken(data.applicationToken, callback);
        } else {
          callback();
        }
      });
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

    handleGoogleToken(token, callback);
  });
}

export function register(data, callback) {
  registerUser(data).then(function(res) {
    if (res.data) {
      const {token, user} = res.data;
      userData = user;
      chrome.storage.sync.set({"applicationToken": token});
    }

    callback(res);
  });
}

export function login(data, callback) {
  loginUser(data).then(function(res) {
    if (res.data) {
      const {token, user} = res.data;
      userData = user;
      chrome.storage.sync.set({"applicationToken": token});
    }

    callback(res);
  });
}

export function editUser(data, callback) {
  updateUser(data).then(function(res) {
    if (res.data) {
      userData = res.data;
    }

    callback(res);
  });
}

export function logout(callback) {
  console.log(">>> Call logout");
  if (userData) {
    if (userData.googleId) {
      chrome.storage.sync.get("token", function (data) {
        console.log(">>> Get googleToken", data.token);

        if (data.token) {
          chrome.storage.sync.set({"token": null});
          chrome.identity.removeCachedAuthToken({
            'token': data.token
          }, function () {
            console.log(">>> removeCachedAuthToken");

            window.fetch(`https://accounts.google.com/o/oauth2/revoke?token=${data.token}`).then(function (response) {
              console.log(">>> google revoked token", response);
              userData = null;
              broadcastLogoutMessage();

              if (callback) {
                console.log(">>> start callback");
                callback();
              }
            }).catch(function (err) {
              console.log(">>> ERROR: ", err);
              userData = null;
              if (callback) {
                console.log(">>> start callback");
                callback();
              }
            })
          });
        } else {
          console.log("Token failed: ", data);
          broadcastLogoutMessage();
          chrome.storage.sync.set({"token": null});
          if (callback) {
            callback();
          }
        }
      });
    } else {
      userData = null;
      chrome.storage.sync.set({"applicationToken": null});
      broadcastLogoutMessage();
      if (callback) {
        callback();
      }
    }
  }
}

export function handleGoogleToken(token, callback) {
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

      console.log('loaded user ', id);
      getUserByGoogleId(id).then(function (response) {
        const user = response.data;
        if (user) {
          userData = user;

          callback();
        } else {
          registerGoogleUser({
            googleId: id,
            name,
            given_name,
            family_name,
            email,
            verified_email,
            picture,
            hd
          }).then(function (res) {
            userData = res.data;
            callback();
          })
        }
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
        callback();
      }
      ;
    });
}

export function handleApplicationToken(token, callback) {
  getUserByToken(token).then(function(res) {
    if (res.errors) {
      console.log("Error: ", res.errors);
    } else {
      userData = res.data;
    }
    callback();
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

function broadcastLogoutMessage() {
  chrome.tabs.query({}, function(tabs) {
      tabs.forEach(function (tab) {
        chrome.tabs.sendMessage(
          tab.id,
          {
            type: 'extension_logout'
          },
          function (response) {
          }
        );
      });
    }
  );
}