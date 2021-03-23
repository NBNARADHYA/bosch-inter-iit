import {
  Backdrop,
  CircularProgress,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from "@material-ui/core";
import {IconButton} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import {makeStyles} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import InfoButton from "@material-ui/icons/InfoOutlined";
import React from "react";

import classLabels from "../../../Constants/classLabels";
import serverUrl from "../../../Constants/serverUrl";
import {getClassString} from "../../../Utils";
import DescriptionBox from "../DescriptionBox";
import MagnifyImage from "../MagnifyImage";

const options = [];
for (let option = 0; option < 48; option++) {
  const newOption =
      (<MenuItem key = {option} value = {option}>{
          classLabels[getClassString(option)]}<
          /MenuItem>
  );
  options.push(newOption);
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));


const PlotCurves = ({model_name}) => {
    const currentModel = model_name;
    const classes = useStyles();
    const [classId, setClassId] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [curvePlots, setCurvePlots] = React.useState(null);
    const [descriptionBox, setDescriptionBox] = React.useState(false);
    const handleDescriptionOpen = () => setDescriptionBox(true);
    const handleDescriptionClose = () => setDescriptionBox(false);
    const handleClassChange = (e) => {
        setLoading(true);
        setClassId(e.target.value);
        const data = new FormData();
        data.append("model_name", currentModel);
        data.append("class_id", e.target.value);
        fetch(`${serverUrl}plot_curves`, {
            method: "POST",
            credentials: "include",
            body: data,
          })
            .then((res) => res.json())
            .then((res) => {
              setLoading(false);
                console.log(res);
              setCurvePlots(res);
            })
            .catch((err) => {
              setLoading(false);
              console.log(err);
            });
    }
  return (
    <div>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Curves
          </Typography>
       <IconButton color = "inherit" onClick = {handleDescriptionOpen}>
       <InfoButton /></IconButton>
        </Toolbar>
       </AppBar>
      <DescriptionBox
        descriptionBox={descriptionBox}
        handleDescriptionClose={handleDescriptionClose}
        description="Description of Confusion Matrix"
      />
       <br /><br /><br />
       <InputLabel id =
            "demo-simple-select-placeholder-label-label">Select Class Label:
           </InputLabel>
      <Select
        autoFocus
        labelId="demo-simple-select-placeholder-label-label"
        id="demo-simple-select-placeholder-label"
        name="classId"
        onChange={(e, val) => handleClassChange(e, val)}
        displayEmpty
        fullWidth
        required
        style={{maxWidth:"700px"}}
      >{options}
      </Select>
       <br /><br /><br /><div style = {{ margin: "auto" }}>{
         loading &&<Backdrop className = {classes.backdrop} open = {true}>
         <CircularProgress color = "primary" />
         </Backdrop>}
          {curvePlots && 
          <div style={{margin:"auto"}}>
              <Typography variant="h6">Precision Recall vs Confidence Path</Typography>
         <MagnifyImage url =
          {
            curvePlots.precision_recall_vs_confidence_path
          } />

              <Typography variant="h6">Precision vs Recall Path</Typography>
         <MagnifyImage url =
          {
            curvePlots.precision_vs_recall_path
          } />

              <Typography variant="h6">ROC Curve Path</Typography>
         <MagnifyImage url = { curvePlots.roc_curve_path } />
          </div>
       }</div>
    </div>)
}

export default PlotCurves
