import React, { useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import SelectTranformation from "./SelectTransformation";
import { Grid, makeStyles, withStyles } from "@material-ui/core";
import augmentations from "../../Constants/augmentations";
import UploadImage from "./UploadImage";
import Params from "./Params";
import { Button } from "@material-ui/core";

import { green, red } from '@material-ui/core/colors';

const useStyle = makeStyles(() => ({
  spacing: {
    margin: "20px",
    width: 280
  },
  slider: {
    padding: "0px",
  },
  buttonGrid: {
    margin: "10px",
  },
}));

const DoneButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(green[700]),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
}))(Button);

const ResetButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(red[700]),
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
}))(Button);

const Sidebar = ({
  classes,
  open,
  handleDrawerClose,
  theme,
  img,
  handleImgChange,
}) => {
  const [params, setParams] = useState({});

  const handleParamsChange = (prop, val) => {
    let newState = params;
    newState[prop] = val;
    setParams(newState);
    // console.log(params);
  };

  const [transformation, setTransformation] = useState(augmentations[0]);

  const handleTransformationChange = (e) => {
    const selectedTransformation = augmentations.filter(({id}) => id==e.target.value)[0];
    setTransformation(selectedTransformation);
    setParams({});
    // let { parameters } = transformation;
    // parameters = JSON.parse(parameters);
    // parameters.forEach((param) => {
    //   handleParamsChange(param.name, param.default);
    // });
  };

  const spacing = useStyle();
  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <UploadImage
        classes={spacing}
        img={img}
        handleImgChange={handleImgChange}
      />
      <Divider />
      <SelectTranformation
        classes={spacing}
        transformation={transformation}
        handleTransformationChange={handleTransformationChange}
      />
      <Divider />
      <Params
        classes={spacing}
        transformation={transformation}
        params={params}
        handleParamsChange={handleParamsChange}
      />
      <Divider />
      <br/>
        <Grid container justify="space-around" className={classes.buttonGrid}>
          <DoneButton
            variant="contained"
            startIcon={<DoneIcon/>}
          >
            Apply
          </DoneButton>
          <Button
            variant="contained"
            color="secondary"
            className={classes.resetButton}
            startIcon={<ClearIcon/>}
          >
            Reset
          </Button>
        </Grid>
      <br/>
    </Drawer>
  );
};

export default Sidebar;
