import React, { useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import CloseIcon from '@material-ui/icons/Close';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import augmentations from "../../../Constants/augmentations";
import { changeCamelCaseToNormal } from '../../../Utils';
import { DialogContent, Tooltip, DialogContentText } from "@material-ui/core";
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

const SelectTransformation = ({
  classes,
  transformation,
  handleTransformationChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const options = augmentations
    .sort((a,b) => a.name < b.name ? -1 : 1)
    .map((augmentation) => {
    const name = changeCamelCaseToNormal(augmentation.name);
    const id = augmentation.id;
    return (
      <MenuItem key={id.toString()} value={id}>
        {name}
      </MenuItem>
    );
  });
  return (
    <FormControl className={classes.spacing} id="step2">
      <InputLabel shrink id="demo-simple-select-placeholder-label-label">
        Select Transformation: &nbsp; 
        <Tooltip title={`View more about ${changeCamelCaseToNormal(transformation.name)}`} placement="right">
          <IconButton color="primary" aria-label="add to shopping cart" size="small" onClick={() => {setIsOpen(true)}}>
            <InfoIcon />
          </IconButton>
        </Tooltip>
      </InputLabel>
      <br/>
        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          value={transformation && transformation.id}
          onChange={handleTransformationChange}
          displayEmpty
        >
          {options}
        </Select>     
      {/* <FormHelperText>{transformation.description}</FormHelperText> */}
      <Dialog 
        onClose={() => { setIsOpen(false)}}
        aria-labelledby="transformation-description" open={isOpen}>
      <DialogTitle id="simple-dialog-title">
        {changeCamelCaseToNormal(transformation.name)}
        <IconButton aria-label="close" className={classes.closeButton} onClick={()=> setIsOpen(false)}>
          <CloseIcon />
        </IconButton>        
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {transformation.description}
        </DialogContentText>
      </DialogContent>
      </Dialog>      
    </FormControl>
  );
};

export default SelectTransformation;
