import {
  Backdrop,
  CircularProgress,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import InfoButton from "@material-ui/icons/InfoOutlined";
import React, { useEffect } from "react";
import FormControl from '@material-ui/core/FormControl';
import classLabels from "../../../Constants/classLabels";
import serverUrl from "../../../Constants/serverUrl";
import { getClassString } from "../../../Utils";
import DescriptionBox from "../DescriptionBox";
import MagnifyImage from "../MagnifyImage";
import PlotDescription from "./PlotDescription";

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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  dropDown: {
      marginLeft: "20px",
      flexGrow: 1,
  }  
}));

const PlotCurves = ({ model_name }) => {
  const currentModel = model_name;
  const classes = useStyles();
  const [classId, setClassId] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [curvePlots, setCurvePlots] = React.useState(null);
  const [descriptionBox, setDescriptionBox] = React.useState(false);
  const handleDescriptionOpen = () => setDescriptionBox(true);
  const handleDescriptionClose = () => setDescriptionBox(false);

  const fetchClassChange = (classLabel) => {
    setLoading(true);
    setClassId(classLabel);
    const data = new FormData();
    data.append("model_name", currentModel);
    data.append("class_id", classLabel);
    fetch(`${serverUrl}plot_curves`, {
      method: "POST",
      credentials: "include",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        setCurvePlots(res);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }

  useEffect(() => {
    fetchClassChange(0);
  },[])

  const handleClassChange = (e) => {
    fetchClassChange(e.target.value)
  };

  return (
    <div>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Curves
          </Typography>
          <span className={classes.dropDown}>
                    <FormControl variant="filled" size="large">
                      <InputLabel id="select-class">
                        Select class
                      </InputLabel>
                      <Select
                        labelId="select-class"
                        id="select-class-label"
                        name="classId"
                        defaultValue={0}
                        onChange={(e, val) => handleClassChange(e, val)}
                      >
                        {options}
                      </Select>
                    </FormControl>
          </span>          
          <IconButton color="inherit" onClick={handleDescriptionOpen}>
            <InfoButton />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DescriptionBox
        descriptionBox={descriptionBox}
        handleDescriptionClose={handleDescriptionClose}
        children={<PlotDescription/>}
        title=""
      />
      <br />
      <div style={{ margin: "auto" }}>
        {loading && (
          <Backdrop className={classes.backdrop} open={true}>
            <CircularProgress color="inherit" />
            &nbsp; &nbsp; <Typography variant="h6">
              Loading ROC curve and precision-recall curves
            </Typography>
          </Backdrop>
        )}
        {curvePlots && (
          <div style={{ margin: "auto" }}>
            <Typography variant="h6">
            Precision vs Recall Curve
            </Typography>
            <MagnifyImage
              url={curvePlots.precision_recall_vs_confidence_path}
              width={1500}
              height={1500}
            />
            <Typography variant="h6">Precision Recall vs Confidence Curve</Typography>
            <MagnifyImage url={curvePlots.precision_vs_recall_path} width={1500} height={1500}/>
            <Typography variant="h6">ROC Curve</Typography>
            <MagnifyImage url={curvePlots.roc_curve_path}  width={1500} height={1500}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlotCurves;
