import ConfidenceClasses from "./ConfidenceClasses"
import ConfusedClasses from "./ConfusedClasses"
import ConfusionMatrix from "./ConfusionMatrix"
import TestModel from "./TestModel"

export const tabs = [
    {
        name: "Confidence classes",
        component: () => <ConfidenceClasses />
    },
    {
        name: "Confused classes",
        component: () => <ConfusedClasses />
    },
    {
        name: "Confusion Matrix",
        component: () => <ConfusionMatrix />
    },
    {
        name: "Test Model",
        component: () => <TestModel />
    },
]