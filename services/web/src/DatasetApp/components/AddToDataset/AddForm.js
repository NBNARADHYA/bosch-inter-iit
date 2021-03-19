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

const getClassString = (num) => {
  let key = `${num}`;
  while (key.length < 5)
    key = `0${key}`;
  return key;
};

const options = [];
for (let option = 0; option < 48; option++) {
  const newOption = (
    <MenuItem key={option} value={getClassString(option)}>
      {classLabels[getClassString(option)]}
    </MenuItem>
  );
  // console.log(getClassString(option), classLabels[getClassString(option)]);
  options.push(newOption);
}

const AddForm = ({
  handleClassChange,
  handleIterationsChange,
  handleSubmit,
  handleClose,
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
  labelId = "demo-simple-select-placeholder-label-label"
  id = "demo-simple-select-placeholder-label"
  name = "classId"
  onChange = {(e, val) => handleClassChange(e, val)} displayEmpty
  fullWidth
  required > {options}</Select>
          </div><br />< TextField
  margin = "dense"
  id = "numOfIterations"
  onChange = {(e) => handleIterationsChange(e)} InputLabelProps = {
    { shrink: true }
  } label = "Number of Iterations"
  helperText = "Enter a positive number."
  type = "number"
  fullWidth
            required
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Add
        </Button>
      </DialogActions>
    </div>
  );
};

export default AddForm;
