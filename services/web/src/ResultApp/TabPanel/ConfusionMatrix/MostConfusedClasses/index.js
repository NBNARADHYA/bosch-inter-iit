import { Typography } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import React, { useCallback } from "react";
import DescriptionBox from "../../DescriptionBox";
import classLabels from "../../../../Constants/classLabels";
import { getClassString } from "../../../../Utils";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import { IconButton } from "@material-ui/core";
import InfoButton from "@material-ui/icons/InfoOutlined";
import serverUrl from "../../../../Constants/serverUrl";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import InfiniteScroll from "react-infinite-scroll-component";
import SuggestionBox from "../../SuggestionBox";
import Description from "./Description";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    flexGrow: 1,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const MostConfusedClasses = ({
  most_confused_classes,
  model_name: modelName,
}) => {
  const classes = useStyles();
  const [descriptionBox, setDescriptionBox] = React.useState(false);
  const [mostConfusedClasses, setMostConfusedClasses] = React.useState(
    most_confused_classes
  );

  const handleDescriptionClose = () => setDescriptionBox(false);
  const fetchMore = useCallback(() => {
    const data = new FormData();
    data.append("model_name", modelName);
    data.append("no_most", mostConfusedClasses.length + 10);

    fetch(`${serverUrl}most_confused_classes`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => setMostConfusedClasses(res.most_confused_classes))
      .catch(console.error);
  }, [mostConfusedClasses.length]);

  return (
    <>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Most Confused Classes
          </Typography>
          <IconButton color="inherit" onClick={() => setDescriptionBox(true)}>
            <InfoButton />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DescriptionBox
        descriptionBox={descriptionBox}
        handleDescriptionClose={handleDescriptionClose}
        title="Most K confused classes"
      >
        <Description />
      </DescriptionBox>
      <br />
      {!!mostConfusedClasses.length && (
        <SuggestionBox title="Suggestion">
          "{classLabels[getClassString(mostConfusedClasses[0][1])]}" is
          classified as "
          {classLabels[getClassString(mostConfusedClasses[0][2])]}" the most
          number of times. The following can be done to remove the confusion :
          <ul>
            <li>
              Increasing number of training Image of "
              {classLabels[getClassString(mostConfusedClasses[0][1])]}" by
              surveying or by augmentation.
            </li>
            <li>
              Penalizing misclassifying "
              {classLabels[getClassString(mostConfusedClasses[0][1])]}" image in
              the loss function.
            </li>
          </ul>
        </SuggestionBox>
      )}
      <br />
      <List className={classes.root}>
        <InfiniteScroll
          dataLength={mostConfusedClasses.length}
          next={fetchMore}
          hasMore={true}
          loader={
            <Backdrop className={classes.backdrop} open={true}>
              <CircularProgress color="primary" />
            </Backdrop>
          }
        >
          {mostConfusedClasses.map((each, idx) => {
            const X = each[0];
            const classA = classLabels[getClassString(each[1])];
            const classB = classLabels[getClassString(each[2])];
            const urlA = `class_images\\${each[1]}.png`;
            const urlB = `class_images\\${each[2]}.png`;

            return (
              <ListItem key={idx}>
                <ListItemText>
                  {">>"} {X}% images of <strong>{classA}</strong> are being
                  predicted to be of <strong>{classB}</strong>.
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        margin: "25px",
                      }}
                    >
                      <img src={urlA} width="100px" />
                      {classA}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        margin: "25px",
                      }}
                    >
                      <img src={urlB} height="100px" />
                      {classB}
                    </div>
                  </div>
                  <br />
                  <br />
                </ListItemText>
              </ListItem>
            );
          })}
        </InfiniteScroll>
      </List>
    </>
  );
};

export default MostConfusedClasses;
