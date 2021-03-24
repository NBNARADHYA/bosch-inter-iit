import { IconButton } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InfoButton from "@material-ui/icons/InfoOutlined";
import React, { useState } from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DescriptionBox from "../DescriptionBox";
import MetricsDescription from "./MetricsDescription";
import SuggestionBox from "../SuggestionBox";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  table: {
    maxWidth: 600,
  }  
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const MetricsTable = ({ train_metrics, test_metrics }) => {
  const classes = useStyles();
  const [descriptionBox, setDescriptionBox] = useState(false);
  const handleDescriptionOpen = () => setDescriptionBox(true);
  const handleDescriptionClose = () => setDescriptionBox(false);
  const rows = [
    {'metric': 'Macro F1 Score', 'train': train_metrics["macro_f1_score"], 'test': test_metrics["macro_f1_score"]},
    {'metric': 'Weighted F1 Score', 'train': train_metrics["weighted_f1_score"], 'test': test_metrics["weighted_f1_score"]},  
    {'metric': 'Accuracy Score', 'train': train_metrics["accuracy_score"], 'test': test_metrics["accuracy_score"]},
    {'metric': 'Precision Score', 'train': train_metrics["precision_score"], 'test': test_metrics["precision_score"]},
    {'metric': 'Recall Score', 'train': train_metrics["recall_score"], 'test': test_metrics["recall_score"]}
  ]
  const overfit = train_metrics["accuracy_score"] - test_metrics["accuracy_score"] > 0.05
  const imbalance = test_metrics["accuracy_score"] - test_metrics["macro_f1_score"] > 0.1
  return (
    <div>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Evaluation Metrics
          </Typography>
          <IconButton color="inherit" onClick={handleDescriptionOpen}>
            <InfoButton />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DescriptionBox
        descriptionBox={descriptionBox}
        handleDescriptionClose={handleDescriptionClose}
        title="Evaluation Metrics"
        children={<MetricsDescription/>}
      />
      <br/>
      <TableContainer align="center">
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Metrics</StyledTableCell>
              <StyledTableCell align="right">Train</StyledTableCell>
              <StyledTableCell align="right">Test</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(({metric, train, test}) => (
              <StyledTableRow key={metric}>
                <StyledTableCell component="th" scope="row">
                  {metric}
                </StyledTableCell>
                <StyledTableCell align="right">{train}</StyledTableCell>
                <StyledTableCell align="right">{test}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br/>
      {overfit && !imbalance && <SuggestionBox title="Suggestion">
      It looks like your network is overfitting the dataset as test accuracy is not as good as train accuracy. It can be made right by -
      <br/>
      <ul>
        <li>Reducing the model complexity</li>
        <li>Training with more data</li>
        <li>Early stopping</li>
        <li>Regularization</li>
      </ul>
      </SuggestionBox>}
      { !overfit && imbalance && <SuggestionBox title="Suggestion">
      The Dataset may be imbalanced as F1 score is not as good as the accuracy. You can :
      <ul>
        <li>balance the dataset by oversampling or undersampling the images.</li>
        <li>penalizing misclassifying class with less images in the loss function.</li>
      </ul>
      </SuggestionBox>}      
      {overfit && imbalance && <SuggestionBox title="Suggestions">
      <ol>
      <li>It looks like your network is overfitting the dataset as test accuracy is not as good as train accuracy. It can be made right by :
      <br/>
      <ul>
        <li>reducing the model complexity</li>
        <li>training with more data</li>
        <li>early Stopping</li>
        <li>regularization</li>
      </ul>        
      </li>
      <br/>
      <li>The Dataset may be imbalanced as F1 score is not as good as the accuracy. You can :
      <ul>
        <li>balance the dataset by oversampling or undersampling the images.</li>
        <li>penalizing misclassifying class with less images in the loss function.</li>
      </ul>
      </li>
      </ol>
      </SuggestionBox>}
    </div>
  );
};

export default MetricsTable;
