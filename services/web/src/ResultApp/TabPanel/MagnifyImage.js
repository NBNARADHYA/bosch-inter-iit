<<<<<<< HEAD:services/web/src/ResultApp/TabPanel/MagnifyImage.js
import { Typography,  makeStyles } from "@material-ui/core";
import React from "react";
import ReactImageMagnify from "react-image-magnify";


const useStyles = makeStyles(() => ({
  center:{
    display:"flex",
    justifyContent:"center",
    alignItems: "center",
    margin: "auto",
  }
}));

const MagnifyImage = ({url}) => {
  const classes = useStyles();
  return (
    <div style={{ display: "flex", margin:"20px" }}>
=======
import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import ReactImageMagnify from "react-image-magnify";

const useStyles = makeStyles(() => ({
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
  },
}));

const MagnifyImage = ({ url }) => {
  const classes = useStyles();
  return (
    <div style={{ display: "flex", margin: "20px" }}>
>>>>>>> 9737654a22f08dbaa08cd88250e22aede42cef1c:services/web/src/ResultApp/TabPanel/ConfusionMatrix/MagnifyImage.js
      <ReactImageMagnify
        {...{
          smallImage: {
            alt: "Wristwatch by Ted Baker London",
            isFluidWidth: false,
            width: 590,
            height: 500,
            src: `${url}`,
          },
          largeImage: {
            src: `${url}`,
            width: 2600,
            height: 2600,
          },
        }}
      />
      <div className={classes.center}>
        <Typography
          variant="h6"
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            padding: "20px",
          }}
        >
          Hover on the image to magnify it.
        </Typography>
      </div>
    </div>
  );
};

export default MagnifyImage;
