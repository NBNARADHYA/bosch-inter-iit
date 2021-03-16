import React from "react";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';

const Bool = ({ classes, name, displayName, description, defaultVal, tooltipStyles, handleParamsChange }) => {
  return (
    <div className={classes.spacing}>
      <Tooltip title={description} placement="top" classes={tooltipStyles}>
        <FormControlLabel
          label={displayName}
          control={
            <Checkbox
              defaultChecked={defaultVal==="True"}
              onChange={(e, val) => handleParamsChange(name, val)}
              name="checkedB"
              color="primary"
            />
          }
        />
      </Tooltip>
    </div>
  );
};

export default Bool;
