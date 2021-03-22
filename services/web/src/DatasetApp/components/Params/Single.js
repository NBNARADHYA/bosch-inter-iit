import React from "react";
import { Typography, Slider } from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';

const Single = ({
  classes,
  name,
  displayName,
  step,
  description,
  defaultVal,
  tooltipStyles,
  min,
  max,
  handleParamsChange,
  imgDimensions
 }) => {
  const { height, width } = imgDimensions;
  if (!defaultVal || isNaN(Number(defaultVal)) ) defaultVal = 1;
  let mn,mx;
  if(typeof min ==='number')
    mn=min;
  if(typeof max ==='number')
    mx=max;
  else if(max==='h')
  {
    mx=height||100;
  }
  else if(max==='w')
  {
    mx=width||100;
  }
  else if(defaultVal >=0 && defaultVal <1)
  {
    mn=0;
    mx=1; 
  } else if(defaultVal >=-1 && defaultVal <1)
  {
    mn=-1;
    mx=1;
  } else if(defaultVal>100) {
    mn=0;
    mx=defaultVal;
  }  else {
    mn=0;
    mx=100;
  }
  if(name==="width" || name==="x_max")
  {
    defaultVal=imgDimensions.width||100;
  }
  if(name==="height"|| name==="y_max")
  {
    defaultVal=imgDimensions.height||100;
  }  
  return (
    <div className={classes.spacing}>
      <Tooltip title={description} placement="top" classes={tooltipStyles}>
        <Typography id="range-slider" gutterBottom>
          <strong>{displayName}</strong>
        </Typography>
      </Tooltip>      
      {name === "p" ? (
        <Slider
          defaultValue={1}
          className={classes.slider}
          aria-labelledby="range-slider"
          step={step}
          min={0}
          max={1}
          marks={[{
            value: 0,
            label: "0"
          },
          {
          value: 1,
          label: "1"
        }]}
          onChangeCommitted={(e, val) => handleParamsChange(name, val)}
          valueLabelDisplay="auto"
        />
      ) : (
        <Slider
          key={name}        
          defaultValue={defaultVal}
          className={classes.slider}
          aria-labelledby="range-slider"
          step={mx>100 && step<=0.1 ? 0.1: step}
          min={mn}
          max={mx}
          marks={[{
            value: mn,
            label: mn.toString()
          },
          {
          value: mx,
          label: mx.toString()
        }]}          
          onChangeCommitted={(e, val) => handleParamsChange(name, val)}
          valueLabelDisplay="auto"
        />
      )}
    </div>
  );
};

export default Single;
