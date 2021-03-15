import React from "react";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  spacing: {
    margin: "30px 180px",
  },
  imgStyle: {
    width: "700px",
    height: "450px",
  },
}));

const Content = ({ classes, open, img }) => {
  const styles = useStyles();
  return (
    <main
      className={clsx(classes.content, {
        [classes.contentShift]: open,
      })}
    >
      <div className={classes.drawerHeader} />

      {img?.img?.length > 0 ? (
        <div className={styles.spacing}>
          <Typography variant="h6" align="center">Original image</Typography>
          <img src={img.pictures[0]} alt={'Loading'} className={styles.imgStyle} />
          <br></br>
          <br></br>
          <Typography variant="h6" align="center">Transformed image</Typography>
          <img src={img.pictures[0]} alt={'Loading'} className={styles.imgStyle} />
        </div>
      ) : (
        <div className={styles.spacing}>
          <Typography variant="h6">
            Please upload images in the sidebar menu.
          </Typography>
        </div>
      )}
    </main>
  );
};

export default Content;
