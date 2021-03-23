import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { IconButton } from "@material-ui/core";
import InfoButton from "@material-ui/icons/InfoOutlined";
import DescriptionBox from "../DescriptionBox";
import MagnifyImage from "../MagnifyImage";
import MostConfusedClasses from "./MostConfusedClasses";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const ConfusionMatrix = ({response}) => {
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
      <MagnifyImage url = {response.confusion_matrix_path}/>
      <br />
      <br />
      <br />
      <MostConfusedClasses most_confused_classes = {response.most_confused_classes} />
    </div>
  );
};

export default ConfusionMatrix;
