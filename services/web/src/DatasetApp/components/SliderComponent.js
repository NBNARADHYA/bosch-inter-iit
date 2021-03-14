import React from "react";
import { Typography, Slider } from "@material-ui/core";

const SliderComponent = ({ classes, step, range }) => {
  return (
    <div className={classes.spacing}>
      <Typography id="range-slider" gutterBottom>
        Small steps
      </Typography>
      <Slider
        // defaultValue={0.00000005}
        defaultValue={[0, 0]}
        aria-labelledby="range-slider"
        step={step}
        // marks
        // min={-0.00000005}
        // max={0.0000001}
        // getAriaValueText={valuetext}
        valueLabelDisplay="auto"
      />
    </div>
  );
};

export default SliderComponent;
