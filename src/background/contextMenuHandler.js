import { createOrUpdatePage } from './graphQLClient';
import { getUserData } from './user';

const chrome = window.chrome;

export function contextMenuHandler(info, tab) {
  let user = getUserData();
  createOrUpdatePage({
    url: info.pageUrl,
    selection: info.selectionText,
    authorId: user.id
  });
}
