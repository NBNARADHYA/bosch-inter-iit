import AppBar from "@material-ui/core/AppBar";
import Backdrop from '@material-ui/core/Backdrop';
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from "@material-ui/core/Dialog";
import Grid from '@material-ui/core/Grid';
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import {makeStyles} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import React, {useCallback, useEffect, useState} from "react";
import Gallery from "react-grid-gallery";
import ImageUploader from "react-images-upload";

import serverUrl from "../../../Constants/serverUrl";

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
                                 color : '#fff',
                               },
                             }));

const Transition = React.forwardRef(function Transition(props, ref) {
  return < Slide direction = "up" ref = {ref} { ...props }
  />;
});

export default function HeatMap({model_name: modelName}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [heatMapPath, setHeatMapPath] = useState(null)

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const generateHeatMap = useCallback((formData) => {
    setLoading(true)
    setOpen(false)
    fetch(`${serverUrl}generate_heatmap`, {
      method: "POST",
      body: formData
    })
    .then(res => res.json())
    .then(res => {
      setHeatMapPath(`${res.path}?${new Date().getTime()}`)
      setLoading(false)
    })
    .catch(console.error)
  }, [])

  const onImgUpload = useCallback(([image]) => {
    const formData = new FormData()
    formData.append("model_name", modelName)
    formData.append("image", image)

    generateHeatMap(formData);
  }, [generateHeatMap])

  const onSelectImage = useCallback((index) => {
    const formData = new FormData()
    
    formData.append("model_name", modelName)
    formData.append("img_path", images[index].src)

    generateHeatMap(formData);
  }, [images, generateHeatMap]);
  

  useEffect(() => {
    if(!open || images.length) return

    setLoading(true);

    fetch(`${serverUrl}dataset_images`)
    .then(res => res.json())
    .then(res => {
      setImages(() => res.images.slice(0, 10).map(imgUrl => ({
        src: imgUrl,
        thumbnail: imgUrl,
        thumbnailWidth: 320,
        thumbnailHeight: 212
      })));
      setLoading(false);
    })
    .catch(console.error)
  }, [open])

  return (
    <>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="primary" / >
      </Backdrop>
      <Grid container justify="flex-end" direction="column" alignItems="center" spacing={1}>
        <Grid item>
          <Typography variant="h4" color="primary" >
            Test your model on an image to generate heatmap
          </Typography>
      </Grid>
        <Grid item>
          <ImageUploader
            label="Test model on an uploaded image"
            buttonText="Upload image"
            withIcon={true}
            onChange={onImgUpload}
            imgExtension={[".jpg", ".png", ".jpeg"]}
            singleImage={true}
          />
      </Grid>
        <Grid item>
          <Typography variant="h5" color="primary">OR</Typography>
      </Grid>
        <Grid item>
          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Select an image from dataset
          </Button>
      </Grid>
        <br /><Grid item style = {{ paddingBottom: "10px" }}> {
    Boolean(heatMapPath) &&<img src =
                            { heatMapPath } /> }
        </Grid><
        /Grid>
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
        </AppBar><div style = {{ padding: "5px" }}> {!loading && <Gallery images={images} showLightboxThumbnails={true} onSelectImage={onSelectImage} />}
        </div>
      </Dialog>
    </>
  );
    }
