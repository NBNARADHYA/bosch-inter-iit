import React from 'react'
import ConfidenceClasses from './ConfidenceClasses'
import WrongPredictions from './WrongPredictions'

const Predictions = () => {
  return (
    <div>
      <ConfidenceClasses />
      <WrongPredictions />
    </div>
  )
}

export default Predictions
