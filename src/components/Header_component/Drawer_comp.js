import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from "react-router";

const useStyles = makeStyles({
    list: {
      width: 200,
    },
    fullList: {
      width: 'auto',
    },
  });
  
  export default function Drawer_comp() {
    const classes = useStyles();
    const [state, setState] = React.useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });
    const history=useHistory();
    const toggleDrawer = (anchor, open, keys) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      setState({ ...state, [anchor]: open });
    };
  
    const listclick=(key)=>{
      console.log(key);
    };

    const list = (anchor) => (
      <div
        className={clsx(classes.list, {
          [classes.fullList]: anchor === 'top' || anchor === 'bottom',
        })}
        role="presentation"
        onClose={toggleDrawer(anchor, false, null)}
        onKeyDown={toggleDrawer(anchor, false, null)}
      >

        
        <List>
        <ListItem button key="home" >
              
              <ListItemText primary="home" onClick={()=>history.push("/home")} />
            </ListItem>
        <ListItem button key="continfo" >
              
              <ListItemText primary="container info" onClick={()=>history.push("/Contops")} />
            </ListItem>
            <ListItem button key="distribute container" >
              
              <ListItemText primary="assign containers" onClick={()=>history.push("/distcont")} />
            </ListItem>
            <ListItem button key="volumes" >
              
              <ListItemText primary="Volumes list" onClick={()=>history.push("/volume")} />
            </ListItem>
            <ListItem button key="Build" >
              
              <ListItemText primary="Build image" onClick={()=>history.push("/build")} />
            </ListItem>
        </List>
        <Divider />
        
      </div>
    );
  
    return (
      <div>
          <React.Fragment key={'left'}>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer('left', true)}>
                      <MenuIcon  />
                    </IconButton>
            <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
              {list('left')}
            </Drawer>
          </React.Fragment>
      </div>
    );
  }