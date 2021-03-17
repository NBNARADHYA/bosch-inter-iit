import React, { useState, useCallback, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AugmentationsTimeline from "./components/AugmentationsTimeline"
import augmentations from "../Constants/augmentations";
import Content from "./components/Content";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import serverUrl from "../Constants/serverUrl";
import { changeCamelCaseToNormal,removeQueryParams } from "../Utils";

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
    const data = new FormData();
    if(transformation.parameters && JSON.parse(transformation.parameters).filter((para)=> para.name==='p') && !params['p'])
    {
      params['p']=1.0;
    }
    data.append('parameters',JSON.stringify(JSON.stringify(params)));
    data.append('transformation',transformation.id);
    if(history.length===0) {
      data.append('image',img.img[0]); 
    } else {
      if(parseInt(history[history.length-1].image.split("transformed_img_")[1])!==history.length-1)
        return;
      data.append('img_url',removeQueryParams(history[history.length-1].image));
      data.append('transformation_step',history.length-1);      
    }
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
  },[params, img, transformation, history])

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
    const data = new FormData();
    if(transformation.parameters && JSON.parse(transformation.parameters).filter((para)=> para.name==='p') && !params['p'])
    {
      params['p']=1.0;
    }

    // if(previewImg) {
    //   data.append('preview_url',previewImg.substr(serverUrl.length));
    // } else
     if(history.length){
      data.append('img_url',removeQueryParams(history[history.length-1].image));      
      data.append('parameters',JSON.stringify(JSON.stringify(params)));
      data.append('transformation',transformation.id);
      data.append('transformation_step',history.length-1);      
    } else {
      data.append('image',img.img[0]); 
      data.append('parameters',JSON.stringify(JSON.stringify(params)));
      data.append('transformation',transformation.id);
    }

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
          const newHistory = [...history,{
            image: img_path,
            id: transformation.id,
            name: changeCamelCaseToNormal(transformation.name),
            parameters: params,
          }];
          setHistory(newHistory);
        }
    })
    .catch((err) => {
      console.log(err);
    })
  },[params, img, transformation, history]);

  const resetHistory = useCallback(() => {
    setHistory([]);
    fetch(`${serverUrl}reset_images`,{
      method: 'POST',
      credentials: 'include'
    })
  },[])

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
    </div>
  );
};

export default App;
