import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ResultApp from "./ResultApp/App";
import DatasetApp from "./DatasetApp/App";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/result" component={ResultApp} />
        <Route component={DatasetApp} />
      </Switch>
    </Router>
  );
}

export default App;
