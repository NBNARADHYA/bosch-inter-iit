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

function BalanceDataset(props) {
  const {theme} = props;
  const history = useHistory();
  const [balancedImgPaths, setBalancedImgPaths] = useState([]);
  let classes = useStyles();
  classes = {...classes, ...props.classes};

  const [beforeCountData, setBeforeCountData] = useState({
    x : [],
    y : [],
    colors : [],
  });
  const [afterCountData, setAfterCountData] = useState({
    x : [],
    y : [],
    colors : [],
  });
  const [undoLoading, setUndoLoading] = useState(false);

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
    labels : afterCountData.x,
    datasets : [
      {
        label : "Frequency",
        data : afterCountData.y,
        backgroundColor : afterCountData.colors,
      },
    ],
  };

  const [beforeLoaded, setBeforeLoaded] = useState(false);
  const afterLoaded =
      Boolean(afterCountData.x.length && afterCountData.y.length);

  const [loading, setLoading] = useState(!beforeLoaded);
  const [open, setOpen] = useState(false);

  const [minSamples, setMinSamples] = useState(null);

  const handleClickOpen = useCallback(() => { setOpen(true); }, []);

  const handleClose = useCallback(() => { setOpen(false); }, []);

  useEffect(() => { setLoading(!beforeLoaded); }, [ beforeLoaded ]);

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
          <AlertTitle>Balance Dataset</AlertTitle>
            This tool balances the dataset.It achieves this by oversampling the
    examples from the minority class by applying a set of transformations
    to the images
        .<br /><br /><em>Click on ‘Balance the Dataset’ and input the minimum
            number of samples that
                a class should have.</em>
          <br />
        <br />For every class.where the number of samples are less than the
    provided threshold, the tool upsample that class images by applying a
    set of transformations.<
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
            afterLoaded ? "Before balancing"
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
              onClick = {handleClickOpen} disabled =
                  {loading} >
                  Balance the dataset<
                      /Button>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Balance the Dataset</DialogTitle>
                  <DialogContent><DialogContentText>To balance the dataset,
              enter the minimum number of samples.(Optional)<
                  /DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Min. samples"
                    fullWidth
                    onChange={(e) => setMinSamples(e.target.value)}
                  />
                  </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button><
                  Button
              disabled = {loading} color = "primary"
                    onClick={() => {
      setLoading(true);
      setOpen(false);
      let data;
      if (minSamples !== null) {
        data = new FormData();
        data.append("min_samples", minSamples);
      }
      fetch(`${serverUrl}balance_dataset`, {
        method : "POST",
        body : data,
      })
          .then((res) => res.json())
          .then((res) => {
            setBalancedImgPaths(res.balanced_img_paths);
            setAfterCountData(() => {
              const newCountData = {};
              newCountData.x = Object.keys(res.balanced_class_counts)
                                   .map((label) => classLabels[label]);
              newCountData.y = Object.values(res.balanced_class_counts)
                                   .map(({counts}) => parseInt(counts));
              newCountData.colors =
                  newCountData.x.map((t, i) => colours[i % colours.length]);
              return newCountData;
            });
            setLoading(false);
          })
          .catch(console.error);
                    }}
                  >
                    Balance
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
                  After balancing
                </Typography>
              </Grid>
              <br />
              <Grid item>
                <Bar
                    data = {afterData} options = {options} width =
                        {1400} height = { 400 } />
              </Grid >
                                        <br />< Button
                    variant = "contained"
                    color = "primary"
                onClick={
      () => {
        setUndoLoading(true);
        const data = new FormData();
        data.append("images", JSON.stringify(JSON.stringify(balancedImgPaths)));
        fetch(`${serverUrl}dataset_images`, {
          method : "DELETE",
          credentials : "include",
          body : data,
        })
            .then((res) => res.json())
            .then(() => {
              setUndoLoading(false);
              history.push("/balance/");
            })
            .catch((err) => console.log(err));
      }}
                startIcon={<UndoIcon />}
                disabled={undoLoading}
              >
                Undo
              </Button>
            </>
          )}
        </Grid>
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
          &nbsp; &nbsp;
          <Typography variant="h6" color="inherit">
            Performing oversampling to balance the dataset
          </Typography>
        </Backdrop>
      </Grid>
    </>
  );
  }

  export default BalanceDataset;
