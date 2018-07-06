//'use strict';

import {
  cmdAddUpdatePage,
  cmdGetUserData,
  cmdGetPagesByUrls,
  cmdGetPageByUrl,
  cmdGetTags,
  cmdLoginUserWithGoogle,
  cmdRegisterUser,
  cmdLoginUser,
  cmdLogoutUser,
  cmdAddComment,
  cmdEditUser
} from '../Shared/types';
import {Oraculum} from './base';
import {APP_CONSTANTS} from '../app-constants';
import { updateUser as updateUserTmp, getUser } from '../background/graphQLClient';

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
    }, function (response) {
      const pages = response.data;
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
    }, function (response) {
      const page = response.data;
      console.log("Page: ", page);
      resolve(page);
    });
  });
}

export function getTags() {
  return new Promise(function (resolve, reject) {
    sendMessage({
      oraculumCommand: cmdGetTags
    }, function (response) {
      const tags = response.data;
      resolve(tags);
    });
  });
}

export const requestUser = userId => getUser(userId);

export function updateUser(data) {
  return new Promise(function (resolve, reject) {
    sendMessage({
      oraculumCommand: cmdEditUser,
      oraculumData: data
    }, function (userData) {
      Oraculum.user = userData;
      resolve(Oraculum.user);
    });
  });
}
