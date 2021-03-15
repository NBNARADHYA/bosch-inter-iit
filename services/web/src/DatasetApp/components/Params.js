import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import Minmax from "./Minmax";
import Single from "./Single";
import Bool from "./Bool";
import { changeCamelCaseToNormal, displayParameterName } from '../../Utils';

const isMinmax = (list) => {
  let found = false;
  list.forEach((item) => {
    if (item.indexOf("min") != -1 || item.indexOf("max") != -1) found = true;
  });

  return found;
};

const isTuple = (list) => {
  let found = false;
  list.forEach((item) => {
    if (item == "tuple") found = true;
  });

  return found;
};

const isBool = (list) => {
  let found = false;

  list.forEach((item) => {
    if (item.indexOf("bool") != -1 || item.indexOf("boolean") != -1)
      found = true;
  });

  return found;
};

const isSingle = (str) => {
  if (str.indexOf("float") != -1 || str.indexOf("int") != -1) return true;
  return false;
};

const stepSize = (str) => {
  let res = 1;
  if (str?.indexOf("float") != -1) res = 0.01;

  return res;
};

const Params = ({ classes, transformation, params, handleParamsChange }) => {
  //Parse parameters into array of objects
  let { parameters } = transformation;
  parameters = JSON.parse(parameters);

  //Map each argument to its component
  const args = parameters.map((arg,i) => {
    let { name, type, defaultVal } = arg;
    const displayName = displayParameterName(name);
    if (!type) return;

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
          handleParamsChange={handleParamsChange}
        />
      );
    }

    defaultVal = parseFloat(defaultVal);
    if (isMinmax(type)) {
      return (
        <Minmax
          classes={classes}
          step={step}
          name={name}
          displayName={displayName}
          isRange={false}
          defaultVal={defaultVal}
          params={params}
          handleParamsChange={handleParamsChange}
        />
      );
    }
    if (isTuple(type)) {
      return;
    }
    if (single) {
      return (
        <Single
          classes={classes}
          step={step}
          name={name}
          displayName={displayName}
          isRange={false}
          defaultVal={defaultVal}
          params={params}
          handleParamsChange={handleParamsChange}
        />
      );
    }
  });

  //Default component if no argument
  const def = (
    <Typography className={classes.spacing} gutterBottom>
      It has no parameters.
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
        <strong>Params of the {changeCamelCaseToNormal(transformation.name)}</strong>
      </Typography>
      {validArguments > 0 ? args : def}
    </Fragment>
  );
};

export default Params;
