import React from 'react';
import Typography from "@material-ui/core/Typography";
import { Grid } from '@material-ui/core';

function PlotDescription() {
return <>
<Typography variant="h6">Precision Recall Curves</Typography>
<Typography variant="subtitle2">
About the Feature :
</Typography>
<Typography variant="body2" paragraph>
Precision and Recall Curve: This function plots the Precision and Recall of the model at various thresholds for a chosen class. <br/>
Precision Vs Recall Curve: This function plots Precision versus Recall of the model calculated at different thresholds for a chosen class. 
</Typography>
<Typography variant="subtitle2">
Post-Evaluation :
</Typography>
<Typography variant="body2" paragraph>
A high area under the Precision vs Recall curve represents both high recall and high precision. High scores for both show that the classifier is returning accurate results (high precision), as well as returning a majority of all positive results (high recall).
<ul>
  <li>A system with high recall but low precision returns many results, but most of its predicted labels are incorrect when compared to the training labels. </li>
  <li>A system with high precision but low recall is just the opposite, returning very few results, but most of its predicted labels are correct when compared to the training labels.</li>
  <li>An ideal system with high precision and high recall will return many results, with all results labeled correctly.</li>
</ul>
Sometimes a visual inspection can identify patterns that you can then correct by adding more training data or modifying existing training data. For example, a classifier for apples vs limes may incorrectly label all green apples as limes. You can then correct this problem by adding and providing training data containing tagged images of green apples
</Typography>
<br/>
<Typography variant="h6">ROC Curve</Typography>
<Typography variant="subtitle2">
About the Feature :
</Typography>
<Typography variant="body2" paragraph>
This function plots the True Positive rate Vs False Positive Rate of the model for various thresholds for a chosen class.<br/>
True Positive Rate (Sensitivity) describes how good the model is at predicting the positive class when the actual outcome is positive.<br/>
<Grid container justify="center">
<img alt="True Positive Rate = True Positives / (True Positives + False Negatives)" src="/equations/e1.png" height="60px" style={{textAlign: 'center'}}/>
</Grid>
False Positive Rate (1 - Specificity) summarizes how often a positive class is predicted when the actual outcome is negative.
<Grid container justify="center">
<img alt="False Positive Rate = False Positives / (False Positives + True Negatives)" src="/equations/e2.png" height="60px"/>
</Grid>
</Typography>
<Typography variant="subtitle2">
Post-Evaluation :
</Typography>
<Typography variant="body2" paragraph>
It helps us to assess the discriminative capability of the model independent of the classification threshold. The worst case possibility is when the curve is along the diagonal from 0 to 1 which occurs when the model classifies all samples into either class with equal probability (complete confusion). The best case scenario is when the TPR is 1 for all values of FPR which gives the maximum area under the curve.
</Typography>
</>
}

export default PlotDescription;