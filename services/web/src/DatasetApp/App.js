import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ApplyTransformations from "./pages/ApplyTransformations";
import BalanceDatasetPage from "./pages/BalanceDataset";
import SplitDatasetPage from "./pages/SplitDataset";

const drawerWidth = 360;

const useStyles = makeStyles((theme) => ({
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0.5em",
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "#757575",
      outline: "1px solid #757575",
    },
  },
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const App = () => {
  const classes = useStyles();
  
  const theme = useTheme();
  const { pathname } = useLocation();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Switch>
        <Route
          path="/split"
          component={() => <SplitDatasetPage theme={theme} classes={classes} />}
        />
        <Route
          path="/balance"
          component={() => <BalanceDatasetPage theme={theme} classes={classes} />}
        />
        <Route
          component={() => (
            <ApplyTransformations
              classes={classes}
              theme={theme}
              pathname={pathname}
            />
          )}
        />
      </Switch>
    </div>
  );
};

export default App;
