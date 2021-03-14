import React from "react";
import ImageUploader from "react-images-upload";

const UploadImage = ({ classes, img, handleImgChange }) => {
  const noOfImg = img?.img?.length;
  return (
    <div className={classes.spacing}>
      <ImageUploader
        withIcon={true}
        buttonText={
          noOfImg > 0 ? `${noOfImg} images selected` : "Choose images"
        }
        withPreview={true}
        onChange={(files, pictures) => handleImgChange(files, pictures)}
      />
    </div>
  );
};

export default UploadImage;
