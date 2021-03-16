import React,{ useEffect, useState, useRef } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Timeline from '@material-ui/lab/Timeline';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from "@material-ui/core";
import TimelineStage from './TimelineStage';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
  },
  drawerPaper: {
    width: '45vw'
  },
  closeMenuButton: {
    marginLeft: 'auto',
    marginRight: 0,
  },  
}));

function AugmentationsTimeline(props) {
  const { isOpen, toggleDrawer, history, setHistory } = props;
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const closeDrawer = () => {
    if(isOpen)
      toggleDrawer();
  }
  
  const lastRef = useRef(null);
  useEffect(()=> {
    // scroll to bottom
    if(isOpen && lastRef.current)
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
    (!history || !history.length) &&  <Grid container item xs={12} align="center" justify="center">
      <Typography variant="body2" align="center" style={{marginTop: '35vh'}}>No augmentations applied yet.</Typography>
      </Grid>
  }    
  {history && !!history.length && <Timeline align="alternate">
    {history.map((aug,i) => { 
    if(i+1 === history.length)
      return null;
    else
    return <TimelineStage
            key={i.toString()}
            handleMouseOver={() => setSelectedIndex(i)}
            isSelected={selectedIndex===i}
            isLast={false} 
            handleRestore={()=> {console.log('restored '+i)}}
            handleRemove={()=> {console.log('removed '+i)}}
            image={aug.image}
            name={aug.name}
            parameters={aug.parameters}
            even={i%2===0}
          />}
    )}
      <TimelineStage
          ref={lastRef}
          handleMouseOver={() => setSelectedIndex(history.length-1)}
          isSelected={selectedIndex===history.length-1}
          isLast 
          handleRestore={()=> {console.log('restored '+history.length-1)}}
          handleRemove={()=> {console.log('removed '+history.length-1)}}
          image={history[history.length-1].image}
          name={history[history.length-1].name}
          parameters={history[history.length-1].parameters}
          even={(history.length-1)%2===0}
        />            
    </Timeline>}
    </div>
</Drawer>
}

export default AugmentationsTimeline