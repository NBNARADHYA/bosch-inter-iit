import { IconButton, makeStyles, Snackbar } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import React, { useState } from "react";

import serverUrl from "../../../Constants/serverUrl";

import AddForm from "./AddForm";
import PreviewImages from "./PreviewImages";

const useStyles = makeStyles((theme) => ({
  center: {
    margin: "10px",
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    width: "552px",
    height: "160px",
  },
  close: {
    padding: theme.spacing(0.5),
  },
}));

const Index = ({ img, dialogOpen, history, handleClose }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({});
  const [previewOpen, setPreviewOpen] = useState(false);
  const [transformedImages, setTransformedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [snackBar, setSnackBar] = useState(false);

  const handleIsLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  const handleSnackBarClose = () => setSnackBar(false);
  const handleTransformedImages = (data) => setTransformedImages(data);
  const handlePreviewOpen = () => setPreviewOpen(true);
  const handleDialogClose = () => {
    stopLoading();
    setTransformedImages([]);
    setPreviewOpen(false);
    handleClose();
  };

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

  const handleSubmit = () => {
    handleIsLoading();
    let parameters = history.map((each) => each.parameters);
    parameters = JSON.stringify(parameters);
    parameters = JSON.stringify(parameters);
    let transformations = history.map((each) => each.id);
    transformations = JSON.stringify(transformations);
    transformations = JSON.stringify(transformations);
    const num_iterations = formData.numOfIterations;
    const class_id = formData.classId;

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
        stopLoading();
        handlePreviewOpen();
        handleTransformedImages(res.images);
      })
      .catch((err) => {
        stopLoading();
        handleClose();
        console.log(err);
      });
  };

  const deleteImages = () => {
    handleDialogClose();
    let images = JSON.stringify(transformedImages);
    images = JSON.stringify(images);
    const data = new FormData();
    data.append("images", images);
    console.log(data);
    fetch(`${serverUrl}dataset_images`, {
      method: "DELETE",
      credentials: "include",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleAddConfirmation = () => {
    handleDialogClose();
    setSnackBar(true);
  };

  return (
    <div>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        {" "}
        {isLoading && (
          <div>
            <DialogTitle id="form-dialog-title">Preview</DialogTitle>
            <DialogContent>
              <CircularProgress className={classes.center} />
            </DialogContent>
          </div>
        )}
        {!isLoading && !previewOpen && (
          <AddForm
            handleClassChange={handleClassChange}
            handleIterationsChange={handleIterationsChange}
            handleSubmit={handleSubmit}
            handleClose={handleClose}
          />
        )}
        {!isLoading && previewOpen && (
          <PreviewImages
            transformedImages={transformedImages}
            deleteImages={deleteImages}
            handleAddConfirmation={handleAddConfirmation}
          />
        )}
      </Dialog>

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={snackBar}
        autoHideDuration={6000}
        onClose={handleSnackBarClose}
        message="Added images to the dataset successfully"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={handleSnackBarClose}
          >
            <CloseIcon />
          </IconButton>
        }
      />
    </div>
  );
};

export default Index;
