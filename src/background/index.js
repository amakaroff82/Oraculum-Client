import { browserActionHandler } from './browserActionHandler';
import { contentHandler } from './contentHandler';
import { contextMenuHandler } from './contextMenuHandler';
import { checkUserTokens } from './user';


const chrome = window.chrome;
const chromeStorage = chrome.storage.local;

chrome.runtime.onInstalled.addListener(function() {
  chromeStorage.set({firstLaunch: true}, function() {


    });
    chrome.contextMenus.create({
      id: 'save-text-selection',
      title: 'Save to Oraculum',
      contexts: ['selection']
    });

    chrome.contextMenus.onClicked.addListener(function(info, tab) {
      if (info.menuItemId == 'save-text-selection') {
        contextMenuHandler(info, tab);
      }
    });
});

chrome.browserAction.onClicked.addListener(browserActionHandler);
chrome.runtime.onMessage.addListener(contentHandler);