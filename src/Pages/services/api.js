import {getMyPages, getAllPages, getTags} from '../../background/graphQLClient'

export const requestPages = (authorId) => getMyPages(authorId);
export const requestAllPages = () => getAllPages();
export const requestTags = () => getTags();
