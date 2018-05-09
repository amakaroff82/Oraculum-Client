import { browserActionHandler } from './browserActionHandler';
import { contentHandler } from './contentHandler';
import { checkUserToken } from './user';


const chrome = window.chrome;

chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({firstLaunch: true}, function() {


    });
});

chrome.browserAction.onClicked.addListener(browserActionHandler);
chrome.runtime.onMessage.addListener(contentHandler);


checkUserToken(function(){
    console.log("Application started");


});