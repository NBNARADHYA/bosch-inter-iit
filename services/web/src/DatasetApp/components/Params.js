import React from "react";
import SliderComponent from "./SliderComponent";

const isMinmax = (list) => {
  list.forEach((item) => {
    if (item.indexOf("min") !== -1 && item.indexOf("max") !== -1) return -1;
  });
};

const isTuple = (list) => {
  list.forEach((item) => {
    if (item === "tuple") return true;
  });

  return false;
};

const isPair = (list) => {
  list.forEach((item) => {
    if (item[0] === "[") return true;
  });

  return false;
};

const stepSize = (str) => {
  let res = 1;
  if (str.indexOf("float") !== -1) res = 0.01;

  return res;
};

const Params = ({ classes, transformation, params, handleParamsChange }) => {
  let { parameters } = transformation;
  parameters = JSON.parse(parameters);
  const args = parameters.map((arg) => {
    let { type } = arg;
    if (!type) return;
    const step = stepSize(type);
    type = type.split("or").map((item) => item.trim());
    if (isMinmax(type)) {
      return <SliderComponent classes={classes} step={step} range={true} />;
    }
    if (isTuple(type)) {
      return <SliderComponent classes={classes} step={step} />;
    }
    if (isPair(type)) {
      return <SliderComponent classes={classes} step={step} />;
    }

    return <SliderComponent classes={classes} step={step} />;
  });
  console.log(args);
  return <div>{args}</div>;
};

export default Params;
