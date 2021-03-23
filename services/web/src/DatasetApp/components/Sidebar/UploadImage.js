import React from "react";
import ImageUploader from "react-images-upload";

const UploadImage = ({ classes, img, handleImgChange }) => {
  const noOfImg = img?.img?.length;
  return (
    <div className={classes.spacingUploadButton} id="step1">
      <ImageUploader
        withIcon={true}
        buttonText={
          noOfImg > 0 ? `${noOfImg} images selected` : "Choose images"
        }
        withPreview={false}
        onChange={(files, pictures) => handleImgChange(files, pictures)}
        imgExtension={[".jpg", ".jpeg", ".png", ".ppm"]}
        maxFileSize={5242880 * 20}
        label="Upload images of a particular class"
      />
    </div>
  );
};

export default UploadImage;
