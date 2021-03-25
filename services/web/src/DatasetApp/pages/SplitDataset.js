import {Button, Typography} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import UndoIcon from "@material-ui/icons/Undo";
import {Alert, AlertTitle} from "@material-ui/lab";
import {Bar} from "@reactchartjs/react-chart.js";
import React, {useCallback, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";

import classLabels from "../../Constants/classLabels";
import colours from "../../Constants/colours";
import serverUrl from "../../Constants/serverUrl";
import {downloadCSV} from "../../Utils";
import Navbar from "../components/Navbar";

const options = {
  scales : {
    yAxes : [
      {
        ticks : {
          beginAtZero : true,
        },
      },
    ],
  },
  maintainAspectRatio : false,
};

const useStyles = makeStyles((theme) => ({
                               backdrop : {
                                 zIndex : theme.zIndex.drawer + 1,
                                 color : "#fff",
                               },
                             }));

function SplitDataset(props) {
  let classes = useStyles();
  const {theme} = props;
  classes = {...classes, ...props.classes};
  const history = useHistory();

  const [beforeCountData, setBeforeCountData] = useState({
    x : [],
    y : [],
    colors : [],
  });
  const [afterCountData, setAfterCountData] = useState({
    train_x : [],
    train_y : [],
    val_x : [],
    val_y : [],
  });
  const [invalidSplitPercentage, setInvalidSplitPercentage] = useState(false);

  useEffect(() => {
    fetch(`${serverUrl}class_counts`)
        .then((res) => res.json())
        .then((res) => {
          setBeforeCountData(() => {
            const newCountData = {};
            newCountData.x = Object.keys(res.class_counts)
                                 .map((label) => classLabels[label]);
            newCountData.y = Object.values(res.class_counts)
                                 .map(({counts}) => parseInt(counts));
            newCountData.colors =
                newCountData.x.map((t, i) => colours[i % colours.length]);
            return newCountData;
          });
          setBeforeLoaded(true);
        })
        .catch(console.error);
  }, []);

  const beforeData = {
    labels : beforeCountData.x,
    datasets : [
      {
        label : "Frequency",
        data : beforeCountData.y,
        backgroundColor : beforeCountData.colors,
      },
    ],
  };

  const afterData = {
    labels : afterCountData.train_x,
    datasets : [
      {
        label : "Traing Dataset Size",
        data : afterCountData.train_y,
        backgroundColor : colours[0],
      },
      {
        label : "Validation Dataset Size",
        data : afterCountData.val_y,
        backgroundColor : colours[7],
      },
    ],
  };

  const [beforeLoaded, setBeforeLoaded] = useState(false);
  const afterLoaded =
      Boolean(afterCountData.train_x.length && afterCountData.val_x.length);

  const [loading, setLoading] = useState(!beforeLoaded);
  const [open, setOpen] = useState(false);

  const [splitPercentage, setSplitPercentage] = useState(null);

  const handleClickOpen = useCallback(() => { setOpen(true); }, []);

  const handleClose = useCallback(() => { setOpen(false); }, []);

  useEffect(() => { setLoading(!beforeLoaded); }, [ beforeLoaded ]);

  useEffect(() => {
    if (!splitPercentage)
      return;
    const isInvalid = beforeCountData.y.some((val) => val < 2);
    setInvalidSplitPercentage(isInvalid);
  }, [ splitPercentage, beforeCountData.y ]);

  if (!beforeLoaded) {
    return (
      <>
        <Navbar classes={classes} open={false} theme={
      theme} />
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color="inherit" />
          &nbsp; &nbsp;
          <Typography variant="h6" color="inherit">
            Loading dataset
          </Typography>
        </Backdrop>
      </>
    );
  } else if (!beforeCountData.x.length || !beforeCountData.y.length) {
    return (
      <>
        <Navbar classes={classes} open={false} theme={theme} />
        <Grid
    container
    className = {classes.contentShift} justify = "center"
    direction = "column"
    alignItems = "center"
    spacing =
        {1} >
        <div className = { classes.drawerHeader } />
          <br /><br />
        <br /><Typography align = "center" variant = "h6">Please upload some
            images to the dataset first.</Typography>
        </Grid>
        </>
    );
  }

  return (
    <>
      <Navbar classes={classes} open={false} theme={theme} /><
        Grid
    container
    className = {classes.contentShift} justify = "center"
    direction = "column"
    alignItems = "center"
    spacing =
        {1} >
        <div className =
         {
           classes.drawerHeader
         } />
        <Alert
          severity="info"
          style={{
            width: "900px",
            padding: "30px",
            marginTop: "30px",
          }}
        >
          <AlertTitle>Split Dataset</AlertTitle>
            This tool assists you to split the dataset into train and test
                sets.A
          stratified split would be created maintaining the class-wise ratio in
          both train and test sets.
          <br />
          <br />
          <em>
            Click on ‘Split Dataset’ and select the split ratio for division.
          </em>
          <br />
          <br /> Splitting is useful for estimating the performance of machine
          learning algorithms when used to make predictions on unseen data.It is
              a fast and easy procedure to perform,
              the results of which allow
          you to compare the performance of machine learning algorithms for your
          predictive modeling problem.<
              /Alert>
        <Grid
          item
          container
          justify="center"
          direction="column"
          alignItems="center"
          spacing={1}
        >
          <Grid item>
            <br />
              <Typography align = "center" variant = "h5" color = "primary">{
                  afterLoaded
                      ? "Before splitting"
                      : "Current class counts"}</Typography>
          </Grid>
              <br /><Grid item>< Bar
              data={beforeData}
              options={options}
              width={1400}
              height={
      400}
            />
          </Grid>
          <br />
          {!afterLoaded && (
            <Grid item>
              <Button
              variant = "contained"
              color = "primary"
                onClick={handleClickOpen}
                disabled={loading}
              >
                Split the dataset
              </Button>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Split the Dataset</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    To split the dataset, enter the split % (Percentage of
                    validation samples) (Optional)
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Split %"
                    fullWidth
                    error={invalidSplitPercentage}
                    onChange={(e) => setSplitPercentage(e.target.value / 100.0)}
                    helperText={
      invalidSplitPercentage
          ? "The minimum number of groups for any class cannot be less than 2."
          : ""
                    }
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button
                    disabled={loading || invalidSplitPercentage}
                    color="primary"
                    onClick={() => {
                      setLoading(true);
                      setOpen(false);
                      let data = new FormData();
                      data.append("split_percentage", splitPercentage);
                      fetch(`${serverUrl}split_dataset`, {
                        method: "POST",
                        body: data,
                      })
                        .then((res) => res.json())
                        .then((res) => {
                          downloadCSV(res.csv.train, "train.csv");
                          downloadCSV(res.csv.val, "val.csv");
                          setAfterCountData(() => {
                            const newCountData = {};
                            newCountData.train_x = Object.keys(
                              res.class_counts.train
                            ).map((label) => classLabels[label]);
                            newCountData.train_y = Object.values(
                              res.class_counts.train
                            ).map(({ counts }) => parseInt(counts));
                            newCountData.val_x = Object.keys(
                              res.class_counts.val
                            ).map((label) => classLabels[label]);
                            newCountData.val_y = Object.values(
                              res.class_counts.val
                            ).map(({ counts }) => parseInt(counts));
                            return newCountData;
                          });
                          setLoading(false);
                        })
                        .catch(console.error);
                    }}
                  >
                    Split
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          )}
          {afterLoaded && (
            <>
              <Grid item>
                <br />
                <Typography align="center" variant="h5" color="primary">
                  After splitting
                </Typography>
              </Grid>
              <br />
              <Grid item>
                <Bar
                data = {afterData} options = {options} width = {1400} height =
                { 400 } />
              </Grid > <br />< Button
                variant = "contained"
                color = "primary"
                onClick={
      () => { history.push("/split/"); }}
                startIcon={<UndoIcon />}
              >
                Undo
              </Button>
            </>
          )
  }
  </Grid>
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />&
      nbsp;
  &nbsp;
          <Typography variant="h6" color="inherit">
            Splitting dataset into training and validation
          </Typography>
        </Backdrop>
      </Grid>
    </>
  );
}

export default SplitDataset;
