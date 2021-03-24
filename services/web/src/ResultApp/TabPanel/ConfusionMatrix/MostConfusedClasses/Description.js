import React from "react"
import Typography from "@material-ui/core/Typography";

export default function Description() {
    return (
        <>
            <Typography variant="body2" paragraph>
                It gives the k most confused pairs of classes and the percentage of samples of class A 
                that are misclassified as class B. <i>for e.g. - " 33.33% images of class A are classified as class B "</i>.
            </Typography>
            <Typography variant="subtitle2" gutterBottom>Post - Evaluation</Typography>
            <Typography variant="body2" paragraph style={{marginTop: "10px"}}>
                Pairs of classes can be spotted in the confusion matrix where high numbers of samples 
                of class A are being classified as that of class B. Higher the number of misclassified 
                samples means that model is considering Class A as Class B.
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
                    For the pairs where this problem is severe, the following can be done to improve the metrics :
            </Typography>
            <Typography variant="body2" paragraph style={{marginTop: "10px"}}>
                <ul>
                    <li>Increasing number of training Image of Class A by surveying or by augmentation.</li>
                    <li>Penalizing misclassifying class A image in the loss function.</li>
                    <li>Using test-time augmentations.</li>
                </ul>
            </Typography> 
        </>
    )
}