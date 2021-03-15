import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import augmentations from "../../Constants/augmentations";
import { changeCamelCaseToNormal } from '../../Utils';

const SelectTransformation = ({
  classes,
  transformation,
  handleTransformationChange,
}) => {
  const options = augmentations.map((augmentation) => {
    const name = changeCamelCaseToNormal(augmentation.name);
    const id = augmentation.id;
    return (
      <MenuItem key={id.toString()} value={id}>
        {name}
      </MenuItem>
    );
  });
  return (
    <FormControl className={classes.spacing}>
      <InputLabel shrink id="demo-simple-select-placeholder-label-label">
        Select Transformation:
      </InputLabel>
      <Select
        labelId="demo-simple-select-placeholder-label-label"
        id="demo-simple-select-placeholder-label"
        value={transformation && transformation.id}
        onChange={handleTransformationChange}
        displayEmpty
      >
        {options}
      </Select>
      {/* <FormHelperText>Label + placeholder</FormHelperText> */}{" "}
    </FormControl>
  );
};

export default SelectTransformation;
