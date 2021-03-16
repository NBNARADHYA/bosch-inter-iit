import React from "react";
import { Typography, Slider } from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';

const Minmax = ({ classes, name, min, max, isFloat, description, tooltipStyles, displayName,  step, defaultVal, handleParamsChange }) => {
  let mn,mx;
  if(isFloat) {
    mn=0;
    mx=1;
    if(!defaultVal) {
      defaultVal="(0.2,0.3)";
    }
  } else{
    mn=0;
    mx=100;
    if(!defaultVal) {
      defaultVal="(10,20)";
    }
  }
  defaultVal = defaultVal.replace("(","[").replace(")","]");
  defaultVal = JSON.parse(defaultVal);
  if(defaultVal[0] >=0 && defaultVal[1] <1)
  {
    mn=0;
    mx=1; 
  } else if(defaultVal[0] >=-1 && defaultVal[1] <1)
  {
    mn=-1;
    mx=1;
  } else if(defaultVal[1] >100) {
    mn=0;
    mx=defaultVal[1];
  }
   else {
    mn=0;
    mx=100;
  }

  if(typeof min ==='number') {
    mn=min;
  }

  if(typeof max ==='number') {
    mx=max;
  }

  const marks = [{
    value: mn,
    label: mn.toString()
  },
  {
  value: mx,
  label: mx.toString()
}];

  return (
    <div className={classes.spacing}>
      <Tooltip title={description} placement="top" classes={tooltipStyles}>
        <Typography id="range-slider" gutterBottom>
          <strong>{displayName}</strong>
        </Typography>
      </Tooltip>
      <Slider
        key={name}
        defaultValue={defaultVal}
        className={classes.slider}
        aria-labelledby="range-slider"
        step={mx>100 && isFloat ? 0.1: step}
        min={mn}
        max={mx}
        marks={marks}
        onChangeCommitted={(e, val) => {
          const obj={ '__tuple__': true, 'items': val};
          handleParamsChange(name, obj);
        }}
        valueLabelDisplay="auto"
      />
    </div>
  );
};

export default Minmax;
