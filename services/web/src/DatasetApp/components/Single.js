import React from "react";
import { Typography, Slider } from "@material-ui/core";

const Single = ({ classes, name, step, defaultVal, handleParamsChange }) => {
  if (!defaultVal) defaultVal = 1;
  return (
    <div className={classes.spacing}>
      <Typography id="range-slider" gutterBottom>
        <strong>{name}</strong>
      </Typography>
      {name == "p" ? (
        <Slider
          defaultValue={0.5}
          className={classes.slider}
          aria-labelledby="range-slider"
          step={step}
          min={0}
          max={1}
          onChangeCommitted={(e, val) => handleParamsChange(name, val)}
          valueLabelDisplay="auto"
        />
      ) : (
        <Slider
          defaultValue={defaultVal}
          className={classes.slider}
          aria-labelledby="range-slider"
          step={step}
          min={0}
          max={100}
          onChangeCommitted={(e, val) => handleParamsChange(name, val)}
          valueLabelDisplay="auto"
        />
      )}
    </div>
  );
};

export default Single;
