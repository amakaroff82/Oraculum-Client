import { createOrUpdatePage } from './graphQLClient';
import { getUserData } from './user';

const chrome = window.chrome;

export function contextMenuHandler(info, tab) {
  getUserData(function(user) {
    createOrUpdatePage({
      url: info.pageUrl,
      selection: info.selectionText,
      authorId: user._id
    });
  });
}
