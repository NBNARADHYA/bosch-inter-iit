import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {
  MenuItem,
  InputLabel,
  Select,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Preview from "./Preview";
import classLabels from "../../../Constants/classLabels";
import serverUrl from "../../../Constants/serverUrl";
import Carousel from "react-material-ui-carousel";

const useStyles = makeStyles(() => ({
  center: {
    margin: "10px",
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    width: "552px",
    height: "160px",
  },
}));

const getClassString = (num) => {
  let key = `${num}`;
  while (key.length < 4) key = `0${key}`;
  return key;
};

const Index = ({ img, dialogOpen, handleClickOpen, history, handleClose }) => {
  const classes = useStyles();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [transformedImages, setTransformedImages] = useState([]);

  const handleTransformedImages = (data) => {
    data = data.map((each) => {
      return `${serverUrl}${each}`;
    });
    setTransformedImages(data);
  };

  const getTransformedImages = () => {
    let images = [];
    let count = 0;
    for (let i = 0; i < transformedImages?.length - 3; i++) {
      const image = (
        <div key={count}>
          <img src={transformedImages[i]} width="184px" height="160px" />
          <img src={transformedImages[i + 1]} width="184px" height="160px" />
          <img src={transformedImages[i + 2]} width="184px" height="160px" />
        </div>
      );
      count++;

      images.push(image);
    }
    return images;
  };

  const handlePreviewOpen = () => {
    setPreviewOpen(true);
  };

  const handleDialogClose = () => {
    setPreviewOpen(false);
    handleClose();
  };
  const [formData, setFormData] = useState({});

  const handleClassChange = (e, val) => {
    let newFormData = formData;
    newFormData.classId = e.target.value;
    setFormData(newFormData);
  };

  const handleIterationsChange = (e) => {
    let newFormData = formData;
    if (e.target.value < 0) {
      e.target.value = 0;
      return;
    }
    newFormData.numOfIterations = e.target.value;
    setFormData(newFormData);
  };

  const options = [];
  for (let option = 0; option < 48; option++) {
    const newOption = (
      <MenuItem key={option} value={getClassString(option)}>
        {classLabels[getClassString(option)]}
      </MenuItem>
    );
    options.push(newOption);
  }

  const handleSubmit = () => {
    let parameters = history.map((each) => each.parameters);
    parameters = JSON.stringify(parameters);
    parameters = JSON.stringify(parameters);
    let transformations = history.map((each) => each.id);
    transformations = JSON.stringify(transformations);
    transformations = JSON.stringify(transformations);
    const num_iterations = formData.numOfIterations;
    const class_id = formData.classId;
    let images = img.img;
    // images = JSON.stringify(images);

    const data = new FormData();
    data.append("transformations", transformations);
    data.append("parameters", parameters);
    data.append("num_iterations", num_iterations);
    data.append("class_id", class_id);

    img.img.forEach((item) => {
      data.append("images", item);
    });
    fetch(`${serverUrl}transform_images`, {
      method: "POST",
      credentials: "include",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        handleTransformedImages(res.images);
        handlePreviewOpen();
      })
      .catch((err) => {
        handleClose();
        console.log(err);
      });
  };
  return (
    <div>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        {!previewOpen ? (
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
                  >
                    {options}
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
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                color="primary"
                variant="contained"
              >
                Add
              </Button>
            </DialogActions>
          </div>
        ) : (
          <div>
            <DialogTitle id="form-dialog-title">Preview</DialogTitle>
            <DialogContent>
              {/* <DialogContentText>Enter the following details :</DialogContentText> */}
              <div>
                <br />
                <Carousel className={classes.center}>
                  {getTransformedImages()}
                </Carousel>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default Index;
