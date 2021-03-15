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
          handleMouseOver={() => setSelectedIndex(augmentations.length-1)}
          isSelected={selectedIndex===augmentations.length-1}
          isLast 
          handleRestore={()=> {console.log('restored '+augmentations.length-1)}}
          handleRemove={()=> {console.log('removed '+augmentations.length-1)}}
          image={augmentations[augmentations.length-1].image}
          name={augmentations[augmentations.length-1].name}
          parameters={augmentations[augmentations.length-1].parameters}
          even={(augmentations.length-1)%2===0}
        />            
    </Timeline>}
    </div>
</Drawer>
}

export default AugmentationsTimeline