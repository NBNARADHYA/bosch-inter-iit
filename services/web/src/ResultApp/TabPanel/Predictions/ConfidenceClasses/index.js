import {IconButton} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import {makeStyles} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InfoButton from "@material-ui/icons/InfoOutlined";
import React from "react";

import DescriptionBox from "../../DescriptionBox";

import CarouselData from "./CarouselData";

const useStyles = makeStyles((theme) => ({
                               root : {
                                 flexGrow : 1,
                               },
                               title : {
                                 flexGrow : 1,
                               },
                             }));

const ConfidenceClasses = ({top_5_classes}) => {
  const classes = useStyles();
  const [descriptionBox, setDescriptionBox] = React.useState(false);
  const handleDescriptionOpen = () => setDescriptionBox(true);
  const handleDescriptionClose = () => setDescriptionBox(false);
  return (
      <div><AppBar position = "static" color = "transparent"><Toolbar>
      <Typography variant = "h6" className = {classes.title}>Top 5 Confidence
          Classes<
              /Typography>
          <IconButton color="inherit" onClick={handleDescriptionOpen}>
            <InfoButton />
      </IconButton>
        </Toolbar>
      </AppBar>
      <DescriptionBox
        descriptionBox={descriptionBox}
        handleDescriptionClose={handleDescriptionClose}
        description="Description of Confidence Class"
      />
      <CarouselData top_5_classes = { top_5_classes } />
    </div>);
};

export default ConfidenceClasses;
