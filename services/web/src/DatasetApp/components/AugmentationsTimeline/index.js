import { makeStyles } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Timeline from "@material-ui/lab/Timeline";
import React, { useCallback, useEffect, useRef, useState } from "react";

import serverUrl from "../../../Constants/serverUrl";
import { removeQueryParams } from "../../../Utils";

import TimelineStage from "./TimelineStage";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
  },
  drawerPaper: { width: "35vw" },
  closeMenuButton: {
    marginLeft: "auto",
    marginRight: 0,
  },
  drawer: {
    width: "35vw",
    flexShrink: 0,
  },
}));

function AugmentationsTimeline(props) {
  const { isOpen, toggleDrawer, history, setHistory, img } = props;
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const closeDrawer = () => {
    if (isOpen) toggleDrawer();
  };

  const lastRef = useRef(null);

  const regenerateImage = useCallback(
    (idx, newHistory) => {
      if (!img || !img.img || !img.img.length || idx >= newHistory.length) {
        return;
      }
      const data = new FormData();
      if (idx > 0) {
        data.append("img_url", removeQueryParams(newHistory[idx - 1].image));
        data.append(
          "parameters",
          JSON.stringify(JSON.stringify(newHistory[idx].parameters))
        );
        data.append("transformation", newHistory[idx].id);
        data.append("transformation_step", idx - 1);
      } else {
        data.append("image", img.img[0]);
        data.append(
          "parameters",
          JSON.stringify(JSON.stringify(newHistory[idx].parameters))
        );
        data.append("transformation", newHistory[idx].id);
      }

      fetch(`${serverUrl}transform_image?preview=false`, {
        method: "POST",
        credentials: "include",
        body: data,
      })
        .then((res) => res.json())
        .then(({ img_path }) => {
          let modifiedHistory = newHistory.map((h, i) => {
            if (i === idx) return { ...h, image: `${img_path}?${Date.now()}` };
            else return h;
          });
          setHistory(modifiedHistory);
          regenerateImage(idx + 1, modifiedHistory);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [img, setHistory]
  );

  useEffect(() => {
    // scroll to bottom
    if (isOpen && lastRef.current) {
      setTimeout(() => {
        lastRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      }, 100);
    }
  }, [isOpen, history]);

  const classes = useStyles();
  return (
    <Drawer
      anchor="right"
      open={isOpen}
      className={classes.drawer}
      onClose={closeDrawer}
      classes={{ paper: classes.drawerPaper }}
      variant="persistent"
    >
      {" "}
      <div className={classes.root}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={10}>
            <Typography variant="h5" component="h1" align="center">
              & nbsp; Applied Augmentations
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <IconButton
              onClick={closeDrawer}
              className={classes.closeMenuButton}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
        {(!history || !history.length) && (
          <Grid container item xs={12} align="center" justify="center">
            <Typography
              variant="body2"
              align="center"
              style={{ marginTop: "35vh" }}
            >
              No augmentations applied yet.
            </Typography>
          </Grid>
        )}
        {history && !!history.length && (
          <Timeline align="alternate">
            {history.map((aug, i) => {
              if (i + 1 === history.length) return null;
              else
                return (
                  <TimelineStage
                    key={i.toString()}
                    handleMouseOver={() => setSelectedIndex(i)}
                    isSelected={selectedIndex === i}
                    isLast={false}
                    handleRestore={() => {
                      const newHistory = history.filter((h, idx) => idx <= i);
                      setHistory(newHistory);
                    }}
                    handleRemove={() => {
                      const newHistory = history.filter((h, idx) => idx !== i);
                      setHistory(newHistory);
                      regenerateImage(i, newHistory);
                    }}
                    image={aug.image}
                    name={aug.name}
                    parameters={aug.parameters}
                    even={i % 2 === 0}
                  />
                );
            })}
            <TimelineStage
              ref={lastRef}
              handleMouseOver={() => setSelectedIndex(history.length - 1)}
              isSelected={selectedIndex === history.length - 1}
              isLast
              handleRemove={() => {
                const newHistory = history.filter(
                  (h, idx) => idx !== history.length - 1
                );
                setHistory(newHistory);
              }}
              image={history[history.length - 1].image}
              name={history[history.length - 1].name}
              parameters={history[history.length - 1].parameters}
              even={(history.length - 1) % 2 === 0}
            />
          </Timeline>
        )}
      </div>
    </Drawer>
  );
}

export default AugmentationsTimeline;
