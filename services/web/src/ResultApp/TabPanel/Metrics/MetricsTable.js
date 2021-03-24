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
        description="Description of Confidence Class"
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
    </div>
  );
};

export default MetricsTable;
