import { IconButton } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InfoButton from "@material-ui/icons/InfoOutlined";
import React from "react";

import DescriptionBox from "../DescriptionBox";
import MagnifyImage from "../MagnifyImage";
<<<<<<< HEAD
=======

>>>>>>> 9737654a22f08dbaa08cd88250e22aede42cef1c
import MostConfusedClasses from "./MostConfusedClasses";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

<<<<<<< HEAD
const ConfusionMatrix = ({confusion_matrix_path, most_confused_classes}) => {
=======
const ConfusionMatrix = ({ confusion_matrix_path, most_confused_classes }) => {
>>>>>>> 9737654a22f08dbaa08cd88250e22aede42cef1c
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
        description="Description of Confusion Matrix"
      />
      <br />
<<<<<<< HEAD
      <MagnifyImage url = {confusion_matrix_path}/>
      <br />
      <br />
      <br />
      <MostConfusedClasses most_confused_classes = {most_confused_classes} />
=======
      <MagnifyImage url={confusion_matrix_path} />
      <br />
      <br />
      <br />
      <MostConfusedClasses most_confused_classes={most_confused_classes} />
>>>>>>> 9737654a22f08dbaa08cd88250e22aede42cef1c
    </div>
  );
};

export default ConfusionMatrix;
