import React, { useState, useCallback, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AugmentationsTimeline from "./components/AugmentationsTimeline"
import augmentations from "../Constants/augmentations";
import Content from "./components/Content";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import serverUrl from "../Constants/serverUrl";
import { changeCamelCaseToNormal,generateTransformationRequestBody,removeQueryParams } from "../Utils";
import CustomSnackbar from "../Common/CustomSnackbar";

const drawerWidth = 360;

const useStyles = makeStyles((theme) => ({
    '@global': {
      '*::-webkit-scrollbar': {
        width: '0.5em'
      },
      '*::-webkit-scrollbar-track': {
        '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
      },
      '*::-webkit-scrollbar-thumb': {
          backgroundColor: '#757575',
          outline: '1px solid #757575'
      },
    },  
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const App = () => {
  const classes = useStyles();
  const [isTimelineOpen, setTimelineOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const [previewImg, setPreviewImg] = useState("");  
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [img, setImg] = useState({});
  const [originalDimensions, setOriginalDimensions] = useState({width: 300});  
  const [previewDimensions, setPreviewDimensions] = useState({width: 300});    
  const [historyDimensions, setHistoryDimensions] = useState({width: 300});      
  const [params, setParams] = useState({});
  const [transformation, setTransformation] = useState(augmentations[0]);  
  const [snackPack, setSnackPack] = React.useState([]);

  const toggleTimelineOpen = useCallback(()=> {
    setTimelineOpen(!isTimelineOpen);
  },[isTimelineOpen]);

  const handleDrawerOpen =  useCallback(() => {
    setOpen(true);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleImgChange = useCallback((img, pictures) => {
    let newState = {};
    newState.img = img;
    newState.pictures = pictures;
    setImg(newState);
  },[]);

  useEffect(()=> {
    if(!img || !img.img || !img.img.length) {
      return;
    }
    if(history.length &&
       parseInt(history[history.length-1].image.split("transformed_img_")[1])!==history.length-1)
      return;      
    const data = generateTransformationRequestBody(
      transformation, history, params, img, originalDimensions, historyDimensions, true
    );
    fetch(`${serverUrl}transform_image?preview=true`,{
      method: 'POST',
      credentials: 'include',
      body: data
    })
    .then(res => res.json())
    .then(({img_path})=> {
          setPreviewImg(`${img_path}?${Date.now()}`);
    })
    .catch((err) => {
      console.log(err.message || err);
    })
  },[params, img, transformation, history, historyDimensions, originalDimensions])

  useEffect(() => {
    if(!history.length)
      return;
    var imgObj = new Image();
    imgObj.onload = function(){
      setHistoryDimensions({height:this.height, width:this.width});
    };
    imgObj.src = history[history.length-1].image;                       
  },[history])

  const addToHistory = useCallback(()=> {
    if(!img || !img.img || !img.img.length) {
      return;
    }
    const data = generateTransformationRequestBody(
      transformation, history, params, img, originalDimensions, historyDimensions, false
    );    
    fetch(`${serverUrl}transform_image?preview=false`,{
      method: 'POST',
      credentials: 'include',      
      body: data
    })
    .then(res => res.json())
    .then((res)=> {
      const {error, img_path}=res;
      if(!error)
        {
          const displayName = changeCamelCaseToNormal(transformation.name);
          const newHistory = [...history,{
            image: img_path,
            id: transformation.id,
            name: displayName,
            parameters: params,
          }];
          setHistory(newHistory);
          setSnackPack((prev) => [...prev, {
             message: `${displayName} with probability ${params['p']} added to timeline`, 
             key: new Date().getTime() 
            }]);          
        }
    })
    .catch((err) => {
      console.log(err);
    })
  },[params, img, transformation, history, historyDimensions, originalDimensions]);

  const resetHistory = useCallback(() => {
    setHistory([]);
    fetch(`${serverUrl}reset_images`,{
      method: 'POST',
      credentials: 'include'
    })
  },[])

  const handleUndo = useCallback(()  => {
    if(!history.length)
      return;
    const newHistory = history.filter((h,i) => i !== history.length-1);
    setHistory(newHistory);
  },[history])

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar
        classes={classes}
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        theme={theme}
        toggleTimelineDrawer={toggleTimelineOpen}
      />
      <Sidebar
        classes={classes}
        open={open}
        handleDrawerClose={handleDrawerClose}
        theme={theme}
        img={img}
        handleImgChange={handleImgChange}
        params={params}
        setParams={setParams}     
        transformation={transformation}
        setTransformation={setTransformation}
        addToHistory={addToHistory}
        resetHistory={resetHistory}
        history={history}
        imgDimensions={history.length?historyDimensions:originalDimensions}      
      />
      <Content
        classes={classes}
        open={open}
        img={img}
        previewImg={previewImg}
        params={params}
        transformation={transformation}
        originalDimensions={originalDimensions}
        setOriginalDimensions={setOriginalDimensions}
        previewDimensions={previewDimensions}
        setPreviewDimensions={setPreviewDimensions}
      />
      <AugmentationsTimeline
        isOpen={isTimelineOpen}
        toggleDrawer={toggleTimelineOpen}
        history={history}
        setHistory={setHistory}
        img={img}
      />  
      <CustomSnackbar
        snackPack={snackPack}
        setSnackPack={setSnackPack}
        handleUndo={handleUndo}
      />
    </div>
  );
};

export default App;
