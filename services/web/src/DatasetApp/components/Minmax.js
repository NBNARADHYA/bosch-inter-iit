import React from "react";
import { Typography, Slider } from "@material-ui/core";

const Minmax = ({ classes, name, displayName,  step, defaultVal, handleParamsChange }) => {
  if (!defaultVal) defaultVal = [10, 20];
  else if (typeof defaultVal === "number")
    defaultVal = [defaultVal, defaultVal + 10];
  return (
    <div className={classes.spacing}>
      <Typography id="range-slider" gutterBottom>
        <strong>{displayName}</strong>
      </Typography>
      <Slider
        key={name}
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
