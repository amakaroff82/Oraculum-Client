import React from 'react';
import PagesTabPageContainer from './PagesTabPageContainer';
import PagesStore from './PagesStore';
import { Provider } from 'react-redux';
import { loadPages, loadAllPages, loadTags } from './actions';
import connect from '../Shared/connect';

const PagesComponent = ({ pagesHeaderLabel, loadPages, loadTags, onTagsChange }) => (
  <PagesTabPageContainer pagesHeaderLabel={pagesHeaderLabel}
                         loadPages={loadPages}
                         loadTags={loadTags}
                         onTagsChange={onTagsChange} />
);

function onMyPagesTagsChange(tags) {
  console.log(tags);
}

function onAllPagesTagsChange(tags) {
  console.log(tags);
  loadAllPages();
}

const PagesContainer = connect(
  () => ({ pagesHeaderLabel: 'My Pages' }),
  {
    loadPages,
    loadTags,
    onTagsChange: onMyPagesTagsChange
  }
)(PagesComponent);

const AllPagesContainer = connect(
  () => ({ pagesHeaderLabel: 'All Pages' }),
  {
    loadPages: loadAllPages,
    loadTags,
    onTagsChange: onAllPagesTagsChange
  }
)(PagesComponent);

const PagesArea = () => (
  <Provider store={PagesStore}>
    <PagesContainer />
  </Provider>
);

export const AllPagesArea = () => (
  <Provider store={PagesStore}>
    <AllPagesContainer />
  </Provider>
);

export default PagesArea;
