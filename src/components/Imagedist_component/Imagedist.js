import React, {Component} from 'react';
import {Typography} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Header from '../Header_component/Header';
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';




const styles={
    root: {
        flexGrow: 1,
      },
      paper: {
        padding: "10px",
        textAlign: 'center',
        
      },
    
  };
class Imagedist extends Component{

    constructor(props){
        super(props);
        this.state={                    //state of this component contains the variables for tracking errors and storing the list ftched
            error:null,
            isloaded:false,
            containers:[],
            id:""
        };

        this.assigncontainer=this.assigncontainer.bind(this);
        this.unassigncontainer=this.unassigncontainer.bind(this);
    }

    async componentDidMount(){ //this method is executed when this component is loaded

        

        fetch("http://"+window.location.hostname+":8000/containershort",{
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

    async assigncontainer(event)
    { 
      event.preventDefault();
      fetch("http://"+window.location.hostname+":8000/assigned_container",{
              method: 'POST',
              withCredentials: true,
              credentials: 'same-origin',
              mode:'cors',
                                
              headers: {
                          'Authorization':sessionStorage.getItem('token'),
                       },
              body: JSON.stringify({"image_id":event.currentTarget.id,"User_name":this.state.id})
                        }).then(response => response.json()).then(
                                    (result) => {
                                      
                                        
                                        alert(JSON.stringify(result["result"]));
                                      
                                      
                                      
                                    },
                                    // Note: it's important to handle errors here
                                    // instead of a catch() block so that we don't swallow
                                    // exceptions from actual bugs in components.
                                    (error) => {
                                      alert("operation not successful");
                                    }
                                  )
          
    }

    async unassigncontainer(event)
    { 
      event.preventDefault();
      fetch("http://"+window.location.hostname+":8000/assigned_container",{
              method: 'DELETE',
              withCredentials: true,
              credentials: 'same-origin',
              mode:'cors',
                                
              headers: {
                          'Authorization':sessionStorage.getItem('token'),
                       },
              body: JSON.stringify({"image_id":event.currentTarget.id,"User_name":this.state.id})
                        }).then(response => response.json()).then(
                                    (result) => {
                                      
                                      
                                        
                                        alert(JSON.stringify(result["result"]));
                                      
                                      
                                      
                                    },
                                    // Note: it's important to handle errors here
                                    // instead of a catch() block so that we don't swallow
                                    // exceptions from actual bugs in components.
                                    (error) => {
                                      alert("operation not successful");
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

            const handlechange=(event)=>{this.setState({id:event.target.value});};
                
                const tagging=(
                    
                  <Grid container  spacing={12} color="text.primary">
                    {containers.map((objects)=>
                    
                      <Grid item xs={12}>
                          
                          
                          <Paper className={classes.paper} style={{color: objects.Status==="running"?"green":"red"} } xs={12}>
                          <Box  align="left" display="flex">
                          <Box p={1} width="100%" >
                            <Box  align="left"><Typography><b>Id</b> {objects.id}</Typography></Box>
                            <Box  align="left"><Typography><b>Name</b> {objects.Name}</Typography></Box>
                            <Box  align="left"><Typography><b>Status</b> {objects.Status}</Typography></Box>
                            </Box>
                            <InputBase placeholder="enter user name" className={classes.input} onChange={handlechange}/>
                        <Divider className={classes.divider} orientation="vertical" />
                        <Button variant="outlined" id={objects.id} onClick={this.assigncontainer} >Assign</Button>
                        <Button variant="outlined" id={objects.id} onClick={this.unassigncontainer} >Revoke</Button>
                        </Box>
                          </Paper>
                          
                        
                        </Grid>
                        
                        )}
                  </Grid>);
                  return(
                    <div className="Main">
                    <Header/>
                    <div style={{  whiteSpace: 'nowrap' }}>
                        <Typography variant="body2">
                        {tagging}
                        </Typography>
                        </div>
                    </div>
                )
        }

    }
}

export default withStyles(styles)(Imagedist);