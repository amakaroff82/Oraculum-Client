//'use strict';

import {Oraculum} from './base';

import {getPagesByUrls} from './api'
import {renderTemplate, getExtensionUrl} from './content'

let timer = null;


export function initGoogle() {
  tryToFetch();
}

function tryToFetch() {
  timer = setInterval(function () {
    if (fetchLinksFromGoogleResults()) {
      clearInterval(timer);
      timer = null;
    }
  }, 1000);
}

function fetchLinksFromGoogleResults() {
  let links = document.querySelectorAll(".bkWMgd .g .rc .r a");

  Oraculum.googleLinks = [];

  if (links.length === 0) {
    return false;
  }

  links.forEach((link) => {
    try {
      let url = link.getAttribute("ping").split("?")[1].split("&url=")[1].split("&ved=")[0];
      let title = link.innerText;

      if (url) {
        Oraculum.googleLinks.push({
          url: url,
          title: title,
          elementRef: link
        });
      }
    }
    catch (e) {

    }
  });

  checkLinks();

  return true;
}

function checkLinks() {
  const urls = Oraculum.googleLinks.map(link => link.url);
  getPagesByUrls(urls).then(function (pages) {
    for (var i = 0; i < Oraculum.googleLinks.length; i++) {
      for (var j = 0; j < pages.length; j++) {
        if (Oraculum.googleLinks[i].url === pages[j].url) {
          initLink(Oraculum.googleLinks[i], pages[j]);
        }
      }
    }
  });
}

function initLink(link, pageData) {
  const template = renderTemplate("link");
  const linkContainer = template.querySelector(".oraculum-link");

  const applicationImage = document.createElement("img");
  applicationImage.src = getExtensionUrl("assets/corevalue-icon.jpg");
  applicationImage.classList.add("oraculum-app-image");
  applicationImage.classList.add("oraculum-image");
  linkContainer.appendChild(applicationImage);

  const commentsAuthorPictures = pageData.comments.map(function(comment) {
    return comment.author.picture;
  });

  const uniqCommentsAuthorPictures = commentsAuthorPictures.filter(function(item, i, ar){
    return ar.indexOf(item) === i;
  }).slice(0, 3);

  uniqCommentsAuthorPictures.forEach(function(authorPicture) {
    const authorImage = document.createElement("img");
    authorImage.src = authorPicture || getExtensionUrl("assets/user-icon.png");
    authorImage.classList.add("oraculum-author-image");
    authorImage.classList.add("oraculum-image");
    linkContainer.appendChild(authorImage);
  });
  const linkPanel = link.elementRef.parentElement.appendChild(template);
}

