import AppBar from "@material-ui/core/AppBar";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {makeStyles} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import MenuIcon from "@material-ui/icons/Menu";
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import TimelineIcon from '@material-ui/icons/Timeline';
import clsx from "clsx";
import React from "react";
import {Link, useHistory, useLocation} from "react-router-dom";

const useStyles =
    makeStyles(theme => ({
                 timelineButton : {},
                 menuOptions : {marginLeft : 'auto'},
                 uiMenuOptions : {float : "left"},
                 dropdownText : {margin : theme.spacing(0, 0.5, 0, 1)},
                 dropdownIcon : {marginBottom : -4}
               }));

const menuOptions = [
  {'text' : 'Apply transformations', 'link' : '/'},
  {'text' : 'Balance dataset', 'link' : '/balance/'},
  {'text' : 'Split dataset', 'link' : '/split/'}
];

const uiOptions =
    [
      {
        text : 'Dataset Creation UI',
        links : menuOptions.map(({link}) => link),
        link : "/"
      },
      {text : 'Post Evaluation UI', links : [ '/evaluate' ], link : "/evaluate"}
    ]

    export default function
    Navbar({
      classes,
      open,
      isTimelineOpen,
      handleDrawerOpen,
      toggleTimelineDrawer,
      openTour,
      showReset
    }) {
  const navbarClasses = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const [uiAnchorEl, setUIAnchorEl] = React.useState(null);
  const isUIMenuOpen = Boolean(uiAnchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const currentPath = useLocation().pathname;
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  let selectedUIOption = uiOptions.filter(({links}) => links.some(link => currentPath === link))[0]
  if(selectedUIOption) selectedUIOption = selectedUIOption.text;

  let selectedOption = menuOptions.filter(({link}) => link===currentPath)[0]; 
  if( selectedOption ) {
    selectedOption = selectedOption.text;
  }
  
  const routerHistory = useHistory();  

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarLeftShift]: open,
        [classes.appBarRightShift]: isTimelineOpen,
        [classes.appBarShift]: open&&isTimelineOpen,
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
        <Button color="inherit" onClick={(e) => setUIAnchorEl(e.currentTarget)}  aria-haspopup="true" className={navbarClasses.uiMenuOptions}>
          <span className={navbarClasses.dropdownText}>
            {selectedUIOption}
            <ExpandMoreIcon fontSize="small" className={navbarClasses.dropdownIcon} />          
          </span>
        </Button>
        <Menu
          anchorEl={uiAnchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
          open={isUIMenuOpen}
          onClose={() => setUIAnchorEl(null)}
        >
          {uiOptions.map(({text,link, links},i) =>  <MenuItem
                  component={Link}
                  data-no-link="true"
                  to={link}
                  key={i.toString()}
                  selected={links.some(link => currentPath === link)}
                  onClick={() => setUIAnchorEl(null)}
                >
                  {text}
                </MenuItem>)
              }
        </Menu>
        {showReset && <Tooltip TransitionComponent={Zoom} title="Test another model">        
          <IconButton color="inherit" className={navbarClasses.menuOptions} aria-label="Reset" component="span" onClick={()=>{
    routerHistory.go(0)            
          }} id="step6">
            <RotateLeftIcon/>
          </IconButton>
        </Tooltip>}
        {selectedUIOption === "Dataset Creation UI" &&
          <>
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
          </>
        }     
        {selectedOption==='Apply transformations' && 
        <>
        <Tooltip TransitionComponent={Zoom} title="Timeline of applied augmentations">        
          <IconButton color="inherit" className={navbarClasses.timelineButton} aria-label="Timeline" component="span" onClick={toggleTimelineDrawer}>
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
