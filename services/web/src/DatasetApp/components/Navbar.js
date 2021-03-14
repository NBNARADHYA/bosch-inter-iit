import { makeStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import TimelineIcon from '@material-ui/icons/Timeline';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import React from "react";

const drawerWidth = 320;

const useStyles = makeStyles((theme) => ({
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    flex: 1,
  },
  timelineButton: {
    marginLeft: 'auto'
  },  
}));

const Navbar = (props) => {
  const { toggleTimelineDrawer } = props;
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" noWrap>
          Dataset Creation UI
        </Typography>
        <Tooltip TransitionComponent={Zoom} title="Timeline of applied augmentations">        
          <IconButton color="inherit" className={classes.timelineButton} aria-label="Timeline" component="span" onClick={toggleTimelineDrawer}>
            <TimelineIcon/>
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
