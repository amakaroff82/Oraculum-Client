import { getPage } from '../../background/graphQLClient';

export const requestPage = id => getPage(id);
