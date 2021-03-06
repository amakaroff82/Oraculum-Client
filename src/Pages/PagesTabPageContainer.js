import connect from '../Shared/connect';
import PagesTabPageComponent from './PagesTabPageComponent';

// Connects to the store and injects select state and action creators into component props
const PagesTabPageContainer = connect(
  (_, { pagesHeaderLabel, loadPages, loadTags, onTagsChange }) => ({
    pagesHeaderLabel,
    loadPages,
    loadTags,
    onTagsChange
  })
)(PagesTabPageComponent);

export default PagesTabPageContainer;
