import React,{Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer_comp from './Drawer_comp';

const styles={
    root: {
      flexGrow: 1,
      align:"rigth",
    },
    menuButton: {
      marginRight:2,
    },
    title: {
      flexGrow: 1,
    },
  };

class Header extends Component{

    render(){
        
        const {classes} = this.props;

        return(
            <AppBar position="static">
                <Toolbar>
                    <Drawer_comp/>
                    <Typography align="left" variant="h6" className={classes.title}>
                    Docker Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(styles)(Header);