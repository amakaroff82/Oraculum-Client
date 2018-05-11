import {Oraculum, inIframe, isGoogle, initTemplates} from './base';
import {initGoogle} from './googleAgent';
import {initContentPanel} from './content';
import {getUserData} from './api';

export function bootstrap(force) {
  if (force) {
    const badge = document.getElementById("oraculum-coresearch-main-badge");
    if (badge) {
      badge.parentElement.removeChild(badge)
    }
    const mainPanel = document.getElementById("oraculum-coresearch-main-panel");
    if (mainPanel) {
      mainPanel.parentElement.removeChild(mainPanel)
    }
  }

  if (!inIframe()) {
    getUserData().then(function (user) {
      Oraculum.user = user;
      if (!user || !user.id) {
        return;
      }
      initTemplates().then(function (templates) {
        if (isGoogle()) {
          // google agent
          initGoogle();
        }
        else {
          // content panel
          initContentPanel();
        }
      });
    });
  }
};

bootstrap();