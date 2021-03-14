import React, { useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import SelectTranformation from "./SelectTransformation";
import { makeStyles } from "@material-ui/core";
import augmentations from "../../Constants/augmentations";
import UploadImage from "./UploadImage";
import Params from "./Params";

const useStyle = makeStyles(() => ({
  spacing: {
    margin: "20px",
    width: 280,
  },
}));

const Sidebar = ({ classes, open, handleDrawerClose, theme }) => {
  const [transformation, setTransformation] = useState(augmentations[0]);

  const handleTransformationChange = (e) => {
    setTransformation(e.target.value);
  };

  const [params, setParams] = useState({});

  const handleParamsChange = (e) => {
    let newState = params;
    const changedProp = e.target.name;
    newState[changedProp] = e.target.value;
    setParams(newState);
  };

  const spacing = useStyle();
  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <UploadImage classes={spacing} />
      <Divider />
      <SelectTranformation
        classes={spacing}
        transformation={transformation}
        handleTransformationChange={handleTransformationChange}
      />
      <Divider />
      <Params
        classes={spacing}
        transformation={transformation}
        params={params}
        handleParamsChange={handleParamsChange}
      />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
