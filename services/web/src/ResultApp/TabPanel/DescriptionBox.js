import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function DescriptionBox({
  descriptionBox,
  handleDescriptionClose,
  description,
}) {
  return (
    <Dialog
      fullWidth="md"
      maxWidth="md"
      open={descriptionBox}
      onClose={handleDescriptionClose}
      aria-labelledby="max-width-dialog-title"
    >
      <DialogTitle id="max-width-dialog-title">Description Box</DialogTitle>
      <DialogContent>{description}</DialogContent>
      <DialogActions>
        <Button onClick={handleDescriptionClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
