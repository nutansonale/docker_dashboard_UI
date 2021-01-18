import React, {Component} from 'react';
import logo from './images/logo.svg';
import './main.css'; 
import './Test_component';
import Box from '@material-ui/core/Box';
import Test_component from './Test_component';
import { withStyles } from '@material-ui/core/styles';
import Header from './Header_component/Header';
import Contlist_short from './Contops_component/Contlist_short';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Container_running from './Running_containers/Container_running';
import Slider from './Slider_component/Slider';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';


const styles={
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    
  },
  input: {
    marginLeft: 1,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
};

class Main extends Component{

  constructor(props){
    super(props);
    this.state={  
        id:"",                  
        error:null,
        isloaded:false,
        containers:""
    };
    this.getdata=this.getdata.bind(this);
  }

  async getdata(event)
  { 
    event.preventDefault();
    if(this.state.id!==""){
    
    /*let responce= await fetch("http://"+window.location.hostname+":8000/inspect",{
                            method: 'POST',
                            credentials: 'same-origin',
                            mode:'cors',
                            headers: {
                              'Authorization':'Token 81fa648bc86e41c6ad4419880fd989d762aa3c86',
                                      
                                      },
                            body: JSON.stringify({"username":this.state.username,"password":this.state.password})
                            });*/

    fetch("http://"+window.location.hostname+":8000/inspect/"+this.state.id,{
            method: 'GET',
            withCredentials: true,
            credentials: 'same-origin',
            mode:'cors',
                              
            headers: {
                        'Authorization':sessionStorage.getItem('token'),
                     }
                      }).then(response => response.json()).then(
                                  (result) => {
                                    this.setState({
                                      isloaded: true,
                                      containers:JSON.stringify(result["result"])
                                    });
                                    
                                    console.log(result);
                                  },
                                  // Note: it's important to handle errors here
                                  // instead of a catch() block so that we don't swallow
                                  // exceptions from actual bugs in components.
                                  (error) => {
                                    this.setState({
                                      isLoaded: true,
                                      error:null
                                    });
                                  }
                                )
    
    }
    else{
      this.setState({containers:""});
    }
  }


  render(){
    const {classes} = this.props;
    const handlechange=(event)=>this.setState({id:event.target.value});
    return (
      <div className="Main">
        <Header/>
        <Paper component="form" onSubmit={this.getdata} className={classes.root}  align="left" fullwidth={true}>
                        <InputBase placeholder="Inspect element by ID" className={classes.input} onChange={handlechange}/>
                        <Divider className={classes.divider} orientation="vertical" />
                        <IconButton type="submit" className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                        </IconButton>
        </Paper>
    <Typography>{this.state.containers}</Typography>
        <Slider/>
        <Box bgcolor="#3f51b5" p={2}>
        <Typography variant="h5"  align="left" style={{color: "white"}}>Assigned containers</Typography>
        <Contlist_short/>
        </Box>
       
        
      </div>
  
    );
  }
}



export default withStyles(styles)(Main);