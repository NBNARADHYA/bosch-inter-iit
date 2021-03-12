import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import DatasetApp from "./DatasetApp/App";
import ResultApp from "./ResultApp/App";

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
