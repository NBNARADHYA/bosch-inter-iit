import React,{ useEffect, useState, useRef } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Timeline from '@material-ui/lab/Timeline';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineContent from '@material-ui/lab/TimelineContent';
import CloseIcon from '@material-ui/icons/Close';
import RestoreRoundedIcon from '@material-ui/icons/RestoreRounded';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
  },
  margin: {
    margin: theme.spacing(1),
  },
  paper: {
    padding: '6px 16px',
    background: '#f3e5f5'
  },
  drawerPaper: {
    width: '45vw'
  },
  closeMenuButton: {
    marginLeft: 'auto',
    marginRight: 0,
  },  
  connector: {
    backgroundColor: theme.palette.primary.main,
  },  
}));

const augmentations = [
  {
    name: 'Random Crop',
    image: 'https://via.placeholder.com/150/00FF00/FFFFFF/',
    parameters: {
      'p': 0.5
    }
  },
  {
    name: 'Random Fog',
    image: 'https://via.placeholder.com/150/000000/FFFFFF/',
    parameters: {
      'p': 0.3 
    }
  },
  {name: 'Blur',
  image: 'https://via.placeholder.com/150/000FF0/FFFFFF/',
  parameters: {
    'p': 0.2 
  }
},
{name: 'To Sepia',
image: 'https://via.placeholder.com/150/FF00FF/0000FF/',
parameters: { 
}
},
{
  name: 'Random Crop',
  image: 'https://via.placeholder.com/150/00FF00/FFFFFF/',
  parameters: {
    'p': 0.5
  }
},
{
  name: 'Random Fog',
  image: 'https://via.placeholder.com/150/000000/FFFFFF/',
  parameters: {
    'p': 0.3 
  }
},
{name: 'Blur',
image: 'https://via.placeholder.com/150/000FF0/FFFFFF/',
parameters: {
  'p': 0.2 
}
},
{name: 'To Sepia',
image: 'https://via.placeholder.com/150/FF00FF/0000FF/',
parameters: { 
}
}    
]

function AugmentationsTimeline(props) {
  const { isOpen, toggleDrawer } = props;
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const closeDrawer = () => {
    if(isOpen)
      toggleDrawer();
  }
  
  const lastRef = useRef(null);
  useEffect(()=> {
    // scroll to bottom
    if(isOpen)
    {
      setTimeout(()=> {
        lastRef.current.scrollIntoView({ behavior: 'smooth', block: "end", inline: "nearest" });
      },100);
    }
  },[isOpen]);

  const classes = useStyles();
  return <Drawer anchor='right' open={isOpen} onClose={closeDrawer} classes={{
    paper: classes.drawerPaper,
  }}>
  <div className={classes.root}>
 <Grid container direction="row" justify="center" alignItems="center">
 <Grid item xs={10} >
  <Typography variant="h5" component="h1" align="center">
            &nbsp; Applied Augmentations
  </Typography>    
 </Grid>
 <Grid item xs={2}> 
<IconButton onClick={closeDrawer} className={classes.closeMenuButton}>
              <CloseIcon/>
            </IconButton>    
</Grid>
</Grid>        
{
  (!augmentations || !augmentations.length) &&  <Grid container item xs={12} align="center" justify="center">
    <Typography variant="body2" align="center" style={{marginTop: '35vh'}}>No augmentations applied yet.</Typography>
    </Grid>
}    
   {augmentations && !!augmentations.length && <Timeline align="alternate">
      {augmentations.map((aug,i) => {
      if(i+1 === augmentations.length)
        return null;
      else
      return <TimelineItem key={i.toString()}  onMouseOver={() => setSelectedIndex(i)}
      >
        { selectedIndex===i && i+1 !==augmentations.length && <TimelineOppositeContent>
         <Fab
          size="small"
          color="inherit"
          aria-label="add"
          className={classes.margin}
        >
          <Tooltip TransitionComponent={Zoom} title="Restore until this augmentation">              
              <IconButton onClick={()=> {console.log('restored '+i)}}>              
                <RestoreRoundedIcon color="primary"></RestoreRoundedIcon>
              </IconButton>
            </Tooltip>
        </Fab></TimelineOppositeContent>}        
        <TimelineSeparator>
        <img src={aug.image} alt={'Loading..'} height='60px' width='60px'/>
           {i!==augmentations.length-1 && <TimelineConnector className={classes.connector}/>}
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
          <Grid container direction="row" justify="center" alignItems="center">
          {i%2===1 && selectedIndex===i && <Grid item xs={2}>
            <Tooltip TransitionComponent={Zoom} title="Remove augmentation">                  
              <IconButton onClick={()=> {console.log('removed '+i)}}>              
                <CancelRoundedIcon color="secondary"></CancelRoundedIcon>
              </IconButton>
            </Tooltip>
            </Grid>}            
            <Grid item xs={10}>            
            <Typography variant="h6" component="h1">
            {aug.name}
            </Typography>
            <Typography>Probability : {aug.parameters['p']?aug.parameters['p']:'1.0'}</Typography>
            </Grid>
            {i%2===0 && selectedIndex===i &&  <Grid item xs={2}>
            <Tooltip TransitionComponent={Zoom} title="Remove augmentation">              
              <IconButton onClick={()=> {console.log('removed '+i)}}>              
                <CancelRoundedIcon color="secondary"></CancelRoundedIcon>
              </IconButton>
            </Tooltip>
            </Grid>}
          </Grid>
          </Paper>
          <Grid container align="center">
        </Grid>      
        </TimelineContent>        
      </TimelineItem>}
      )}
      <TimelineItem onMouseOver={() => setSelectedIndex(augmentations.length-1)}
      ref={lastRef}
      >
        <TimelineSeparator>
        <img alt={'Loading'} src={augmentations[augmentations.length-1].image} height='60px' width='60px'/>
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
          <Grid container direction="row" justify="center" alignItems="center">
          {augmentations.length%2===0 && selectedIndex===augmentations.length-1 && <Grid item xs={2}>
            <Tooltip TransitionComponent={Zoom} title="Remove augmentation">                  
              <IconButton onClick={()=> {console.log('removed '+augmentations.length-1)}}>              
                <CancelRoundedIcon color="secondary"></CancelRoundedIcon>
              </IconButton>
            </Tooltip>
            </Grid>}            
            <Grid item xs={10}>            
            <Typography variant="h6" component="h1">
            {augmentations[augmentations.length-1].name}
            </Typography>
            <Typography>Probability : {augmentations[augmentations.length-1].parameters['p']?augmentations[augmentations.length-1].parameters['p']:'1.0'}</Typography>
            </Grid>
            {augmentations.length%2===1 && selectedIndex===augmentations.length-1 &&  <Grid item xs={2}>
            <Tooltip TransitionComponent={Zoom} title="Remove augmentation">              
              <IconButton onClick={()=> {console.log('removed '+augmentations.length-1)}}>              
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
    </Timeline>}
    </div>
</Drawer>
}

export default AugmentationsTimeline