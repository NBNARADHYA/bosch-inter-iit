import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";

import Content from "./components/Content";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar />
      <Sidebar />
      <Content />
    </div>
  );
};

export default App;
