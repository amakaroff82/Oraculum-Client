import connect from '../Shared/connect';
import PagesComponentLoader from './PagesTableComponent';
import { toggleEditModal, updateTableSorting } from './actions';

// Connects to the store and injects select state and action creators into component props
export default connect(({ pages, table }) => ({ pages, table }), {
    toggleEditModal,
    updateTableSorting
})(PagesComponentLoader);
