import React from 'react';
import Typography from "@material-ui/core/Typography";

function DescriptionContent() {
return <>
<Typography variant="subtitle2">
About the Feature :
</Typography>
<Typography variant="body2" paragraph>
Lists out all the top 5 classes that have been predicted with the highest confidence.<br/>
For each example, the model outputs a series of numbers called the confidence that communicates how strongly it associates each label with that example. If the number is high, the model has high confidence that the label should be applied to that example.
</Typography>
<Typography variant="subtitle2">
Post-Evaluation :
</Typography>
<Typography variant="body2" paragraph>
This helps identify class similarities, adversarial attacks and other possible reasons for having high confidence in a prediction.
</Typography>
</>
}

export default DescriptionContent;