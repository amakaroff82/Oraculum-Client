import { browserActionHandler } from './browserActionHandler';
import { contentHandler } from './contentHandler';
import { contextMenuHandler } from './contextMenuHandler';
import { checkUserToken } from './user';


const chrome = window.chrome;

chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({firstLaunch: true}, function() {


    });
});

chrome.browserAction.onClicked.addListener(browserActionHandler);
chrome.runtime.onMessage.addListener(contentHandler);

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


checkUserToken(function(){
    console.log("Application started");


});