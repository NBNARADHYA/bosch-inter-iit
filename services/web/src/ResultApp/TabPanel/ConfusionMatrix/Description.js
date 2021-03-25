import React from "react"
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default function Description() {
    return (
        <>
            <Typography variant="body2" paragraph>
                A Confusion matrix is plotted which is an N x N matrix where N is the number of target classes. 
                The matrix compares the actual target values with those predicted by the machine learning model.
            </Typography>
            <Typography variant="subtitle2" gutterBottom>Why do we need it ?</Typography>
            <Typography variant="body2" paragraph>
                It is required for an imbalanced dataset. 
            </Typography>
            <Typography variant="body2" paragraph>
                As for binary classification, our confusion matrix will be a 2x2 matrix.&nbsp;
                <Typography variant="body2"><i>It can be shown as  -</i></Typography> 
            </Typography>
            <Grid container direction="row" justify="space-between">
                <Grid item><img src="/descriptions/confusionMatrix/matrixImg.png" alt="Confusion Matrix" /></Grid>
                <Grid item>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    TP - True positive
                                </TableCell>
                                <TableCell align="right">
                                    The actual value was positive, and the model predicted a positive value
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    FP -  False Positive
                                </TableCell>
                                <TableCell align="right">
                                    The actual value was negative, but the model predicted a positive value
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    FN - False Negative
                                </TableCell>
                                <TableCell align="right">
                                    The actual value was positive, but the model predicted a negative value
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    TN - True Negative
                                </TableCell>
                                <TableCell align="right">
                                    The actual value was negative, and the model predicted a negative value
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    </TableContainer>
                </Grid>
            </Grid>
            <Typography variant="body2" paragraph style={{marginTop: "10px"}}>
                Let us consider a medical dataset where there are 947 data points for the negative class and 
                3 data points for the positive class. This is how we will calculate the accuracy :
            </Typography>
            <Grid container justify="center">
                <img src="/descriptions/confusionMatrix/accuracy.png" alt="Accuracy1" />
            </Grid>
            <Typography variant="body2" paragraph style={{marginTop: "10px"}}>
                The total outcome values are:
                TP = 30, TN = 930, FP = 30 and FN = 10. So, the accuracy of our model turns out to be:
            </Typography>
            <Grid container direction="row" justify="center">
                <Grid item><img src="/descriptions/confusionMatrix/accuracy1.png" alt="Accuracy2" /></Grid>
                <Grid item><br /><i>&nbsp;&nbsp;&nbsp;<b>96%! Not bad!</b></i></Grid>
            </Grid>
            <Typography variant="body2" paragraph style={{marginTop: "10px"}}>
                But it is giving the wrong idea about the result. Think about it.
                Our model is saying, “I can predict sick people 96% of the time”. However, it is doing the opposite. 
                It is predicting the people who will not get sick with 96% accuracy while the sick are spreading the virus!
                The same applies to multi-class classification. 
            </Typography>
            <Typography variant="subtitle2" gutterBottom>Post - Evaluation</Typography>
            <Typography variant="body2" paragraph style={{marginTop: "10px"}}>
                This gives us a holistic view of how well our classification model is performing 
                and what kinds of errors it is making. It is a visual way to inspect the performance of a classification model. 
                Metrics such as accuracy can be inadequate in cases where there are large class imbalances in the data, 
                a problem common in machine learning applications. 
            </Typography>
        </>
    )
}