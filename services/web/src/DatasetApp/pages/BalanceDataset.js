import React, { useCallback, useEffect, useState } from 'react';
import { Bar } from '@reactchartjs/react-chart.js'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import serverUrl from '../../Constants/serverUrl';
import classLabels from '../../Constants/classLabels';

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  }  ,
  maintainAspectRatio: false  
}

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))

function BalanceDataset(props) {
  let classes = useStyles()
  classes = { ...classes, ...props.classes }

  const [beforeCountData, setBeforeCountData] = useState({ x: [], y: [] })
  const [afterCountData, setAfterCountData] = useState({ x: [], y: [] })

  useEffect(() => {
    fetch(`${serverUrl}class_counts`)
    .then(res => res.json())
    .then(res => {
      setBeforeCountData(() => {
        const newCountData = {}
        newCountData.x = Object.keys(res.class_counts).map(label => classLabels[label])
        newCountData.y = Object.values(res.class_counts).map(({ counts }) => parseInt(counts))
        return newCountData
      })
    }).catch(console.error)
  }, [])

  const beforeData = {
    labels: beforeCountData.x,
    datasets: [
      {
        label: 'Frequency',
        data: beforeCountData.y,
      },
    ],
  }

  const afterData = {
    labels: afterCountData.x,
    datasets: [
      {
        label: 'Frequency',
        data: afterCountData.y,
      },
    ],
  }

  const beforeLoaded = Boolean(beforeCountData.x.length && beforeCountData.y.length)
  const afterLoaded = Boolean(afterCountData.x.length && afterCountData.y.length)

  const [loading, setLoading] = useState(!beforeLoaded)
  const [open, setOpen] = useState(false)

  const [minSamples, setMinSamples] = useState(null)


  const handleClickOpen = useCallback(() => {
    setOpen(true);
  });

  const handleClose = useCallback(() => {
    setOpen(false);
  });

  useEffect(() => {
    setLoading(!beforeLoaded)
  }, [beforeLoaded])

  if(!beforeLoaded) {
    return (
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color="primary" />
      </Backdrop>
    )
  }

  return  (
    <Grid container className={classes.contentShift} justify="center" direction="column" alignItems="center" spacing={1}>
      <div className={classes.drawerHeader} />
      <Grid item container justify="center" direction="column" alignItems="center" spacing={1}>
        <Grid item>
          <br/>
          <Typography align="center" variant="h5" color="primary">
            {afterLoaded ? "Before" : "Current class counts"}
          </Typography>      
        </Grid>
        <br/>
        <Grid item>
          <Bar data={beforeData} options={options} width={1400} height={400} />  
        </Grid>
        <br />
        {!afterLoaded &&
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleClickOpen} disabled={loading}>Balance the dataset</Button>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Balance the Dataset</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To balance the dataset, enter the minimum number of samples. (Optional)
                </DialogContentText>
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
                </Button>
                <Button disabled={loading} color="primary" onClick={() => {
                  setLoading(true)
                  setOpen(false)
                  fetch(`${serverUrl}balance_dataset`, { method: "POST", body: JSON.stringify({ min_samples: minSamples }) })
                  .then(res => res.json())
                  .then(res => {
                    setAfterCountData(() => {
                      const newCountData = {}
                      newCountData.x = Object.keys(res.balanced_class_counts).map(label => classLabels[label])
                      newCountData.y = Object.values(res.balanced_class_counts).map(({ counts }) => parseInt(counts))
                      return newCountData
                    })
                    setLoading(false)
                  })
                  .catch(console.error)
                }}>
                  Balance
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        }
        {afterLoaded &&
          <>
            <Grid item>
              <br/>
              <Typography align="center" variant="h5" color="primary">
                After
              </Typography>      
            </Grid>
            <br/>
            <Grid item>
              <Bar data={afterData} options={options} width={1400} height={400} />  
            </Grid>
          </>
        }
      </Grid>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="primary" />
      </Backdrop>
    </Grid>
  )
}

export default BalanceDataset;
