import {getMyPages} from '../../background/graphQLClient'

export const requestPages = (authorId) => getMyPages(authorId);
