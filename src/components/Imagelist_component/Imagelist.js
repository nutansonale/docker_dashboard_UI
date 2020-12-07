import React, {Component} from 'react';
import {Typography} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { withStyles } from '@material-ui/core/styles';




const styles={
    root: {
        flexGrow: 1,
      },
      paper: {
        padding: "10px",
        textAlign: 'center',
        
      },
    
  };
class Imagelist extends Component{

    constructor(props){
        super(props);
        this.state={                    //state of this component contains the variables for tracking errors and storing the list ftched
            error:null,
            isloaded:false,
            containers:[]
        };
    }

    async componentDidMount(){ //this method is executed when this component is loaded

        

        fetch("http://"+window.location.hostname+":8000/imagelist",{
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
                    containers: result
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

    render(){
        const{ error, isloaded, containers }=this.state;
        console.log(isloaded);
        const {classes} = this.props;
        if(error){
            return(
                <div>
                    Error:{error.message}
                </div>
            );
        }
        else if(!isloaded){
            return(
                <Box>
                    <Typography>
                        Loading...
                    </Typography>
                    <Box display="flex" justifyContent="center">
                        <CircularProgress justify="center" marginLeft="2" disableShrink color="#384d54"/>
                    </Box>
                </Box>);}
        else {
                const tagging=(
                  <Grid container  spacing={12} color="text.primary">
                    {containers.map((objects)=>
                    
                      <Grid item xs={12}>
                          <Paper className={classes.paper} xs={6}>
                            <Box  align="left"><Typography><b>Id</b> {objects.id}</Typography></Box>
                            <Box  align="left"><Typography><b>Name</b> {objects.tags}</Typography></Box>
                            
                          </Paper>
                        </Grid>
                        
                        )}
                  </Grid>);
                  return(
                    <div style={{  whiteSpace: 'nowrap' }}>
                        <Typography variant="body2">
                        {tagging}
                        </Typography>
                        </div>
                  )
        }

    }
}

export default withStyles(styles)(Imagelist);