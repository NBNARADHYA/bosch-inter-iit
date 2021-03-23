<<<<<<< HEAD
import React from 'react'
import ConfidenceClasses from './ConfidenceClasses'
import WrongPredictions from './WrongPredictions'

const Predictions = ({top_5_classes, wrong_pred}) => {
=======
import React from "react";
import ConfidenceClasses from "./ConfidenceClasses";
import WrongPredictions from "./WrongPredictions";

const Predictions = ({ top_5_classes, wrong_pred }) => {
>>>>>>> 9737654a22f08dbaa08cd88250e22aede42cef1c
  // console.log(response,response.top_5_classes,response.wrong_pred);
  return (
    <div>
      <ConfidenceClasses top_5_classes={top_5_classes} />
<<<<<<< HEAD
      <WrongPredictions wrong_pred={wrong_pred}/>
    </div>
  )
}

export default Predictions
=======
      <WrongPredictions wrong_pred={wrong_pred} />
    </div>
  );
};

export default Predictions;
>>>>>>> 9737654a22f08dbaa08cd88250e22aede42cef1c
