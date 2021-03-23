import {Tab} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import Carousel from "react-material-ui-carousel";

import classLabels from "../../../../Constants/classLabels";
import serverUrl from "../../../../Constants/serverUrl";
import {getClassString} from "../../../../Utils";
import ImageCards from "../../ImageCards";

const useStyles = makeStyles(() => ({
                               carousel : {
                                 maxWidth : "1020px",
                                 margin : "40px auto 40px",
                               },
                               spacing : {
                                 display : "flex",
                                 justifyContent : "center",
                                 alignItems : "center",
                                 marginLeft : "auto",
                               },
                             }));

function TableComponent(data) {
  return (
    <div>
      <TableContainer component={Paper} style={{
    width: "247px"}}>
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

const CarouselData = ({wrong_pred}) => {
  let data = wrong_pred;
  data = data.map((each) => {
    const url = `${serverUrl}test_dataset/${
    each.image.replace("ppm", "png")}`;
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
};

export default CarouselData;
