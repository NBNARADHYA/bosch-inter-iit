import ConfusionMatrix from "./ConfusionMatrix";
import TestModel from "./TestModel";
import PlotCurves from "./PlotCurves";
import Predictions from "./Predictions";

export const tabs = [
  { name: "Predictions", component: () => <Predictions /> },
  { name: "Confusion Matrix", component: () => <ConfusionMatrix /> },
  { name: "Test Model", component: () => <TestModel /> },
  { name: "Curves", component: () => <PlotCurves />},
];
