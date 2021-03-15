import React from "react";
import { FormControlLabel, Checkbox } from "@material-ui/core";

const Bool = ({ classes, name, displayName, defaultVal, handleParamsChange }) => {
  return (
    <div className={classes.spacing}>
      <FormControlLabel
        label={displayName}
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
