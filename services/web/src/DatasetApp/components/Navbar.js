import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import TimelineIcon from '@material-ui/icons/Timeline';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link } from "react-router-dom";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const useStyles = makeStyles(theme => ({
  timelineButton: {
  },
  menuOptions: {
    marginLeft: 'auto'
  },  
  dropdownText: {
    margin: theme.spacing(0, 0.5, 0, 1)
   } ,
  dropdownIcon: {
    marginBottom: -4
  }
}));

const menuOptions = [{
  'text': 'Apply transformations',
  'link': '/'
},
{
  'text': 'Balance dataset',
  'link': '/balance/'
},
{
  'text': 'Split dataset',
  'link': '/split/'
}
];

export default function Navbar({ classes, open, handleDrawerOpen, toggleTimelineDrawer, openTour }) {
const navbarClasses = useStyles();
const [anchorEl, setAnchorEl] = React.useState(null);
const isMenuOpen = Boolean(anchorEl);
const handleMenu = (event) => {
  setAnchorEl(event.currentTarget);
};
const currentPath = window.location.pathname;
const handleClose = () => {
  setAnchorEl(null);
};

const selectedOption = menuOptions.filter(({link}) => link===currentPath)[0].text;
  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar>
        {selectedOption==='Apply transformations' && <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(navbarClasses.menuButton, open && classes.hide)}
        >
          <MenuIcon />
        </IconButton>}
        <Typography variant="h6" noWrap>
          Dataset Creation UI
        </Typography>
        <Button color="inherit" onClick={handleMenu}  aria-haspopup="true" className={navbarClasses.menuOptions} id="step9">
          <span className={navbarClasses.dropdownText}>
          {selectedOption}
          <ExpandMoreIcon fontSize="small" className={navbarClasses.dropdownIcon} />          
          </span>
        </Button>        
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
          open={isMenuOpen}
          onClose={handleClose}
        >
          {menuOptions.map(({text,link},i) =>  <MenuItem
                  component={Link}
                  data-no-link="true"
                  to={link}
                  key={i.toString()}
                  selected={currentPath === link}
                  onClick={handleClose}
                >
                  {text}
                </MenuItem>)
              }
        </Menu>
        {selectedOption==='Apply transformations' && 
        <>
        <Tooltip TransitionComponent={Zoom} title="Timeline of applied augmentations">        
          <IconButton color="inherit" className={navbarClasses.timelineButton} aria-label="Timeline" component="span" onClick={toggleTimelineDrawer} id="step6">
            <TimelineIcon/>
          </IconButton>
        </Tooltip>
        <Tooltip TransitionComponent={Zoom} title="Tutorial">        
          <IconButton color="inherit" className={navbarClasses.timelineButton} aria-label="Help" component="span" onClick={openTour}>
            <HelpOutlineIcon/>
          </IconButton>
        </Tooltip>        
        </>}
      </Toolbar>
    </AppBar>
  );
}
