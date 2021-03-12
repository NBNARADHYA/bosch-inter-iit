import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar";
import Content from "./components/Content";

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
