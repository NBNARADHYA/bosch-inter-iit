import { Button, Grid, makeStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import React, { useCallback, useState } from "react";
import Tooltip from '@material-ui/core/Tooltip';
import AddToDataset from "./AddToDataset";
import GetAppIcon from '@material-ui/icons/GetApp';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { downloadImage } from "../../Utils";

const useStyles = makeStyles(() => ({
  spacing: {
    margin: "35px 180px 20px",
  },
  fixedWidthImg: {
    textAlign: "center",
    width: "300px",
  },
  originalImg: {
    textAlign: "center",
  },
}));

const Content = ({
  classes,
  open,
  img,
  previewImg,
  history,
  originalDimensions,
  setOriginalDimensions,
  previewDimensions,
  setPreviewDimensions,
}) => {
  const styles = useStyles();

  const [dialogOpen, setDialogOpen] = useState(false);
  const handleClickOpen = useCallback(() => {
    console.log('here');
    setDialogOpen(true);
  },[]);

  const handleClose = useCallback(() => {
    setDialogOpen(false);
  },[]);

  return (
    <main
      className={clsx(classes.content, {
        [classes.contentShift]: open,
      })}
    >
      <div className={classes.drawerHeader} />

      {img?.img?.length > 0 ? (
        <Grid container justify="center" alignItems="center" direction="column" id="step4">
          <Typography variant="h6" align="center">
            Original image
          </Typography>
          <br />
          <img
            src={img.pictures[0]}
            alt={"Loading"}
            className={
              originalDimensions.width > 300
                ? styles.fixedWidthImg
                : styles.originalImg
            }
            onLoad={() => {
              var imgObj = new Image();
              imgObj.onload = function () {
                setOriginalDimensions({
                  height: this.height,
                  width: this.width,
                });
              };
              imgObj.src = img.pictures[0];
            }}
          />
          <br></br>
          <br></br>
          <Typography variant="h6" align="center">
            Transformed image
          </Typography>
          <br />
          {!previewImg && <CircularProgress />}
          {previewImg && (
            <img
              src={previewImg || img.pictures[0]}
              alt={"Loading"}
              className={
                previewDimensions.width > 300
                  ? styles.fixedWidthImg
                  : styles.originalImg
              }
              onLoad={() => {
                var imgObj = new Image();
                imgObj.onload = function () {
                  setPreviewDimensions({
                    height: this.height,
                    width: this.width,
                  });
                };
                imgObj.src = previewImg || img.pictures[0];
              }}
            />
          )}
          {previewImg && <Tooltip title="Download this preview image" placement="right">
              <Button 
                variant="contained"
                color="primary"
                onClick={() => {
                  downloadImage(previewImg)
                 }}
                startIcon={<GetAppIcon/>}
                className={styles.spacing}
                size="small"                
              >
                Download
              </Button>
            </Tooltip>}
        <Tooltip title="Preview " placement="right">            
          <Button
            variant="contained"
            color="primary"
            disabled={history && history.length > 0 ? false : true}
            onClick={handleClickOpen}
            className={!previewImg ? styles.spacing: ''}
            size="small"            
            startIcon={<VisibilityIcon/>}
            id="step7"
          >
            Preview all images
          </Button>
          </Tooltip>          
          <AddToDataset
            dialogOpen={dialogOpen}
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
            history={history}
            img={img}
          />
        </Grid>
      ) : (
        <Grid container justify="center" alignItems="center" direction="column" id="step4">
          <br />
          <Typography variant="h6">
            Please upload images in the sidebar menu.
          </Typography>
        </Grid>
      )}
    </main>
  );
};

export default Content;
