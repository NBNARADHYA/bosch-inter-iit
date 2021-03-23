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
  maintainAspectRatio: false  
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
        description="Description of Confidence Class"
      />
    <Bar data={data} options={options} width={1400} height={400} />  
      <br/>      
    </div>
  );
};

export default ClasswiseAccuracy;
