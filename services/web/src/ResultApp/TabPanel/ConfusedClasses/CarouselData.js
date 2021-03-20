import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Tab } from "@material-ui/core";
import classLabels from "../../../Constants/classLabels";
import ImageCards from "../ImageCards";
import Carousel from "react-material-ui-carousel";

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

const dummyData = [
  {
    img: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
    data: [
      {
        class: "00000",
        score: "1.0",
      },
      {
        class: "00001",
        score: "1.0",
      },
      {
        class: "00002",
        score: "0.9",
      },
      {
        class: "00003",
        score: "0.8",
      },
      {
        class: "00004",
        score: "0.6",
      },
    ],
  },
  {
    img:
      "https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    data: [
      {
        class: "00000",
        score: "1.0",
      },
      {
        class: "00001",
        score: "1.0",
      },
      {
        class: "00002",
        score: "0.9",
      },
      {
        class: "00003",
        score: "0.8",
      },
      {
        class: "00004",
        score: "0.6",
      },
    ],
  },
  {
    img:
      "https://images.unsplash.com/photo-1473172707857-f9e276582ab6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    data: [
      {
        class: "00000",
        score: "1.0",
      },
      {
        class: "00001",
        score: "1.0",
      },
      {
        class: "00002",
        score: "0.9",
      },
      {
        class: "00003",
        score: "0.8",
      },
      {
        class: "00004",
        score: "0.6",
      },
    ],
  },
  {
    img: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
    data: [
      {
        class: "00000",
        score: "1.0",
      },
      {
        class: "00001",
        score: "1.0",
      },
      {
        class: "00002",
        score: "0.9",
      },
      {
        class: "00003",
        score: "0.8",
      },
      {
        class: "00004",
        score: "0.6",
      },
    ],
  },
];

function TableComponent(data) {
  const rows = data.data.map((each, i) => {
    return (
      <TableRow key={i}>
        <TableCell component="th" scope="row">
          {classLabels[each.class]}
        </TableCell>
        <TableCell align="right">{each.score}</TableCell>
      </TableRow>
    );
  });
  return (
    <div>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>CLASS</TableCell>
              <TableCell align="right">CONFUSED</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{rows}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

const CarouselData = () => {
  const classes = useStyles();

  let cardGroup = [];
  for (let i = 0; i < dummyData.length - 3; i++) {
    const newGroup = (
      <div style={{ display: "flex" }}>
        <ImageCards
          key={i}
          img={dummyData[i].img}
          data={<TableComponent data={dummyData[i].data} />}
        />
        <ImageCards
          key={i}
          img={dummyData[i + 1].img}
          data={<TableComponent data={dummyData[i + 1].data} />}
        />
        <ImageCards
          key={i}
          img={dummyData[i + 2].img}
          data={<TableComponent data={dummyData[i + 2].data} />}
        />
      </div>
    );
    cardGroup.push(newGroup);
  }

  for (let i = 0; i < dummyData.length - 3; i++) {
    const newGroup = (
      <div style={{ display: "flex" }}>
        <ImageCards
          key={i}
          img={dummyData[i].img}
          data={<TableComponent data={dummyData[i].data} />}
        />
        <ImageCards
          key={i}
          img={dummyData[i + 1].img}
          data={<TableComponent data={dummyData[i + 1].data} />}
        />
        <ImageCards
          key={i}
          img={dummyData[i + 2].img}
          data={<TableComponent data={dummyData[i + 2].data} />}
        />
      </div>
    );
    cardGroup.push(newGroup);
  }

  for (let i = 0; i < dummyData.length - 3; i++) {
    const newGroup = (
      <div style={{ display: "flex" }}>
        <ImageCards
          key={i}
          img={dummyData[i].img}
          data={<TableComponent data={dummyData[i].data} />}
        />
        <ImageCards
          key={i}
          img={dummyData[i + 1].img}
          data={<TableComponent data={dummyData[i + 1].data} />}
        />
        <ImageCards
          key={i}
          img={dummyData[i + 2].img}
          data={<TableComponent data={dummyData[i + 2].data} />}
        />
      </div>
    );
    cardGroup.push(newGroup);
  }
  return <Carousel className={classes.carousel}>{cardGroup}</Carousel>;
};

export default CarouselData;
