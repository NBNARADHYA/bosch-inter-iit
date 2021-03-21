import { Typography } from "@material-ui/core";
import React from "react";
import ReactImageMagnify from "react-image-magnify";

const MagnifyImage = () => {
  return (
    <div style={{ display: "flex" }}>
      <ReactImageMagnify
        {...{
          smallImage: {
            alt: "Wristwatch by Ted Baker London",
            isFluidWidth: false,
            width: 620,
            height: 500,
            src:
              "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
          },
          largeImage: {
            src:
              "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
            width: 1900,
            height: 1900,
          },
        }}
      />
      <div>
        <Typography
          variant="h3"
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
