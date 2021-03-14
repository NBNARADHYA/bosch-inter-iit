import React, { useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import SelectTranformation from "./SelectTransformation";
import { makeStyles } from "@material-ui/core";
import augmentations from "../../Constants/augmentations";
import UploadImage from "./UploadImage";
import Params from "./Params";
import { Button, ButtonGroup } from "@material-ui/core";

const useStyle = makeStyles(() => ({
  spacing: {
    margin: "20px",
    width: 280,
  },
  slider: {
    padding: "0px",
  },
}));

const Sidebar = ({
  classes,
  open,
  handleDrawerClose,
  theme,
  img,
  handleImgChange,
}) => {
  const [params, setParams] = useState({});

  const handleParamsChange = (prop, val) => {
    let newState = params;
    newState[prop] = val;
    setParams(newState);
    // console.log(params);
  };

  const [transformation, setTransformation] = useState(augmentations[0]);

  const handleTransformationChange = (e) => {
    setTransformation(e.target.value);
    setParams({});
    // let { parameters } = transformation;
    // parameters = JSON.parse(parameters);
    // parameters.forEach((param) => {
    //   handleParamsChange(param.name, param.default);
    // });
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
      <UploadImage
        classes={spacing}
        img={img}
        handleImgChange={handleImgChange}
      />
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
      <Divider />
      <ButtonGroup
        color="primary"
        aria-label="outlined secondary button group"
        className={spacing.spacing}
        size="large"
      >
        <Button>Apply</Button>
        <Button>Reset</Button>
      </ButtonGroup>
    </Drawer>
  );
};

export default Sidebar;
