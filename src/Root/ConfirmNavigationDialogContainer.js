import { connect } from 'react-redux';
import ConfirmNavigationDialog from './ConfirmNavigationDialog';
import { updateNavDialog } from './Actions/confirmNavigation';

// Connects to the store and injects select state and action creators into component props
const ConfirmNavigationDialogContainer = connect(
  ({ confirmNavigation }) => ({ confirmNavigation }),
  { updateNavDialog }
)(ConfirmNavigationDialog);

export default ConfirmNavigationDialogContainer;
