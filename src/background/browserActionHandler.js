import {login, logout, getUserData} from './user';

const chrome = window.chrome;

export function browserActionHandler() {
  openWindow();
}

function openPage(page) {
  chrome.tabs.create({url: page});
}


function openWindow() {
  chrome.tabs.create({url: chrome.extension.getURL('index.html')});
}

export function showNewIcon() {
  chrome.browserAction.setIcon({path: 'assets/logo1.png'});
}

export function showAddedIcon() {
  chrome.browserAction.setIcon({path: 'assets/logo2.png'});
}
