import CssBaseline from "@material-ui/core/CssBaseline";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ApplyTransformations from "./pages/ApplyTransformations";
import BalanceDatasetPage from "./pages/BalanceDataset";
import SplitDatasetPage from "./pages/SplitDataset";


const App = ({classes, theme}) => {
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
