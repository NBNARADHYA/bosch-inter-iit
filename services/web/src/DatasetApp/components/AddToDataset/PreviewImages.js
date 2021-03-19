import React from "react";
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  makeStyles,
} from "@material-ui/core";
import Carousel from "react-material-ui-carousel";

const useStyles = makeStyles((theme) => ({
  center: {
    margin: "10px",
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    width: "552px",
    height: "160px",
  },
}));

const getTransformedImages = (transformedImages) => {
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

const PreviewImages = ({
  transformedImages,
  deleteImages,
  handleAddConfirmation,
}) => {
  const classes = useStyles();
  return (
    <div>
      <DialogTitle id="form-dialog-title">Preview</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to add these images to the dataset?
        </DialogContentText>
        <div>
          <br />
          <Carousel className={classes.center}>
            {getTransformedImages(transformedImages)}
          </Carousel>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={deleteImages} color="secondary">
          Discard
        </Button>
        <Button
          onClick={handleAddConfirmation}
          variant="contained"
          color="primary"
        >
          Confirm
        </Button>
      </DialogActions>
    </div>
  );
};

export default PreviewImages;
