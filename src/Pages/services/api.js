import {getMyPages, getAllPages} from '../../background/graphQLClient'

export const requestPages = (authorId) => getMyPages(authorId);
export const requestAllPages = () => getAllPages();
