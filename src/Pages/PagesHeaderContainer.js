import connect from '../Shared/connect';
import { loadPages, toggleCreateModal, toggleFilterable } from './actions';
import PagesHeaderComponent from './PagesHeaderComponent';

// Connects to the store and injects select state and action creators into component props
export default connect(
    ({ pages, modals, }) => ({
        pages,
        modals,
    }),
    {
        loadPages,
        toggleCreateModal,
        toggleFilterable
    }
)(PagesHeaderComponent);
