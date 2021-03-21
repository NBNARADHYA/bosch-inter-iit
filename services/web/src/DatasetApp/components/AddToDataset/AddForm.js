import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import React from "react";

import classLabels from "../../../Constants/classLabels";

const AddForm = ({
  handleClassChange,
  handleIterationsChange,
  handleSubmit,
  handleClose,
  selectedLabel,
  numOfIterations
}) => {
  return (
    <div>
      <DialogTitle id="form-dialog-title">Add to Dataset</DialogTitle>
      <DialogContent>
        <div>
          <div>
            <InputLabel id="demo-simple-select-placeholder-label-label">
              Class ID:
            </InputLabel>
            <Select
              autoFocus
              labelId="demo-simple-select-placeholder-label-label"
              id="demo-simple-select-placeholder-label"
              name="classId"
              onChange={(e, val) => handleClassChange(e, val)}
              displayEmpty
              fullWidth
              required
              value={selectedLabel}
            >
              {
    Object.keys(classLabels).map((label) => <MenuItem key={label} value={label}>
        {classLabels[label]}
        </MenuItem>)}
            </Select>
          </div>
          <br />
          <TextField
            margin="dense"
            id="numOfIterations"
            onChange={(e) => handleIterationsChange(e)}
            InputLabelProps={{ shrink: true }}
            label="Number of Iterations"
            helperText="Enter a positive number."
            type="number"
            fullWidth
            required
            value={numOfIterations}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" disabled={numOfIterations<=0}>
          Add
        </Button>
      </DialogActions>
    </div>
  );
};

export default AddForm;
