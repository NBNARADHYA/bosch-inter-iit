import React from 'react'
import ConfidenceClasses from './ConfidenceClasses'
import WrongPredictions from './WrongPredictions'

const Predictions = ({response}) => {
  // console.log(response,response.top_5_classes,response.wrong_pred);
  return (
    <div>
      <ConfidenceClasses top_5_classes={response.top_5_classes} />
      <WrongPredictions wrong_pred={response.wrong_pred}/>
    </div>
  )
}

export default Predictions
