import { IconButton } from "@material-ui/core";
import { Bar } from '@reactchartjs/react-chart.js'
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InfoButton from "@material-ui/icons/InfoOutlined";
import React, { useState } from "react";
import colours from "../../../Constants/colours";
import DescriptionBox from "../DescriptionBox";
import classLabels from "../../../Constants/classLabels"
import AccuracyDescription from "./AccuracyDescription";
import SuggestionBox from "../SuggestionBox";

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  }  ,
  maintainAspectRatio: true
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const ClasswiseAccuracy = ({ worst_acc_classes }) => {
  const { x, y } = worst_acc_classes;
  const classes = useStyles();
  const [descriptionBox, setDescriptionBox] = useState(false);
  const handleDescriptionOpen = () => setDescriptionBox(true);
  const handleDescriptionClose = () => setDescriptionBox(false);
  const data = {
    labels: x.map((id) => classLabels[id]),
    datasets: [
      {
        label: 'Accuracy',
        data: y,
        backgroundColor: x.map((t,i) => colours[i%colours.length])
      },
    ],
  }

  return (
    <div>
      <br/>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
          Class-wise Accuracy on Test data
          </Typography>
          <IconButton color="inherit" onClick={handleDescriptionOpen}>
            <InfoButton />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DescriptionBox
        descriptionBox={descriptionBox}
        handleDescriptionClose={handleDescriptionClose}
        title="Class-wise accuracy on test data"
        children={<AccuracyDescription/>}
      />
      <br/>
    <Bar data={data} options={options} width={1400} height={400} />  
    <br/>
    {x.length>2 && <SuggestionBox title="Suggestion">
     Class "{classLabels[x[0]]}" and "{classLabels[x[1]]}" are lowest in accuracy. Improving their performance will improve the overall metrics. This can be done by : <br/>
     <ul>
       <li>identify general patterns by visual inspection in images of these classes, which is causing the failure.</li>
       <li>add more images of that class in training by surveying or by augmentation.</li>
       <li>penalizing misclassifying these classes in the loss function</li>
     </ul>
    </SuggestionBox>}
      <br/>      
    </div>
  );
};

export default ClasswiseAccuracy;
