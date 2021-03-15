import React, { forwardRef } from 'react';
import { makeStyles } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineContent from '@material-ui/lab/TimelineContent';
import RestoreRoundedIcon from '@material-ui/icons/RestoreRounded';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  paper: {
    padding: '6px 16px',
    background: '#f3e5f5'
  },
  connector: {
    backgroundColor: theme.palette.primary.main,
  },  
}));

function TimelineStage({ 
  handleMouseOver,
  isSelected,
  isLast,
  handleRestore,
  handleRemove,
  image,
  name,
  parameters,
  even,
  parentRef
  }) {
    const classes = useStyles();    
  return <TimelineItem onMouseOver={handleMouseOver} ref={parentRef}>
    { isSelected && !isLast && <TimelineOppositeContent>
     <Fab
      size="small"
      color="inherit"
      aria-label="add"
      className={classes.margin}
    >
      <Tooltip TransitionComponent={Zoom} title="Restore until this augmentation">              
          <IconButton onClick={handleRestore}>              
            <RestoreRoundedIcon color="primary"></RestoreRoundedIcon>
          </IconButton>
        </Tooltip>
    </Fab></TimelineOppositeContent>}        
    <TimelineSeparator>
    <img src={image} alt={'Loading..'} height='60px' width='60px'/>
       {!isLast && <TimelineConnector className={classes.connector}/>}
    </TimelineSeparator>
    <TimelineContent>
      <Paper elevation={3} className={classes.paper}>
      <Grid container direction="row" justify="center" alignItems="center">
      {!even && isSelected && <Grid item xs={2}>
        <Tooltip TransitionComponent={Zoom} title="Remove augmentation">                  
          <IconButton onClick={handleRemove}>              
            <CancelRoundedIcon color="secondary"></CancelRoundedIcon>
          </IconButton>
        </Tooltip>
        </Grid>}            
        <Grid item xs={10}>            
        <Typography variant="h6" component="h1">
        {name}
        </Typography>
        <Typography>Probability : {parameters['p']?parameters['p']:'1.0'}</Typography>
        </Grid>
        {even && isSelected &&  <Grid item xs={2}>
        <Tooltip TransitionComponent={Zoom} title="Remove augmentation">              
          <IconButton onClick={handleRemove}>              
            <CancelRoundedIcon color="secondary"></CancelRoundedIcon>
          </IconButton>
        </Tooltip>
        </Grid>}
      </Grid>
      </Paper>
      <Grid container align="center">
    </Grid>      
    </TimelineContent>        
  </TimelineItem>
}

const TimelineStageWithRef = forwardRef((props, ref) => 
<TimelineStage
  parentRef={ref} 
  {...props} 
/>);

export default TimelineStageWithRef;