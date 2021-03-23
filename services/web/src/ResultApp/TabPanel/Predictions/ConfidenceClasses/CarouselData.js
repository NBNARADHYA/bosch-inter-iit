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
=======
import React from "react";
import Carousel from "react-material-ui-carousel";

import classLabels from "../../../../Constants/classLabels";
import { getClassString } from "../../../../Utils";
import ImageCards from "../../ImageCards";
>>>>>>> 9737654a22f08dbaa08cd88250e22aede42cef1c

const useStyles = makeStyles(() => ({
  carousel: {
    maxWidth: "1000px",
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


=======
>>>>>>> 9737654a22f08dbaa08cd88250e22aede42cef1c
function TableComponent(classes) {
  const rows = classes.data.map((each, i) => {
    return (
      <TableRow key={i}>
        <TableCell component="th" scope="row">
          {classLabels[getClassString(each)]}
        </TableCell>
        {/* <TableCell align="right">{each.score}</TableCell> */}
      </TableRow>
    );
  });
  return (
    <div>
<<<<<<< HEAD
      <TableContainer component={Paper} style={{width:"247px"}} >
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell><strong>Most Confidence Classes</strong></TableCell>
=======
      <TableContainer component={Paper} style={{ width: "260px" }}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Most Confidence Classes</strong>
              </TableCell>
>>>>>>> 9737654a22f08dbaa08cd88250e22aede42cef1c
              {/* <TableCell align="right">CONFIDENCE</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>{rows}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

<<<<<<< HEAD
const CarouselData = ({top_5_classes}) => {
  let data = top_5_classes;
  data = Object.keys(data).map((img) => {
    const url = img.replace("ppm","png");
    return ({
      "img":url,
      "classes":top_5_classes[img]
    });
  })
  const classes = useStyles();

  let cardGroup = [];
  for (let i = 0; i < data.length - 3; i+=3) {
    const newGroup = (
      <div style={{ display: "flex", margin:"auto" ,paddingRight:"50px", paddingLeft:"50px" }}>
=======
const CarouselData = ({ top_5_classes }) => {
  let data = top_5_classes;
  data = Object.keys(data).map((img) => {
    const url = img.replace("ppm", "png");
    return {
      img: url,
      classes: top_5_classes[img],
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
          data={<TableComponent data={data[i].classes} />}
        />
        <ImageCards
          key={i}
          img={data[i + 1].img}
          data={<TableComponent data={data[i + 1].classes} />}
        />
        <ImageCards
          key={i}
          img={data[i + 2].img}
          data={<TableComponent data={data[i + 2].classes} />}
        />
      </div>
    );
    cardGroup.push(newGroup);
  }
  const restImg = [];
<<<<<<< HEAD
  for(let i=data.length -1;i>=0&&i>=data.length-3;i--){
    restImg.push(<ImageCards
      key={i}
      img={data[i].img}
      data={<TableComponent data={data[i].classes} />}
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
        data={<TableComponent data={data[i].classes} />}
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
