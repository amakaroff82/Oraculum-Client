import connect from '../Shared/connect';
import { toggleFilterable } from './actions';
import PagesHeaderComponent from './PagesHeaderComponent';

// Connects to the store and injects select state and action creators into component props
export default connect(
    ({ pages, modals, tags }, {pagesHeaderLabel, loadPages, onTagsChange}) => ({
        pages,
        modals,
        pagesHeaderLabel,
        loadPages,
        tags,
        onTagsChange
    }),
    {
        toggleFilterable
    }
)(PagesHeaderComponent);
