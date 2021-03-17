import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import Minmax from "./Minmax";
import Single from "./Single";
import Bool from "./Bool";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { displayParameterName } from '../../../Utils';

const useStyles = makeStyles(() => createStyles({
  tooltipPlacementTop: {
      margin: '4px 2px',
  }
}));

const isMinmax = (list) => {
  return list.some((item) => item.indexOf("min") !== -1 || item.indexOf("max") !== -1);
};

const isFloatPair = (list) => {
  return list.some((item) => item.indexOf("[float, float]") !== -1 );
};

const isIntPair = (list) => {
  return list.some((item) => item.indexOf("[int, int]") !== -1);
};

const isBool = (list) => {
  return list.some((item) => item.indexOf("bool") !== -1 || item.indexOf("boolean") !== -1);
};

const isSingle = (str) => {
  return str.indexOf("float") !== -1 || str.indexOf("int") !== -1;
};

const stepSize = (str) => {
  let res = 1;
  if (str?.indexOf("float") !== -1) res = 0.01;
  return res;
};

const Params = ({ classes, transformation, params, handleParamsChange, imgDimensions }) => {
  //Parse parameters into array of objects
  let { parameters } = transformation;
  parameters = JSON.parse(parameters);
  const tooltipStyles = useStyles();

  //Map each argument to its component
  const args = parameters.map((arg,i) => {
    let { name, type, defaultVal, min, max, description } = arg;
    const displayName = displayParameterName(name);
    if (!type) return null;

    //Get step size of the slider based upon whether the arg is int or float
    const step = stepSize(type);
    const single = isSingle(type);

    type = type.split("or").map((item) => item.trim().toLowerCase());
     if (isBool(type)) {
      return (
        <Bool
          key={i.toString()}
          classes={classes}
          name={name}
          displayName={displayName}
          defaultVal={defaultVal}
          description={description}          
          handleParamsChange={handleParamsChange}
          tooltipStyles={tooltipStyles}
        />
      );
    }
    if ((isMinmax(type) || isFloatPair(type) || isIntPair(type)) && isNaN(Number(defaultVal))) {
      return <Minmax
              key={i.toString()}        
              classes={classes}
              step={step}
              name={name}
              displayName={displayName}
              isFloat={isFloatPair(type)}
              defaultVal={defaultVal}
              params={params}
              description={description}              
              handleParamsChange={handleParamsChange}
              min={min}
              max={max}
              tooltipStyles={tooltipStyles}     
              imgDimensions={imgDimensions}              
            />;
    }
    defaultVal = parseFloat(defaultVal);    
    if (single && name.indexOf("ignore") === -1) {
      return (
        <Single
          key={i.toString()}        
          classes={classes}
          step={step}
          name={name}
          displayName={displayName}
          isRange={false}
          defaultVal={defaultVal}
          params={params}
          min={min}
          max={max}          
          description={description}
          handleParamsChange={handleParamsChange}
          tooltipStyles={tooltipStyles}     
          imgDimensions={imgDimensions}     
        />
      );
    }    
    else  
      return null;
  });

  //Default component if no argument
  const def = (
    <Typography className={classes.spacing} gutterBottom>
      No parameters required.
    </Typography>
  );

  //Count the number of valid arguments
  let validArguments = 0;
  args.forEach((arg) => {
    if (arg) validArguments++;
  });
  return (
    <Fragment>
      <Typography variant="h6" component="h6" className={classes.spacing}>
        <strong>Parameters</strong>
      </Typography>
      {validArguments > 0 ? args : def}
    </Fragment>
  );
};

export default Params;
