import ConfidenceClasses from "./ConfidenceClasses";
import ConfusedClasses from "./ConfusedClasses";
import ConfusionMatrix from "./ConfusionMatrix";
// import TestModel from "./TestModel";

export const tabs = [
  { name: "Confidence classes", component: (props) => <ConfidenceClasses {...props} /> },
  { name: "Confused classes", component: (props) => <ConfusedClasses {...props} /> },
  { name: "Confusion Matrix", component: (props) => <ConfusionMatrix {...props} /> },
  // { name: "Test Model", component: (props) => <TestModel {...props} /> },
];
