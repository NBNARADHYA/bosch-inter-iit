import { IconButton } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InfoButton from "@material-ui/icons/InfoOutlined";
import React, { useState } from "react";
import classLabels from "../../../Constants/classLabels";
import DescriptionBox from "../DescriptionBox";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import colours from "../../../Constants/colours";
import { Bar } from "@reactchartjs/react-chart.js";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    dropDown: {
        marginLeft: "20px",
        flexGrow: 1,
    },
}));

const options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: false,
                },
            },
        ],
    },
    maintainAspectRatio: true,
};

const classIndices = [...Array(48).fill(0).keys()];

export default function Histogram({ conf_matrix }) {
    const classes = useStyles()
    const [descriptionBox, setDescriptionBox] = React.useState(false);
    const [currClass, setCurrClass] = useState(0)

    const handleDescriptionOpen = () => setDescriptionBox(true);
    const handleDescriptionClose = () => setDescriptionBox(false);

    const barData = {
      labels: classIndices.map(i => classLabels[i.toString().padStart(5, "0")]),
      datasets: [
        {
          label: "#Predicted Samples",
          data: conf_matrix[currClass],
          backgroundColor: classIndices.map((_, i) => colours[i % colours.length]),
        },
      ],
    };

    console.log(barData)

    return (
        <>
            <AppBar position="static" color="transparent">
                <Toolbar>
                <Typography variant="h6">
                    Histogram
                </Typography>
                <span className={classes.dropDown}>
                    <FormControl variant="filled" size="small">
                        <InputLabel>Select Class</InputLabel>
                        <Select
                            value={currClass}
                            onChange={(e) => setCurrClass(+e.target.value)}
                        >
                            {Object.entries(classLabels).map(([k, v]) => (
                                <MenuItem key={+k} value={+k}>{v}</MenuItem>
                            ))}
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
                description="Description of Histogram"
            />
            <br />
            <Bar data={barData} options={options} width={1500} height={600} />
        </>
    )
}