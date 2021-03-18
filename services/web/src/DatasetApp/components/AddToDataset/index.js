import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { MenuItem, InputLabel, Select } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const getClassString = (num) => {
  let key = `${num}`;
  while (key.length < 4) key = `0${key}`;
  return key;
};

const Index = ({ dialogOpen, handleClickOpen, handleClose }) => {
  const [formData, setFormData] = useState({});

  const handleClassChange = (e) => {
    let newFormData = formData;
    newFormData.classId = e.target.value;
    setFormData(newFormData);
    console.log(formData);
  };

  const handleIterationsChange = (e) => {
    let newFormData = formData;
    if (e.target.value < 0) {
      e.target.value = 0;
      return;
    }
    newFormData.numOfIterations = e.target.value;
    setFormData(newFormData);
    console.log(formData);
  };

  const options = [];
  for (let option = 0; option < 50; option++) {
    const newOption = (
      <MenuItem key={option} value={getClassString(option)}>
        {option}
      </MenuItem>
    );
    options.push(newOption);
  }
  return (
    <div>
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullScreen
      >
        <DialogTitle id="form-dialog-title">Add to Dataset</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>Enter the following details :</DialogContentText> */}
          <div>
            <div>
              <InputLabel
                shrink
                id="demo-simple-select-placeholder-label-label"
              >
                Class ID:
              </InputLabel>
              <Select
                autoFocus
                labelId="demo-simple-select-placeholder-label-label"
                id="demo-simple-select-placeholder-label"
                name="classId"
                value={formData && formData.classId}
                onChange={(e) => handleClassChange(e)}
                displayEmpty
                fullWidth
              >
                {options}
              </Select>
            </div>
            <TextField
              margin="normal"
              id="numOfIterations"
              onChange={(e) => handleIterationsChange(e)}
              InputLabelProps={{ shrink: true }}
              label="Number of Iterations"
              helperText="Enter a positive number."
              type="number"
              fullWidth
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary" variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Index;
