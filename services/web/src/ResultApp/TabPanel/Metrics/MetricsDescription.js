import React from 'react';
import Typography from "@material-ui/core/Typography";
import { Grid } from '@material-ui/core';

function MetricsDescription() {
return <>
<Typography variant="subtitle2">
About the Feature :
</Typography>
<Typography variant="body2" paragraph>
<ul>
  <li>Accuracy score - It is the measure of all the correctly identified cases. It is most used when all the classes are equally important.</li>
  <li>Precision score - It is implied as the measure of the correctly identified positive cases from all the predicted positive cases. Thus, it is useful when the costs of False Positives is high</li>
  <li>Recall score - It is the measure of the correctly identified positive cases from all the actual positive cases. It is important when the cost of False Negatives is high.</li>
  <li>F1 Score - The F1 score can be interpreted as a weighted average of the precision and recall, where an F1 score reaches its best value at 1 and worst score at 0.</li>
</ul>
<Grid container justify="center">
<img alt="F1_score = 2 * (precision * recall) / (precision + recall)" src="/equations/e3.svg" height="45px" style={{textAlign: 'center'}}/>
</Grid>
In the multi-class case, F1 score can be
<ol>
  <li>’macro’  - Calculate F1 for each label, and find their unweighted mean. This does not take label imbalance into account.</li>
  <li>’weighted’ - Calculate F1 for each label, and find their average weighted by support</li>
</ol>
</Typography>
<Typography variant="subtitle2">
Post-Evaluation :
</Typography>
<Typography variant="body2" paragraph>
Accuracy score can be used when the class distribution is similar while F1-score is a better metric when there are imbalanced classes.<br/>
If F1-score is good it means that our model is robust and is able to handle imbalance in the dataset properly.
<br/>
<br/>
If train accuracy &gt;&gt; test accuracy, we get the intuition of our model getting overfitted.
To solve overfitting problems :
<ul>
  <li>we can decrease the depth of the model</li>
  <li>simply increase the dropout probability</li>
  <li>we can use the model with lesser parameters</li>
  <li>use regularization techniques</li>
</ul>
If train accuracy of the train dataset is not increasing we get the intuition of our model getting underfit. To solve the problem of underfitting :
<ul>
  <li>we can increase the depth of the model</li>
  <li>can train model for more epochs</li>
  <li>can remove noise from the images by applying</li>
</ul>
The Dataset may be imbalanced if F1 score is not as good as the accuracy. This can be handled by : 
<ul>
  <li>balancing the dataset by oversampling or undersampling the images.</li>
  <li>penalizing misclassifying class with less images in the loss function.</li>
</ul>
</Typography>
</>
}

export default MetricsDescription;