import React from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from "@material-ui/core";

function ResetDialog({isOpen, handleClose, handleReset }) {
  return <Dialog
  open={isOpen}
  onClose={handleClose}
  aria-labelledby="alert-dialog-title"
  aria-describedby="alert-dialog-description"
>
  <DialogTitle id="alert-dialog-title">{"Reset all augmentations?"}</DialogTitle>
  <DialogContent>
    <DialogContentText id="alert-dialog-description">
      This will remove all your applied augmentations from the timeline.
      Are you sure you want to reset all the augmentations?
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={()=> {handleReset(); handleClose();}} color="primary">
      reset
    </Button>
    <Button onClick={handleClose} color="primary" autoFocus>
      don't reset
    </Button>
  </DialogActions>
</Dialog>      
}
export default ResetDialog;