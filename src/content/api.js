//'use strict';

import {
  cmdAddUpdatePage,
  cmdGetUserData,
  cmdGetPagesByUrls,
  cmdGetPageByUrl,
  cmdLoginUser,
  cmdLogoutUser,
  cmdAddComment
} from '../Shared/types';
import {Oraculum} from './base';


const testUser = {
  "_id": "5acc99ca3ba11b31f4edad24",
  "id": "111608252004820560470",
  "name": "",
  "given_name": "",
  "family_name": "",
  "email": "omakarov@corevalue.net",
  "verified_email": "true",
  "picture": "https://lh5.googleusercontent.com/-prImsZ2Mnl0/AAAAAAAAAAI/AAAAAAAAAAs/jFj7h6CNrbs/photo.jpg",
  "hd": "corevalue.net"
};


const chrome = window.chrome;
const appConstants = require('../app-constants.json');

function sendMessage(data, callback) {
  if (appConstants.isProdMod) {
    chrome.runtime.sendMessage(data, callback);
  } else {
    chrome.runtime.sendMessage(appConstants.googleExtensionId, data, callback);
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


export function loginUser() {
  return new Promise(function (resolve, reject) {
    // todo: refactor
    if (!chrome.extension) {
      Oraculum.user = testUser;
      resolve(testUser);
      return;
    }

    chrome.runtime.sendMessage({
      oraculumCommand: cmdLoginUser
    }, function (userData) {
      Oraculum.user = userData;
      resolve(Oraculum.user);
    });
  });
}


export function logoutUser() {
  return new Promise(function (resolve, reject) {
    console.log(">>> content api: logoutUser")
    if (!chrome.extension) {
      Oraculum.user = null;
      resolve(null);
      return;
    }
    chrome.runtime.sendMessage({
      oraculumCommand: cmdLogoutUser
    }, function () {
      Oraculum.user = null;
      resolve(Oraculum.user);
    });
  });
}


export function getUserData() {
  return new Promise(function (resolve, reject) {
    if (!chrome.extension) {
      Oraculum.user = testUser;
      resolve(testUser);
      return;
    }

    chrome.runtime.sendMessage({
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