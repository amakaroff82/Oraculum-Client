import React from 'react';
import PagesTabPageContainer from './PagesTabPageContainer';
import PagesStore from './PagesStore';
import { Provider } from 'react-redux';
import { loadPages, loadAllPages, loadTags, updateSelectedTags } from './actions';
import connect from '../Shared/connect';

const PagesComponent = ({ pagesHeaderLabel, loadPages, loadTags, onTagsChange }) => (
  <PagesTabPageContainer pagesHeaderLabel={pagesHeaderLabel}
                         loadPages={loadPages}
                         loadTags={loadTags}
                         onTagsChange={onTagsChange} />
);

const PagesContainer = connect(
  () => ({ pagesHeaderLabel: 'My Pages' }),
  {
    loadPages,
    loadTags,
    onTagsChange: updateSelectedTags
  }
)(PagesComponent);

const AllPagesContainer = connect(
  () => ({ pagesHeaderLabel: 'All Pages' }),
  {
    loadPages: loadAllPages,
    loadTags,
    onTagsChange: updateSelectedTags
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
