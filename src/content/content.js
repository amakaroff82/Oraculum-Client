//'use strict';

import {Oraculum} from './base';
import {addPage, addComment} from './api';
import {initTagInput} from './tag-component';

const chrome = window.chrome;
let _mouseLeave = false;

function loadImage(path, elementId, ignoreExtention) {
  var imgURL = (!ignoreExtention && chrome.extension) ? chrome.extension.getURL(path) : path;
  document.getElementById(elementId).src = imgURL;
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
}

function loadPanel() {
  // TODO: need to remove
  const mainPanel = renderTemplate("main", {
    id: Oraculum.contentId
  })
  document.body.prepend(mainPanel);
  loadImage(Oraculum.user.picture, "oracle_user_avatar", true);

  let badge = renderTemplate("badge", {
    id: Oraculum.badgeId
  });
  document.body.prepend(badge);
  loadImage("assets/logo.png", "oraculum-logo");

  badge.onclick = function () {
    addPage({
      url: document.location.href,
      title: document.title,
      content: document.body.innerText,
      sourceTags: getSourceTags()
    }).then(function (page) {
      addPanelHandlers(page, mainPanel);
      displayComments(page, mainPanel);
      renderUserTags(page, mainPanel);
      mainPanel.className = "opened";
    });
  }

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


function removeComments(mainPanel) {
  let listComments = mainPanel.querySelector("#oraculum_list_comments");
  listComments.innerHTML = "";
}

function renderComment(item) {

  //console.log(item)

  const comment = renderTemplate("comments", {
    id: Oraculum.commentsId
  });

  const content = comment.querySelector(".comment-content");
  content.innerHTML = item.content;

  const img = comment.querySelector(".oraculum-user-comment-avatar");
  img.src = item.author.picture;

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
    const comment = mainPanel.querySelector("#oraculum_comment");

    addComment({
      content: comment.value,
      pageId: page._id,
    }).then(newComment => {
      const listComments = mainPanel.querySelector("#oraculum_list_comments");
      const comment = renderComment(newComment);
      listComments.append(comment);
    });
  };
}

function renderUserTags(page, mainPanel) {
  const tagComponent = mainPanel.querySelector('#tag-component');
  initTagInput(tagComponent, page.tags, function(tags) {
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

