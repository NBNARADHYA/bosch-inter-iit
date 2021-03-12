import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SelectImage = () => {
  const [img, setImg] = React.useState("");

  const handleImgChange = (e) => {
    setImg(e.target.value);
  };
  const classes = useStyles();
  return (
    <FormControl className={classes.formControl}>
      <InputLabel shrink id="demo-simple-select-placeholder-label-label">
        Select image:
      </InputLabel>
      <Select
        labelId="demo-simple-select-placeholder-label-label"
        id="demo-simple-select-placeholder-label"
        value={img}
        onChange={handleImgChange}
        displayEmpty
        className={classes.selectEmpty}
      >
        <MenuItem value={1}>Image 1</MenuItem>
        <MenuItem value={2}>Image 2</MenuItem>
        <MenuItem value={3}>Image 3</MenuItem>
      </Select>
      {/* <FormHelperText>Label + placeholder</FormHelperText> */}{" "}
    </FormControl>
  );
};

export default SelectImage;
