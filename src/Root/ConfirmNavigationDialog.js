import React from 'react';
import Dialog, { DialogActions, DialogTitle } from 'material-ui/Dialog';
import ActionButtons from '../Shared/ActionButtons';

const ConfirmNavigationDialog = ({ confirmNavigation, updateNavDialog }) => {
  const handleCloseWithTransition = allowTransition => {
    updateNavDialog({ open: false });
    confirmNavigation.callback(allowTransition);
  };

  const handleCancel = () => handleCloseWithTransition(false);
  const handleConfirm = () => handleCloseWithTransition(true);

  return (
    <Dialog open={confirmNavigation.open} onRequestClose={handleCancel}>
      <DialogTitle>{confirmNavigation.message}</DialogTitle>
      <DialogActions>
        <ActionButtons
          primaryButtonProps={{ textId: 'confirm', onClick: handleConfirm }}
          cancelButtonProps={{ onClick: handleCancel }}
        />
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmNavigationDialog;
