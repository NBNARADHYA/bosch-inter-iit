import CssBaseline from "@material-ui/core/CssBaseline";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import React, {useCallback, useEffect, useState} from "react";
import {Route, Switch, useLocation} from "react-router-dom";

import Navbar from "./components/Navbar";
import ApplyTransformations from "./pages/ApplyTransformations";
import BalanceDatasetPage from "./pages/BalanceDataset";
import SplitDatasetPage from "./pages/SplitDataset";

const drawerWidth = 360;

const useStyles = makeStyles(
    (theme) => ({
      "@global" : {
        "*::-webkit-scrollbar" : {
          width : "0.5em",
        },
        "*::-webkit-scrollbar-track" : {
          "-webkit-box-shadow" : "inset 0 0 6px rgba(0,0,0,0.00)",
        },
        "*::-webkit-scrollbar-thumb" : {
          backgroundColor : "#757575",
          outline : "1px solid #757575",
        },
      },
      root : {
        display : "flex",
      },
      appBar : {
        transition : theme.transitions.create([ "margin", "width" ], {
          easing : theme.transitions.easing.sharp,
          duration : theme.transitions.duration.leavingScreen,
        }),
      },
      appBarShift : {
        width : `calc(100% - ${drawerWidth}px)`,
        marginLeft : drawerWidth,
        transition : theme.transitions.create([ "margin", "width" ], {
          easing : theme.transitions.easing.easeOut,
          duration : theme.transitions.duration.enteringScreen,
        }),
      },
      menuButton : {
        marginRight : theme.spacing(2),
      },
      hide : {
        display : "none",
      },
      drawer : {
        width : drawerWidth,
        flexShrink : 0,
      },
      drawerPaper : {
        width : drawerWidth,
      },
      drawerHeader : {
        display : "flex",
        alignItems : "center",
        padding : theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent : "flex-end",
      },
      content : {
        flexGrow : 1,
        padding : theme.spacing(3),
        transition : theme.transitions.create("margin", {
          easing : theme.transitions.easing.sharp,
          duration : theme.transitions.duration.leavingScreen,
        }),
        marginLeft : -drawerWidth,
      },
      contentShift : {
        transition : theme.transitions.create("margin", {
          easing : theme.transitions.easing.easeOut,
          duration : theme.transitions.duration.enteringScreen,
        }),
        marginLeft : 0,
      },
    }));

const App = () => {
  const classes = useStyles();
  const [isTimelineOpen, setTimelineOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const [previewImg, setPreviewImg] = useState("");
  const theme = useTheme();
  const { pathname } = useLocation();

  const [open, setOpen] = useState(pathname === "/");

  const toggleTimelineOpen = useCallback(() => {
    setTimelineOpen(!isTimelineOpen);
  }, [isTimelineOpen]);

  const handleDrawerOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    setOpen(pathname === "/");
  }, [pathname]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar
        classes={classes}
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        theme={theme}
        toggleTimelineDrawer={toggleTimelineOpen}
      />
      <Switch>
        <Route
          path="/split"
          component={() => <SplitDatasetPage classes={classes} />}
        />
        <Route
          path="/balance"
          component={() => <BalanceDatasetPage classes={classes} />}
        />
        <Route
          component={() => (
            <ApplyTransformations
              classes={classes}
              open={open}
              handleDrawerClose={handleDrawerClose}
              isTimelineOpen={isTimelineOpen}
              toggleTimelineOpen={toggleTimelineOpen}
            />
          )}
        />
      </Switch>
    </div>
  );
};

export default App;
