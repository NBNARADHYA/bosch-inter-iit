import { IconButton } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InfoButton from "@material-ui/icons/InfoOutlined";
import React from "react";

import DescriptionBox from "../DescriptionBox";
import MagnifyImage from "../MagnifyImage";
import Description from "./Description";
import Histogram from "./Histogram/";
import MostConfusedClasses from "./MostConfusedClasses/";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const ConfusionMatrix = ({ confusion_matrix_path, most_confused_classes, conf_matrix, model_name }) => {
  const classes = useStyles();
  const [descriptionBox, setDescriptionBox] = React.useState(false);
  const handleDescriptionOpen = () => setDescriptionBox(true);
  const handleDescriptionClose = () => setDescriptionBox(false);
  return (
    <div>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Confusion Matrix
          </Typography>
          <IconButton color="inherit" onClick={handleDescriptionOpen}>
            <InfoButton />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DescriptionBox
        descriptionBox={descriptionBox}
        handleDescriptionClose={handleDescriptionClose}
        title="Confusion Matrix"
      >
        <Description />
      </DescriptionBox>
      <br />
      <MagnifyImage url={confusion_matrix_path} />
      <br />
      <Histogram conf_matrix={conf_matrix} />
      <br />
      <MostConfusedClasses most_confused_classes={most_confused_classes} model_name={model_name} />
    </div>
  );
};

export default ConfusionMatrix;
