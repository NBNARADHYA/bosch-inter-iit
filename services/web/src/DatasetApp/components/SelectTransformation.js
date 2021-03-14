import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import augmentations from "../../Constants/augmentations";

const changeToNormalCase = (camelCase) => {
  var name = camelCase.charAt(0).toLowerCase() + camelCase.substring(1);

  name = name
    // insert a space before all caps
    .replace(/([A-Z])/g, " $1")
    // uppercase the first character
    .replace(/^./, function (str) {
      return str.toUpperCase();
    });
  return name;
};

const SelectTransformation = ({
  classes,
  transormation,
  handleTransformationChange,
}) => {
  const options = augmentations.map((augmentation, ind) => {
    const name = changeToNormalCase(augmentation.name);
    const id = augmentation.id;
    return (
      <MenuItem key={id} value={augmentation}>
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
        value={transormation}
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
