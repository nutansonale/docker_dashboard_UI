import React, {Component} from 'react';
import {Typography} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Contops from './Contops';



const styles={
    root: {
        flexGrow: 1,
      },
      paper: {
        padding: "10px",
        textAlign: 'center',
        
      },
    
  };
class Contlist_short extends Component{

    constructor(props){
        super(props);
        this.state={                    //state of this component contains the variables for tracking errors and storing the list ftched
            error:null,
            isloaded:false,
            containe:[],
            inspect:"",
            id:""
        };

        this.getdata=this.getdata.bind(this);
    }

    async componentDidMount(){ //this method is executed when this component is loaded

        
        
        fetch("http://"+window.location.hostname+":8000/assigned_container",{
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
                    containe: result["result"]
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

    async getdata(event)

    { //console.log(event.currentTarget.id); 
      console.log(this.state.id);
      console.log(event.currentTarget.id);
      
      if(this.state.id !== event.currentTarget.id){
      
      /*let responce= await fetch("http://"+window.location.hostname+":8000/inspect",{
                              method: 'POST',
                              credentials: 'same-origin',
                              mode:'cors',
                              headers: {
                                'Authorization':'Token 81fa648bc86e41c6ad4419880fd989d762aa3c86',
                                        
                                        },
                              body: JSON.stringify({"username":this.state.username,"password":this.state.password})
                              });*/
                              this.setState({id:event.currentTarget.id});
      fetch("http://"+window.location.hostname+":8000/inspect/"+event.currentTarget.id,{
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
                                        
                                        inspect:JSON.stringify(result["result"])
                                      });
                                      
                                      
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
        //console.log("clear");
        this.setState({inspect:"",id:""});
      }
    }

    async startcontainer(event)

    {  
  
      fetch("http://"+window.location.hostname+":8000/containerstartstop",{
              method: 'POST',
              withCredentials: true,
              credentials: 'same-origin',
              mode:'cors',
                                
              headers: {
                          'Authorization':sessionStorage.getItem('token'),
                       },
              body: JSON.stringify({"id":event.currentTarget.id,"operation":"start"})
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

    async stopcontainer(event)

    {  
  
      fetch("http://"+window.location.hostname+":8000/containerstartstop",{
              method: 'POST',
              withCredentials: true,
              credentials: 'same-origin',
              mode:'cors',
                                
              headers: {
                          'Authorization':sessionStorage.getItem('token'),
                       },
              body: JSON.stringify({"id":event.currentTarget.id,"operation":"stop"})
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
        const{ error, isloaded, containe }=this.state;
        console.log(isloaded);
        const {classes} = this.props;
        const handleclick=e=>console.log("nutan");
          
      
      
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
                    <Grid item xs={12}>
                        <Box my={2} overflow="auto" visibility={this.state.inspect!==""?"visible":"hidden"} break-word bgcolor="background.paper">
                            {this.state.inspect}
                            </Box>
                        </Grid>
                    {containe.map((objects)=>
                    
                      <Grid item xs={12}>
                          <Paper  onSubmit={this.getdata}  className={classes.paper} xs={6}>
                            <Box  align="left" display="flex">
                            <Box p={1} width="100%" bgcolor="grey.300">
                            <Typography  ><b>Id</b> {objects}</Typography>
                            </Box>
                              
                            <Button variant="outlined" id={objects} color="primary" onClick={objects=>this.startcontainer(objects)}>start</Button>
                            <Button variant="outlined" id={objects} color="secondary" onClick={objects=>this.stopcontainer(objects)}>stop</Button>

                            
                            </Box>
                            
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

export default withStyles(styles)(Contlist_short);