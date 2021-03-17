import React from "react";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import { Grid, makeStyles } from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() => ({
  spacing: {
    margin: "70px 180px"
  },
  fixedWidthImg: {
    textAlign: "center",
    width: "300px"
  },
  originalImg: {
    textAlign: "center"
  },
}));

const Content = ({
  classes,
  open,
  img,
  previewImg,
  originalDimensions,
  setOriginalDimensions,
  previewDimensions,
  setPreviewDimensions
}) => {
  const styles = useStyles();
  return (
    <main
      className={clsx(classes.content, {
        [classes.contentShift]: open,
      })}
    >
      <div className={classes.drawerHeader} />

      {img?.img?.length > 0 ? (
        <Grid container justify="center" alignItems="center" direction="column">
          <Typography variant="h6" align="center">Original image</Typography>
          <br/>
          <img src={img.pictures[0]} alt={'Loading'} className={originalDimensions.width > 300 ? styles.fixedWidthImg: styles.originalImg}
               onLoad={() => {
                var imgObj = new Image();
                imgObj.onload = function(){
                  setOriginalDimensions({height:this.height, width:this.width});
                };
                imgObj.src = img.pictures[0];                 
              }}
          />
          <br></br>
          <br></br>
          <Typography variant="h6" align="center">Transformed image</Typography>
          <br/>
          {!previewImg && <CircularProgress />}
          {previewImg && 
          <img src={previewImg || img.pictures[0]} alt={'Loading'} className={previewDimensions.width > 300 ? styles.fixedWidthImg: styles.originalImg}
               onLoad={() => {
                var imgObj = new Image();
                imgObj.onload = function(){
                  setPreviewDimensions({height:this.height, width:this.width});
                };
                imgObj.src = previewImg || img.pictures[0];                 
              }}
          />}
        </Grid>
      ) : (
        <Grid container justify="center" alignItems="center" direction="column">
          <br/>
          <Typography variant="h6">
            Please upload images in the sidebar menu.
          </Typography>
        </Grid>
      )}
    </main>
  );
};

export default Content;
