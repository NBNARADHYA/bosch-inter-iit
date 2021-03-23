import ConfusionMatrix from "./ConfusionMatrix";
import HeatMap from "./HeatMap";
import TestModel from "./TestModel";
import Predictions from "./Predictions";

export const tabs = [
  { name: "Predictions", component: (props) => <Predictions {...props} /> },
  { name: "Confusion Matrix", component: (props) => <ConfusionMatrix {...props} /> },
  { name: "Test Model", component: (props) => <TestModel {...props} /> },
  { name: "Generate Heat Map", component: (props) => <HeatMap {...props} /> },
];
