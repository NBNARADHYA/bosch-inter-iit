import React from "react";
import ConfidenceClasses from "./ConfidenceClasses";
import WrongPredictions from "./WrongPredictions";

const Predictions = ({ top_5_classes, wrong_pred }) => {
  // console.log(response,response.top_5_classes,response.wrong_pred);
  return (
    <div>
      <ConfidenceClasses top_5_classes={top_5_classes} />
      <WrongPredictions wrong_pred={wrong_pred} />
    </div>
  );
};

export default Predictions;
