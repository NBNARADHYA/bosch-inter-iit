import React from "react";
import classLabels from "../../../Constants/classLabels";
import { MenuItem, InputLabel, Select, Typography } from "@material-ui/core";
import serverUrl from "../../../Constants/serverUrl";
import MagnifyImage from "../MagnifyImage";
import { getClassString } from "../../../Utils";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { IconButton } from "@material-ui/core";
import InfoButton from "@material-ui/icons/InfoOutlined";
import DescriptionBox from "../DescriptionBox";

const options = [];
for (let option = 0; option < 48; option++) {
  const newOption = (
    <MenuItem key={option} value={option}>
      {classLabels[getClassString(option)]}
    </MenuItem>
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
}));

const PlotCurves = ({model_name}) => {
    const currentModel = model_name;
    const [classId, setClassId] = React.useState('');
    const [curvePlots, setCurvePlots] = React.useState(null);
    const classes = useStyles();
    const [descriptionBox, setDescriptionBox] = React.useState(false);
    const handleDescriptionOpen = () => setDescriptionBox(true);
    const handleDescriptionClose = () => setDescriptionBox(false);
    const handleClassChange = (e) => {
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
                console.log(res);
              setCurvePlots(res);
            })
            .catch((err) => {
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
          <IconButton color="inherit" onClick={handleDescriptionOpen}>
            <InfoButton />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DescriptionBox
        descriptionBox={descriptionBox}
        handleDescriptionClose={handleDescriptionClose}
        description="Description of Confusion Matrix"
      />
      <br />
      <br />
      <br />
      <InputLabel id="demo-simple-select-placeholder-label-label">
        Class ID:
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
      >{options}
      </Select>
      <br /> 
      <br />
      <br />
      <div>
          {curvePlots && 
          <div>
              <Typography variant="h6">Precision Recall vs Confidence Path</Typography>
              <MagnifyImage url={curvePlots.precision_recall_vs_confidence_path} />

              <Typography variant="h6">Precision vs Recall Path</Typography>
              <MagnifyImage url={curvePlots.precision_vs_recall_path} />

              <Typography variant="h6">ROC Curve Path</Typography>
              <MagnifyImage url={curvePlots.roc_curve_path} />
          </div>
          }
      </div>
    </div>
  )
}

export default PlotCurves
