import React, { useCallback, useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import SelectTranformation from "./SelectTransformation";
import { Grid, makeStyles, withStyles } from "@material-ui/core";
import augmentations from "../../../Constants/augmentations";
import UploadImage from "./UploadImage";
import Params from "../Params";
import { Button } from "@material-ui/core";
import { green, red } from '@material-ui/core/colors';
import ResetDialog from "./ResetDialog";

const useStyle = makeStyles(() => ({
  spacing: {
    margin: "20px",
    width: 280
  },
  spacingUploadButton: {
    margin: "5px"
  },
  slider: {
  },
  buttonGrid: {
    margin: "10px",
  }
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
  params,
  setParams,
  transformation,
  setTransformation,
  addToHistory,
  resetHistory,
  history,
  imgDimensions
}) => {
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const handleParamsChange = useCallback((prop, val) => {
    let newState = {...params};
    newState[prop] = val;
    setParams(newState);
  },[params, setParams]);

  const handleTransformationChange = useCallback((e) => {
    const selectedTransformation = augmentations.filter(({id}) => id===e.target.value)[0];
    setTransformation(selectedTransformation);
    setParams({});
  },[setParams, setTransformation]);

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
        imgDimensions={imgDimensions}
      />
      <Divider />
      <br/>
        <Grid container justify="space-around" className={classes.buttonGrid}>
          <DoneButton
            variant="contained"
            startIcon={<DoneIcon/>}
            onClick={addToHistory}
            disabled={!img || !img.img || !img.img.length}
          >
            Apply
          </DoneButton>
          <ResetButton
            variant="contained"
            startIcon={<ClearIcon/>}
            onClick={()=> {setResetDialogOpen(true);}}
            disabled={!history.length}
          >
            Reset
          </ResetButton>          
        </Grid>
      <br/>
      <ResetDialog
        handleClose={()=> {setResetDialogOpen(false);}}
        handleReset={()=> {resetHistory(); setResetDialogOpen(false);}}
        isOpen={resetDialogOpen}
      />
    </Drawer>
  );
};

export default Sidebar;
