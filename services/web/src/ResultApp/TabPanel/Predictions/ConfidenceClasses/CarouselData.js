import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import Carousel from "react-material-ui-carousel";

import classLabels from "../../../../Constants/classLabels";
import { getClassString } from "../../../../Utils";
import ImageCards from "../../ImageCards";

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

function TableComponent(data) {
  const rows = data.data.classes.map((each, i) => {
    return (
      <TableRow key={i}>
        <TableCell component="th" scope="row">
          {classLabels[getClassString(each)]}
        </TableCell>
        <TableCell align="right">{data.data.scores[i]}</TableCell>
      </TableRow>
    );
  });
  return (
    <div>
      <TableContainer component={Paper} style={{ width: "247px" }}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {/* <TableCell><strong>Most Confidence Classes</strong></TableCell> */}
              {/* <TableCell align="right">CONFIDENCE</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>{rows}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

const CarouselData = ({ top_5_classes }) => {
  let data = top_5_classes;
  data = Object.keys(data).map((img) => {
    return {
      img,
      classes: top_5_classes[img][0],
      scores: top_5_classes[img][1],
    };
  });
  const classes = useStyles();

  let cardGroup = [];
  for (let i = 0; i < data.length - 3; i += 3) {
    const newGroup = (
      <div
        style={{
          display: "flex",
          margin: "auto",
          paddingRight: "50px",
          paddingLeft: "50px",
        }}
      >
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
    <div
      style={{
        display: "flex",
        margin: "auto",
        paddingRight: "50px",
        paddingLeft: "50px",
      }}
    >
      {restImg.map((each) => each)}
    </div>
  );
  cardGroup.push(lastGrp);
  return (
    <Carousel className={classes.carousel} indicators={false} autoPlay={false}>
      {cardGroup}
    </Carousel>
  );
};

export default CarouselData;
