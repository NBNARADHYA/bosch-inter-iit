<<<<<<< HEAD
import React from "react";
=======
import { Tab } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
>>>>>>> 9737654a22f08dbaa08cd88250e22aede42cef1c
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
<<<<<<< HEAD
import Paper from "@material-ui/core/Paper";
import { Tab } from "@material-ui/core";
import classLabels from "../../../../Constants/classLabels";
import ImageCards from "../../ImageCards";
import Carousel from "react-material-ui-carousel";
import { getClassString } from "../../../../Utils";
import serverUrl from "../../../../Constants/serverUrl";

const useStyles = makeStyles(() => ({
  carousel: {
    maxWidth: "1020px",
=======
import React from "react";
import Carousel from "react-material-ui-carousel";

import classLabels from "../../../../Constants/classLabels";
import serverUrl from "../../../../Constants/serverUrl";
import { getClassString } from "../../../../Utils";
import ImageCards from "../../ImageCards";

const useStyles = makeStyles(() => ({
  carousel: {
    maxWidth: "1000px",
>>>>>>> 9737654a22f08dbaa08cd88250e22aede42cef1c
    margin: "40px auto 40px",
  },
  spacing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
  },
}));

<<<<<<< HEAD


function TableComponent(data) {
  return (
    <div>
      <TableContainer component={Paper} style={{width:"247px"}}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row" style={{color:"red"}}>
                <strong>Predicted</strong>
              </TableCell>
              <TableCell align="right">{classLabels[getClassString(data.data.predicted)]}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" style={{color:"green"}}>
                <strong>Actual</strong>
              </TableCell>
              <TableCell align="right">{classLabels[getClassString(data.data.actual)]}</TableCell>
=======
function TableComponent(data) {
  return (
    <div>
      <TableContainer
        component={Paper}
        style={{
          width: "260px",
        }}
      >
        <Table size="small" aria-label="a dense table">
          <TableHead></TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row" style={{ color: "red" }}>
                <strong>Predicted</strong>
              </TableCell>
              <TableCell align="right">
                {classLabels[getClassString(data.data.predicted)]}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" style={{ color: "green" }}>
                <strong>Actual</strong>
              </TableCell>
              <TableCell align="right">
                {classLabels[getClassString(data.data.actual)]}
              </TableCell>
>>>>>>> 9737654a22f08dbaa08cd88250e22aede42cef1c
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                <strong>Confidence</strong>
              </TableCell>
              <TableCell align="right">{data.data.confidence}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

<<<<<<< HEAD
const CarouselData = ({wrong_pred}) => {
  let data = wrong_pred;
  data = data.map((each) => {
    const url = `${serverUrl}test_dataset/${each.image.replace("ppm","png")}`;
    return ({
      "img":url,
      "predicted":each.predicted,
      "actual": each.actual,
      "confidence":each.confidence
    });
  })
  const classes = useStyles();

  let cardGroup = [];
  for (let i = 0; i < data.length - 3; i+=3) {
    const newGroup = (
      <div style={{ display: "flex", margin:"auto" ,paddingRight:"50px", paddingLeft:"50px" }}>
=======
const CarouselData = ({ wrong_pred }) => {
  let data = wrong_pred;
  data = data.map((each) => {
    const url = `${serverUrl}test_dataset/${each.image.replace("ppm", "png")}`;
    return {
      img: url,
      predicted: each.predicted,
      actual: each.actual,
      confidence: each.confidence,
    };
  });
  const classes = useStyles();

  let cardGroup = [];
  for (let i = 0; i < data.length - 3; i += 3) {
    const newGroup = (
      <div style={{ display: "flex", margin: "auto" }}>
>>>>>>> 9737654a22f08dbaa08cd88250e22aede42cef1c
        <ImageCards
          key={i}
          img={data[i].img}
          data={<TableComponent data={data[i]} />}
        />
        <ImageCards
          key={i}
          img={data[i + 1].img}
          data={<TableComponent data={data[i + 1]} />}
        />
        <ImageCards
          key={i}
          img={data[i + 2].img}
          data={<TableComponent data={data[i + 2]} />}
        />
      </div>
    );
    cardGroup.push(newGroup);
  }
  const restImg = [];
<<<<<<< HEAD
  for(let i=data.length-1;i>=0&&i>=data.length-3;i--){
    restImg.push(<ImageCards
      key={i}
      img={data[i].img}
      data={<TableComponent data={data[i]} />}
    />);
  }
  const lastGrp = (
    <div style={{ display: "flex", margin:"auto" ,paddingRight:"50px", paddingLeft:"50px" }}>
      {restImg.map(each => each)}
    </div>
  )
  cardGroup.push(lastGrp);
  return <Carousel className={classes.carousel} indicators={false} autoPlay={false} >{cardGroup}</Carousel>;
=======
  for (let i = data.length - 1; i >= 0 && i >= data.length - 3; i--) {
    restImg.push(
      <ImageCards
        key={i}
        img={data[i].img}
        data={<TableComponent data={data[i]} />}
      />
    );
  }
  const lastGrp = (
    <div style={{ display: "flex" }}>{restImg.map((each) => each)}</div>
  );
  cardGroup.push(lastGrp);
  return (
    <Carousel className={classes.carousel} indicators={false} autoPlay={false}>
      {cardGroup}
    </Carousel>
  );
>>>>>>> 9737654a22f08dbaa08cd88250e22aede42cef1c
};

export default CarouselData;
