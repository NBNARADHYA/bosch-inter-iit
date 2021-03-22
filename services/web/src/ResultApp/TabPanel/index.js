import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import React from "react";

import {tabs} from "./tabs";

function TabPanel(props) {
  const {children, value, index, ...other} = props;

  return (
    <div
  role = "tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 1300,
    margin: "auto",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function TabsWrappedLabel() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="wrapped label tabs example"
        >
          {tabs.map(({ name }, idx) => (
            <Tab key={idx} value={idx} label={name} />
          ))
}
</Tabs>
      </AppBar>{" "} {tabs.map(({ component }, idx) => (
        <TabPanel key={idx} value={value} index={idx}>
          {component()}
        </TabPanel>
      ))}
    </div>
  );
}
