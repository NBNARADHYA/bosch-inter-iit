import React from "react"
import Typography from "@material-ui/core/Typography";

export default function Description() {
    return (
        <>
            <Typography variant="body1" paragraph>             
                Since the confusion matrix becomes difficult to interpret when analyzing
                a large number of classes, this feature allows the user to select any specific 
                class and visualise the number of images from other classes that got confused with this class.
            </Typography>
            <Typography variant="body1" paragraph>             
                Given a confusion matrix C of dimension [no of classes * no of classes], 
                the user selects a specific class S, and corresponding to S, the row S of
                matrix C is displayed as a bar graph. The frequencies are plotted on the y-axis while the classes on the X-axis.
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom><i>Post - Evaluation</i></Typography>
            <Typography variant="body1" paragraph style={{marginTop: "10px"}}>
                Based on the classes which are frequently getting confused with the selected class,
                the user can analyse the confused class images and make necessary changes to the training set. 
            </Typography>
        </>
    )
}