import {makeStyles} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React from "react";

const drawerWidth = 320;

const useStyles = makeStyles((theme) => ({
                               appBar : {
                                 width : `calc(100% - ${drawerWidth}px)`,
                                 marginLeft : drawerWidth,
                               },
                             }));

const Navbar = () => {
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" noWrap>
          Dataset Creation UI
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
