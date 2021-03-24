import React from 'react';
import Typography from "@material-ui/core/Typography";

function AccuracyDescription() {
return <>
<Typography variant="subtitle2">
About the Feature :
</Typography>
<Typography variant="body2" paragraph>
This feature plots accuracy, in increasing order, against corresponding class.
</Typography>
<Typography variant="subtitle2">
Post-Evaluation :
</Typography>
<Typography variant="body2" paragraph>
This plot gives us the intuition on which class our model is not able to generalize i.e. giving the wrong result. Improving their performance will improve the overall metrics. This can be done by :
<ul>
  <li>identify general patterns by visual inspection in images of these classes, which is causing the failure.</li>
  <li>add more images of that class in training by surveying or by augmentation.</li>
  <li>penalizing misclassifying these classes in the loss function.</li>
</ul>
</Typography>
</>
}

export default AccuracyDescription;