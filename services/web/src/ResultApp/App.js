import { Button, Grid, Tooltip, Typography } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import React, { useCallback, useEffect, useState } from "react";

import serverUrl from "../Constants/serverUrl";
import Navbar from "../DatasetApp/components/Navbar";

import TabPanel from "./TabPanel";
import UploadDescription from "./UploadDescription";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
}));

const App = (props) => {
  const [modelName, setModelName] = useState(null);
  const [model, setModel] = useState(null);
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modelIdx, setModelIdx] = useState("");
  const [modelOutput, setModelOutput] = useState(null);

  let classes = useStyles();
  classes = { ...classes, ...props.classes };
  const theme = props.theme;

  useEffect(() => {
    setLoading(true);
    fetch(`${serverUrl}models`)
      .then((res) => res.json())
      .then((res) => {
        setModels(res.models);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    models.length && modelIdx !== "" && setModelName(models[modelIdx]);
  }, [modelIdx, models]);

  const handleFileUpload = useCallback((e) => {
    setModel(e.target.files[0]);
  }, []);

  useEffect(() => {
    if (!modelName && !model) return;

    const formData = new FormData();

    if (modelName) {
      formData.append("model_name", modelName);
    } else {
      formData.append("model", model);
    }

    setLoading(true);

    fetch(`${serverUrl}model_output`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.model_name === undefined) res.model_name = modelName;
        setModelOutput(res);
        setLoading(false);
      })
      .catch(console.error);
  }, [model, modelName]);

  return (
    <>
      <Navbar
        classes={classes}
        open={false}
        theme={theme}
        showReset={!!modelOutput}
      />
      <div className={classes.drawerHeader} />
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
        &nbsp; &nbsp;
        <Typography variant="h6" color="inherit">
          Running the model on test dataset
        </Typography>
      </Backdrop>
      {!models.length && !modelOutput && (
        <>
          <Grid
            container
            justify="center"
            alignItems="center"
            style={{ minHeight: "250px" }}
          >
            <Tooltip title="Upload .pth file of your model">
              <Button variant="contained" component="label">
                Upload Model
                <input type="file" onChange={handleFileUpload} hidden />
              </Button>
            </Tooltip>
          </Grid>
          <UploadDescription />
        </>
      )}
      {!!models.length && !modelOutput && (
        <>
          <Grid
            container
            justify="center"
            alignItems="center"
            style={{ minHeight: "200px" }}
          >
            <FormControl className={classes.formControl}>
              <InputLabel>Select previously uploaded model</InputLabel>
              <Select
                value={modelIdx}
                onChange={(e) => setModelIdx(e.target.value)}
              >
                {models.map((model, idx) => (
                  <MenuItem key={idx} value={idx}>
                    {model}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Typography variant="h5">or</Typography>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button variant="contained" component="label">
              Upload Model
              <input type="file" onChange={handleFileUpload} hidden />
            </Button>
          </Grid>
          <UploadDescription />
        </>
      )}
      {modelOutput && <TabPanel {...modelOutput} />}
    </>
  );
};

export default App;
