import AppBar from "@material-ui/core/AppBar";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import {makeStyles} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import InfoButton from "@material-ui/icons/InfoOutlined";
import {Bar} from "@reactchartjs/react-chart.js";
import React, {useCallback, useEffect, useState} from "react";
import Gallery from "react-grid-gallery";
import ImageUploader from "react-images-upload";

import classLabels from "../../../Constants/classLabels";
import colours from "../../../Constants/colours";
import serverUrl from "../../../Constants/serverUrl";
import DescriptionBox from "../DescriptionBox";

import Description from "./Description";

const useStyles = makeStyles((theme) => ({
                               appBar : {
                                 position : "relative",
                               },
                               title : {
                                 marginLeft : theme.spacing(2),
                                 flex : 1,
                               },
                               backdrop : {
                                 zIndex : theme.zIndex.drawer + 1,
                                 color : "#fff",
                               },
                             }));

const options = {
  scales : {
    yAxes : [
      {
        ticks : {
          beginAtZero : true,
        },
      },
    ],
  },
  maintainAspectRatio : true,
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return < Slide direction = "up" ref = {ref} { ...props }
  />;
});

export default function TestModel({ model_name: modelName }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [descriptionBox, setDescriptionBox] = React.useState(false);
  const [previewImg, setPreviewImg] = React.useState("");

  const [classScores, setClassScores] = useState({ x: [], y: [], colors: [] });

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const testModel = useCallback((formData) => {
    setLoading(true);

    fetch(`${serverUrl}test_model`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        setClassScores({
          x: res.x.map((x) => classLabels[x]),
          y: res.y,
          colors: Array(res.x.length)
            .fill(0)
            .map((_, i) => colours[i % colours.length]),
        });
        setLoading(false);
        setOpen(false);
      })
      .catch(console.error);
  }, []);

  const onImgUpload = useCallback(
    ([image], pictures) => {
      setPreviewImg(pictures);
      const formData = new FormData();
      formData.append("model_name", modelName);
      formData.append("image", image);

      testModel(formData);
    },
    [testModel, modelName]
  );

  const onSelectImage = useCallback(
    (index) => {
      setPreviewImg(images[index].src);
      const formData = new FormData();

      formData.append("model_name", modelName);
      formData.append("img_path", images[index].src);

      testModel(formData);
    },
    [images, testModel, modelName]
  );

  useEffect(() => {
    if (!open || images.length) return;

    setImgLoading(true);

    fetch(`${serverUrl}dataset_images`)
      .then((res) => res.json())
      .then((res) => {
        setImages(() =>
          res.images.map((imgUrl) => ({
            src: imgUrl,
            thumbnail: imgUrl,
            thumbnailWidth: 320,
            thumbnailHeight: 212,
          }))
        );
        setImgLoading(false);
      })
      .catch(console.error);
  }, [open, images.length]);

  const barData = {
    labels: classScores.x,
    datasets: [
      {
        label: "Confidence Score",
        data: classScores.y,
        backgroundColor: classScores.colors,
      },
    ],
  };

  if (loading || imgLoading) {
    return (
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" / >&
      nbsp;
  &nbsp;
        <Typography variant="h6" color="inherit">
          {imgLoading
            ? "Dataset images are being loaded"
            : "Testing the model on selected image"}
        </Typography>
      </Backdrop>
    );
  }

  return (
    <>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Test your model on an image
          </Typography>
          <IconButton color="inherit" onClick={() => setDescriptionBox(true)}>
            <InfoButton />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DescriptionBox
        descriptionBox={descriptionBox}
        handleDescriptionClose={() => setDescriptionBox(false)}
        title="Test your model"
      >
        <Description />
      </DescriptionBox>
      <Grid container direction="row" alignItems="center" spacing={1}>
        <Grid
          container
          item
          direction="column"
          alignItems="center"
          xs={Boolean(classScores.x.length) ? 6 : 12}
        >
          <Grid item>
            <ImageUploader
              label=""
              buttonText="Upload image"
              withIcon={true}
              onChange={onImgUpload}
              imgExtension={[".jpg", ".png", ".jpeg"]}
              singleImage={true}
            />
          </Grid>
          <Grid item>
            <Typography variant="h5" color="primary">
              OR
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleClickOpen}
            >
              Select an image from dataset
            </Button>
          </Grid>
        </Grid>
        <br />
        {Boolean(classScores.x.length) && (
          <>
            <Grid container item direction="column" alignItems="center" xs={6}>
              <Grid
  item
style =
    {
      { paddingBottom: "10px", }
    } >
    <Typography variant = "h6">Selected Image<
        /Typography>
                <img src={previewImg} height="150px" width="150px" />
    </Grid>
            </Grid>
    </>
        )}
        <Grid item style={{ paddingBottom: "10px" }}>
          <br />
    <br /> {Boolean(classScores.x.length) && (
            <Bar data={barData} options={options} width={1500} height={600} />
          )}
        </Grid>
      </Grid>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Select an image from the dataset
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{ padding: "5px" }}>
          {!loading && (
            <Gallery
              images={images}
              showLightboxThumbnails={true}
              onSelectImage={onSelectImage}
            />
          )}
        </div>
      </Dialog>
    </>
  );
}
