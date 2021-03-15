import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import TimelineIcon from '@material-ui/icons/Timeline';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles(() => ({
  timelineButton: {
    marginLeft: 'auto'
  },  
}));

export default function Navbar({ classes, open, handleDrawerOpen, toggleTimelineDrawer }) {
const navbarClasses = useStyles();
  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, open && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          Dataset Creation UI
        </Typography>
        <Tooltip TransitionComponent={Zoom} title="Timeline of applied augmentations">        
          <IconButton color="inherit" className={navbarClasses.timelineButton} aria-label="Timeline" component="span" onClick={toggleTimelineDrawer}>
            <TimelineIcon/>
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}
