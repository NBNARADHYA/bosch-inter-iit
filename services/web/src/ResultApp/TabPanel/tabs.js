import ConfusionMatrix from "./ConfusionMatrix";
import HeatMap from "./HeatMap";
import PlotCurves from "./PlotCurves";
import Predictions from "./Predictions";
import TestModel from "./TestModel";
import Predictions from "./Predictions";
import PlotCurves from "./PlotCurves";

export const tabs = [
  { name: "Predictions", component: (props) => <Predictions {...props} /> },
<<<<<<< HEAD
  { name: "Confusion Matrix", component: (props) => <ConfusionMatrix {...props} /> },
  { name: "Test Model", component: (props) => <TestModel {...props} /> },
  { name: "Generate Heat Map", component: (props) => <HeatMap {...props} /> },
  { name: "Curves" ,component:(props) => <PlotCurves {...props} />}
=======
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
>>>>>>> 9737654a22f08dbaa08cd88250e22aede42cef1c
];
