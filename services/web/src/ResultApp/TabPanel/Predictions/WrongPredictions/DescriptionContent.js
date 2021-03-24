import React from 'react';
import Typography from "@material-ui/core/Typography";

function DescriptionContent() {
return <>
<Typography variant="subtitle2">
About the Feature :
</Typography>
<Typography variant="body2" paragraph>
Lists out all the images in the dataset that have been wrongly classified.
</Typography>
<Typography variant="subtitle2">
Post-Evaluation :
</Typography>
<Typography variant="body2" paragraph>
This can be an effective visual tool for the data scientist for pointing out the reasons behind the images being classified wrongly due to unrepresentative data samples like :
<ul>
  <li>Unseen augmentation</li>
  <li>‘New’ images of the class not present in the training set</li>
  <li>Adversarial attacks</li>
</ul>
Sometimes a visual inspection can identify patterns that you can then correct by adding more training data or modifying existing training data. For example, a classifier for apples vs limes may incorrectly label all green apples as limes. You can then correct this problem by adding and providing training data containing tagged images of green apples
</Typography>
</>
}

export default DescriptionContent;