import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

function SplitDataset(props) {
  const { classes } = props;  

  return  <main className={classes.contentShift}>
  <div className={classes.drawerHeader} />
    <Grid container justify="center" direction="column" alignItems="center">
    <Grid item>
    <br/>
    <Typography align="center" variant="h5">
      Current Distribution
    </Typography>      
    </Grid>
    <br/>
    <Grid item>
    </Grid>  
    </Grid>
  </main>
}

export default SplitDataset;