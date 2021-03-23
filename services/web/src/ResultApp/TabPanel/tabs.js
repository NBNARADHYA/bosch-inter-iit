import ConfusionMatrix from "./ConfusionMatrix";
import TestModel from "./TestModel";
import PlotCurves from "./PlotCurves";
import Predictions from "./Predictions";

export const getTabs = (props) => {
  return (
    [
      { name: "Predictions", component: () => <Predictions response={props} /> },
      { name: "Confusion Matrix", component: () => <ConfusionMatrix response = {props}/> },
      { name: "Test Model", component: () => <TestModel response={props} /> },
      { name: "Curves", component: () => <PlotCurves response={props}/>},
    ]
  )
}
