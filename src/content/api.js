//'use strict';

import {
  cmdAddUpdatePage,
  cmdGetUserData,
  cmdGetPagesByUrls,
  cmdGetPageByUrl,
  cmdLoginUserWithGoogle,
  cmdRegisterUser,
  cmdLoginUser,
  cmdLogoutUser,
  cmdAddComment
} from '../Shared/types';
import {Oraculum} from './base';
import {APP_CONSTANTS} from '../app-constants';

const chrome = window.chrome;
const localStorage = window.localStorage;

function sendMessage(data, callback) {
  if (APP_CONSTANTS.googleExtensionId) {
    chrome.runtime.sendMessage(APP_CONSTANTS.googleExtensionId, data, callback);
  } else {
    chrome.runtime.sendMessage(data, callback);
  }
}

export function addPage(page) {
  return new Promise(function (resolve, reject) {
    sendMessage({
      oraculumCommand: cmdAddUpdatePage,
      oraculumData: page
    }, function (response) {
      resolve(response);
    });
  });
}

export function addComment(comment) {
  return new Promise(function (resolve, reject) {
    sendMessage({
      oraculumCommand: cmdAddComment,
      oraculumData: comment
    }, function (response) {
      resolve(response);
    });
  });
}


export function loginUserWithGoogle() {
  return new Promise(function (resolve, reject) {
    sendMessage({
      oraculumCommand: cmdLoginUserWithGoogle
    }, function (userData) {
      localStorage.user = JSON.stringify(userData);
      Oraculum.user = userData;
      resolve(Oraculum.user);
    });
  });
}

export function login(data) {
  return new Promise(function (resolve, reject) {
    sendMessage({
      oraculumCommand: cmdLoginUser,
      oraculumData: data
    }, function (userData) {
      localStorage.user = JSON.stringify(userData);
      Oraculum.user = userData;
      resolve(Oraculum.user);
    });
  });
}

export function registerUser(data) {
  return new Promise(function (resolve, reject) {
    sendMessage({
      oraculumCommand: cmdRegisterUser,
      oraculumData: data
    }, function (userData) {
      localStorage.user = JSON.stringify(userData);
      Oraculum.user = userData;
      resolve(Oraculum.user);
    });
  });
}

export function logoutUser() {
  return new Promise(function (resolve, reject) {
    sendMessage({
        oraculumCommand: cmdLogoutUser
    }, function () {
        localStorage.removeItem('user');
        Oraculum.user = null;
        resolve(Oraculum.user);
    });
  });
}

export function getUserData() {
  return new Promise(function (resolve, reject) {
    sendMessage({
      oraculumCommand: cmdGetUserData
    }, function (userData) {
      Oraculum.user = userData;
      resolve(Oraculum.user);
    });
  })
}

export function getPagesByUrls(urls) {
  return new Promise(function (resolve, reject) {
    sendMessage({
      oraculumCommand: cmdGetPagesByUrls,
      oraculumData: urls
    }, function (pages) {
      console.log("Pages: ", pages);
      resolve(pages);
    });
  });
}

export function getPageByUrl(url) {
  return new Promise(function (resolve, reject) {
    sendMessage({
      oraculumCommand: cmdGetPageByUrl,
      oraculumData: url
    }, function (page) {
      console.log("Page: ", page);
      resolve(page);
    });
  });
}