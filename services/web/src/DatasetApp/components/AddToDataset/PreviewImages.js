import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  Grid
} from "@material-ui/core";
import React from "react";
import Carousel from "react-material-ui-carousel";
import GetAppIcon from '@material-ui/icons/GetApp';
import Tooltip from '@material-ui/core/Tooltip';
import SaveIcon from '@material-ui/icons/Save';
import { withStyles } from "@material-ui/core";
import { green } from '@material-ui/core/colors';
import JSZipUtils from 'jszip-utils';

const useStyles = makeStyles((theme) => ({
  center: {
    margin: "10px",
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    width: "552px",
    height: "160px",
  },
}));

const SaveButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(green[700]),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
}))(Button);

const getTransformedImages = (transformedImages) => {
  let images = [];
  let count = 0;
  let i=0;
  for (; i < transformedImages.length ; i+=3) {
    const image = (
      <div key={count.toString()}>
        <img alt={'Loading..'} src={transformedImages[i]} width="184px" height="160px" />
        {i+1 < transformedImages.length && <img alt={'Loading..'} src={transformedImages[i + 1]} width="184px" height="160px" />}
        {i+2 < transformedImages.length && <img alt={'Loading..'} src={transformedImages[i + 2]} width="184px" height="160px" />}
      </div>
    );
    count++;
    images.push(image);
  }
  return images;
};

const PreviewImages = ({
  transformedImages,
  deleteImages,
  handleAddConfirmation,
}) => {
  const classes = useStyles();
  return (
    <div>
      <DialogTitle id="form-dialog-title">Are you sure you want to save these images to dataset?</DialogTitle>
      <DialogContent>
        <div>
          {transformedImages.length <=3 && <Carousel 
            className={classes.center}
            navButtonsAlwaysInvisible
          >
            <div>
            {transformedImages.map((image) => <img 
            alt={'Loading..'} src={image} width="184px" height="160px"
            />
            )}
        </div>            
          </Carousel>}
          {transformedImages.length > 3 && <Carousel 
            className={classes.center}
            indicators
          >
            {getTransformedImages(transformedImages)}
          </Carousel>
          }
   <Grid container justify="center" alignItems="center" direction="column">          
      <Tooltip title="Download all preview images in a .zip folder" placement="right">
              <Button 
                variant="contained"
                color="primary"
                onClick={() => {
                  const zip = require('jszip')(); 
                  let count=0;                 
                  transformedImages.forEach((url,i) => {
                    let filename = url
                    filename = filename.replace(/[\/\*\|\:\<\>\?\"\\]/gi, '')
                    .replace("httplocalhost5000","");
                    JSZipUtils.getBinaryContent(url, function (err, data) {
                      if (err) {
                        throw err;
                      }
                      zip.file(filename, data, { binary: true });
                      count++;
                      if (count === transformedImages.length) {
                        zip.generateAsync({ type: 'blob' }).then(function (content) {
                          const element = document.createElement('a')
                          element.href = URL.createObjectURL(content)
                          element.download = 'images.zip'
                          document.body.appendChild(element)
                          element.click()
                        });
                      }
                    });                                        
                  })
                 }}
                startIcon={<GetAppIcon/>}
                size="small"                
                style={{textTransform: 'none', textAlign: 'center'}}                
              >
                Download ZIP
              </Button>          
      </Tooltip>
    </Grid>              
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={deleteImages} color="secondary">
          Discard
        </Button>
        <SaveButton
          onClick={handleAddConfirmation}
          variant="contained"
          startIcon={<SaveIcon/>}
        >
          Save
        </SaveButton>
      </DialogActions>
    </div>
  );
};

export default PreviewImages;
