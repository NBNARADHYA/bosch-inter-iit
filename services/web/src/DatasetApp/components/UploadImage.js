import React from "react";
import Button from "@material-ui/core/Button";

const UploadImage = ({ classes }) => {
  return (
    <div className={classes.spacing}>
      <input
        accept="image/*"
        className={classes.input}
        style={{ display: "none" }}
        id="raised-button-file"
        multiple
        type="file"
      />
      <label htmlFor="raised-button-file">
        <Button variant="raised" component="span" className={classes.button}>
          Upload
        </Button>
      </label>
    </div>
  );
};

export default UploadImage;
