import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { useState } from "react";
import AugmentationsTimeline from "./components/AugmentationsTimeline"
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
  const [isTimelineOpen, setTimelineOpen] = useState(false);
  const toggleTimelineOpen = ()=> {
    setTimelineOpen(!isTimelineOpen);
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar toggleTimelineDrawer={toggleTimelineOpen}/>
      <Sidebar />
      <Content />
      <AugmentationsTimeline isOpen={isTimelineOpen} toggleDrawer={toggleTimelineOpen}/>
    </div>
  );
};

export default App;
