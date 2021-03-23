import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    width: 300,
    height: 420,
    margin: "10px",
  },
  media: {
    height: 150,
  },
  spacing: {
    display:"flex",
    alignItems:"center",
    height: 270
  }
});

export default function ImageCards({ img, data }) {
  const classes = useStyles();
  console.log(img, data);
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={img} />
        <div className={classes.spacing}>
          <CardContent>{data}</CardContent>
        </div>
      </CardActionArea>
    </Card>
  );
}
