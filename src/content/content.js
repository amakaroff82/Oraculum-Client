//'use strict';

import {Oraculum} from './base';
import {addPage, addComment, getTags} from './api';
import {initTagInput} from './tag-component';

const chrome = window.chrome;
let _mouseLeave = false;

function loadImage(path, elementId, ignoreExtension) {
  var imgURL = (!ignoreExtension && chrome.extension) ? getExtensionUrl(path) : path;
  document.getElementById(elementId).src = imgURL;
}

export function getExtensionUrl(path) {
  return chrome.extension.getURL(path);
}

function getSourceTags() {
  const path = document.location.href;

  if (path.indexOf("stackoverflow.com") !== -1) {

    var links = document.querySelectorAll('.post-taglist a')
    if (links.length > 0) {
      return Array.prototype.slice.call(links).map(link => link.lastChild ? link.lastChild.nodeValue : "");
    }
  } else if (path.indexOf("habrahabr.ru") !== -1) {
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords && metaKeywords.attributes.content) {
      return metaKeywords.attributes.content.value.split(', ')
    }
  }

  return [];
}

export function initContentPanel() {
  loadPanel();
  addListeners();
}

function loadPanel() {
  // TODO: need to remove
  const mainPanel = renderTemplate("main", {
    id: Oraculum.contentId
  });
  var allTags = [];
  document.body.prepend(mainPanel);
  if (Oraculum.user.picture) {
    loadImage(Oraculum.user.picture, "oracle_user_avatar", true);
  } else {
    loadImage("assets/user-icon.png", "oracle_user_avatar");
  }

  document.getElementById("oracle_user_name").innerHTML = Oraculum.user.name || Oraculum.user.email;

  let badge = renderTemplate("badge", {
    id: Oraculum.badgeId
  });
  document.body.prepend(badge);
  loadImage("assets/logo.png", "oraculum-logo");

  getTags().then(function (tags) {
    allTags = tags.map(function (tag) {
      return tag.text;
    });
  });


  badge.onclick = function () {
    addPage({
      url: document.location.href,
      title: document.title,
      content: document.body.innerText,
      sourceTags: getSourceTags()
    }).then(function (res) {
      const page = res.data;
      addPanelHandlers(page, mainPanel);
      displayComments(page, mainPanel);
      renderUserTags(page, allTags, mainPanel);
      mainPanel.className = "opened";
    });
  };

  const bookmark = mainPanel.querySelector(".oraculum-bookmark");
  bookmark.addEventListener("mouseenter", function () {
    _mouseLeave = false;
  });

  bookmark.addEventListener("mouseleave", function () {
    _mouseLeave = true;
    setTimeout(function () {
      if (_mouseLeave) {
        removeComments(mainPanel);
        mainPanel.className = "";
      }
    }, 1000);
  });
}

function addListeners() {
  chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
      if (request.type === 'extension_logout') {
        document.getElementById('oraculum-coresearch-main-badge').remove();
        document.getElementById('oraculum-coresearch-main-panel').remove();
      }
    });
}


function removeComments(mainPanel) {
  let listComments = mainPanel.querySelector("#oraculum_list_comments");
  listComments.innerHTML = "";
}

function renderComment(item) {

  //console.log(item)

  const comment = renderTemplate("comment", {
    id: Oraculum.commentId,
    class: 'comment'
  });

  const content = comment.querySelector(".comment-content");
  content.innerHTML = item.content;

  const userName = comment.querySelector(".user-name");
  userName.innerHTML = item.author.name || item.author.email;

  const img = comment.querySelector(".oraculum-user-comment-avatar");
  img.src = item.author.picture || chrome.extension.getURL("assets/user-icon.png");

  return comment;
}

function displayComments(page, mainPanel) {
  if (page.comments.length > 0) {
    const listComments = mainPanel.querySelector("#oraculum_list_comments");

    page.comments.forEach(function (item) {
      const comment = renderComment(item);
      listComments.append(comment);
    });
  }
}

function addPanelHandlers(page, mainPanel) {
  let addCommentButton = mainPanel.querySelector("#oraculum_add_comment");
  addCommentButton.onclick = function () {
    const commentInput = mainPanel.querySelector("#oraculum_comment");

    if (commentInput.value) {
      addComment({
        content: commentInput.value,
        pageId: page._id,
      }).then(res => {
        const newComment = res.data;
        const listComments = mainPanel.querySelector("#oraculum_list_comments");
        const comment = renderComment(newComment);
        listComments.append(comment);
        commentInput.value = '';
      });
    }
  };
}

function renderUserTags(page, allTags, mainPanel) {
  const tagComponent = mainPanel.querySelector('#tag-component');
  initTagInput(tagComponent, page.tags, allTags, function(tags) {
    addPage({
      url: document.location.href,
      tags: tags
    });
  });
}


export function renderTemplate(name, attr) {
  let template = Oraculum.globalTemplates[name];
  if (!template)
    return;

  let el = document.createElement('div');
  if (attr) {
    for (let at in attr) {
      el.setAttribute(at, attr[at]);
    }
  }

  el.innerHTML = template;
  return el;
}

