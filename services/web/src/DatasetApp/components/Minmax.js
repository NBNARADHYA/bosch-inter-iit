import React from "react";
import { Typography, Slider } from "@material-ui/core";

const Minmax = ({ classes, name, step, defaultVal, handleParamsChange }) => {
  if (!defaultVal) defaultVal = [10, 20];
  else if (typeof defaultVal == "int")
    defaultVal = [defaultVal, defaultVal + 10];
  return (
    <div className={classes.spacing}>
      <Typography id="range-slider" gutterBottom>
        <strong>{name}</strong>
      </Typography>
      <Slider
        defaultValue={defaultVal}
        className={classes.slider}
        aria-labelledby="range-slider"
        step={step}
        // min={0}
        // max={1}
        onChangeCommitted={(e, val) => handleParamsChange(name, val)}
        valueLabelDisplay="auto"
      />
    </div>
  );
};

export default Minmax;
