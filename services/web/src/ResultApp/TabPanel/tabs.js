import ConfusionMatrix from "./ConfusionMatrix";
import HeatMap from "./HeatMap";
import PlotCurves from "./PlotCurves";
import Predictions from "./Predictions";
import TestModel from "./TestModel";
import Metrics from './Metrics';

export const tabs = [
  { name: "Metrics", component: (props) => <Metrics {...props} /> },  
  { name: "Predictions", component: (props) => <Predictions {...props} /> },
  {
    name: "Confusion Matrix",
    component: (props) => <ConfusionMatrix {...props} />,
  },
  { name: "Test Model", component: (props) => <TestModel {...props} /> },
  { name: "Generate Heat Map", component: (props) => <HeatMap {...props} /> },
  {
    name: "Curves",
    component: (props) => <PlotCurves {...props} />,
  },
];
