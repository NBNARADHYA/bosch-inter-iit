import {Typography} from '@material-ui/core'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles} from '@material-ui/core/styles';
import React from 'react';

import classLabels from '../../../Constants/classLabels';
import {getClassString} from '../../../Utils';

const useStyles =
    makeStyles((theme) => ({
                 root : {
                   width : '100%',
                   backgroundColor : theme.palette.background.paper,
                 },
               }));

const MostConfusedClasses = ({most_confused_classes}) => {
    const classes = useStyles();

    const mostConfusedClasses = most_confused_classes.map((each) => {
        const X = each[0];
        const classA = classLabels[getClassString(each[1])];
        const classB = classLabels[getClassString(each[2])];
        const urlA = `class_images\\${each[1]}.png`;
        const urlB = `class_images\\${each[2]}.png`;
        return (
            <ListItem>
                <ListItemText>
                    {'>>'} {X}% images of <strong>{classA}</strong> are being predicted to be of <strong>{classB}</strong>.
                    <div style={{display:"flex", justifyContent:"space-around"}}>
                        <div style={{display:"flex", flexDirection:"column", margin:"25px"}}>
                            <img src={urlA} width="100px" />
                            {classA}    
                        </div> 
                        <div style={{display:"flex", flexDirection:"column", margin:"25px"}}>
                            <img src={urlB} height="100px"/>
                            {classB}    
                        </div> 
                    </div>
                    <br />
                    <br />
                </ListItemText>
            </ListItem>
        )
    })
  return (
    <div>
      <Typography variant="h4">Most Confused Classes</Typography>
      <List className={classes.root}>
        {mostConfusedClasses}
    </List>
    </div>
  )
}

export default MostConfusedClasses
