import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Slide from "@material-ui/core/Slide";
import {makeStyles} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import Gallery from "react-grid-gallery";

const useStyles = makeStyles((theme) => ({
                               appBar : {
                                 position : "relative",
                               },
                               title : {
                                 marginLeft : theme.spacing(2),
                                 flex : 1,
                               },
                             }));

const IMAGES = [
  {
    src : "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
    thumbnail :
        "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
    thumbnailWidth : 320,
    thumbnailHeight : 174,
    isSelected : true,
    caption : "After Rain (Jeshu John - designerspics.com)",
  },
  {
    src : "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
    thumbnail :
        "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
    thumbnailWidth : 320,
    thumbnailHeight : 212,
    tags : [
      {value : "Ocean", title : "Ocean"},
      {value : "People", title : "People"},
    ],
    caption : "Boats (Jeshu John - designerspics.com)",
  },

  {
    src : "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
    thumbnail :
        "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
    thumbnailWidth : 320,
    thumbnailHeight : 212,
  },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return < Slide direction = "up" ref = {ref} { ...props }
  />;
});

export default function TestModel() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Run Model on an image
      </Button >
      < Dialog
  fullScreen
  open = {open} onClose = {handleClose} TransitionComponent =
      {Transition} > <AppBar className = {classes.appBar}><Toolbar>< IconButton
  edge = "start"
  color = "inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Run Model to generate class scores and heatmap of the image
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Run
            </Button>
          </Toolbar>
        </AppBar>
        <Gallery images={IMAGES} />
      </Dialog>
    </div>
  );
}
