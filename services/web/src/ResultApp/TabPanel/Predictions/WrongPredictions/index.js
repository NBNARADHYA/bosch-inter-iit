import { IconButton } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InfoButton from "@material-ui/icons/InfoOutlined";
<<<<<<< HEAD:services/web/src/ResultApp/TabPanel/Predictions/WrongPredictions/index.js
import DescriptionBox from "../../DescriptionBox";
=======
import React from "react";

import DescriptionBox from "../../DescriptionBox";

>>>>>>> 9737654a22f08dbaa08cd88250e22aede42cef1c:services/web/src/ResultApp/TabPanel/ConfusedClasses/index.js
import CarouselData from "./CarouselData";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

<<<<<<< HEAD:services/web/src/ResultApp/TabPanel/Predictions/WrongPredictions/index.js
const WrongPredictions = ({wrong_pred}) => {
=======
const WrongPredictions = ({ wrong_pred }) => {
>>>>>>> 9737654a22f08dbaa08cd88250e22aede42cef1c:services/web/src/ResultApp/TabPanel/ConfusedClasses/index.js
  const classes = useStyles();
  const [descriptionBox, setDescriptionBox] = React.useState(false);
  const handleDescriptionOpen = () => setDescriptionBox(true);
  const handleDescriptionClose = () => setDescriptionBox(false);
  return (
    <div>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Wrong Predictions
          </Typography>
          <IconButton color="inherit" onClick={handleDescriptionOpen}>
            <InfoButton />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DescriptionBox
        descriptionBox={descriptionBox}
        handleDescriptionClose={handleDescriptionClose}
        description="Description of Confused Class"
      />
<<<<<<< HEAD:services/web/src/ResultApp/TabPanel/Predictions/WrongPredictions/index.js
      <CarouselData wrong_pred = {wrong_pred}/>
=======
      <CarouselData wrong_pred={wrong_pred} />
>>>>>>> 9737654a22f08dbaa08cd88250e22aede42cef1c:services/web/src/ResultApp/TabPanel/ConfusedClasses/index.js
    </div>
  );
};

export default WrongPredictions;
