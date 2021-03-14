import React from "react";
import { FormControlLabel, Checkbox } from "@material-ui/core";

const Bool = ({ classes, name, defaultVal, handleParamsChange }) => {
  return (
    <div className={classes.spacing}>
      <FormControlLabel
        label={name}
        control={
          <Checkbox
            checked={defaultVal}
            onChange={(e, val) => handleParamsChange(name, val)}
            name="checkedB"
            color="primary"
          />
        }
      />
    </div>
  );
};

export default Bool;
