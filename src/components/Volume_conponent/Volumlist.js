import React, {Component} from 'react';
import {Typography} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Header from '../Header_component/Header';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ButtonGroup from '@material-ui/core/ButtonGroup';
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
class Volumelist extends Component{

    constructor(props){
        super(props);
        this.state={                    //state of this component contains the variables for tracking errors and storing the list ftched
            error:null,
            isloaded:false,
            containers:[],
            vname:'',
            vlabel:''
        };

        this.createvolume=this.createvolume.bind(this);
        this.deletevolume=this.deletevolume.bind(this);
    }

    async componentDidMount(){ //this method is executed when this component is loaded

        

        fetch("http://"+window.location.hostname+":8000/volumelist",{
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

    async createvolume(event)

    {  
  
      fetch("http://"+window.location.hostname+":8000/volumelist",{
              method: 'POST',
              withCredentials: true,
              credentials: 'same-origin',
              mode:'cors',
                                
              headers: {
                          'Authorization':sessionStorage.getItem('token'),
                       },
              body: JSON.stringify({"name":this.state.vname,"lables":{"key":this.state.vlabel}})
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

    async deletevolume(event)

    {  
  
      fetch("http://"+window.location.hostname+":8000/volumelist",{
              method: 'DELETE',
              withCredentials: true,
              credentials: 'same-origin',
              mode:'cors',
                                
              headers: {
                          'Authorization':sessionStorage.getItem('token'),
                       },
              body: JSON.stringify({"name":this.state.vname})
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
            const handlename=(event)=>this.setState({vname:event.target.value});
            const handlelabel=(event)=>this.setState({vlabel:event.target.value});
                const tagging=(
                  <Grid container  spacing={12} color="text.primary">
                    {Object.keys(containers).map((objects,index)=>
                    
                      <Grid item xs={12}>
                          <Paper className={classes.paper}   xs={6}>
                          <Box  align="left"><Typography><b>Name</b> {containers[objects].Name}</Typography></Box>
                          <Box  align="left"><Typography><b>Driver</b> {containers[objects].Driver}</Typography></Box>
                          <Box  align="left"><Typography><b>Mount point</b> {containers[objects].Mountpoint}</Typography></Box>
                          <Box  align="left"><Typography><b>Scope</b> {containers[objects].Scope}</Typography></Box>
                          <Box  align="left"><Typography><b>Created At</b> {containers[objects].CreatedAt}</Typography></Box> 
                          </Paper>
                        </Grid>
                        
                        )}
                  </Grid>);

                  
                  return(
                    <div style={{  whiteSpace: 'nowrap' }}>
                        <Header/>
                        <Box bgcolor="grey.300">
                        <Typography variant="h4" color="primary">
                         Create or delete volumes
                        </Typography>
                        <div style={{padding:'30px 30px'}}>
                        <form className={classes.root} noValidate autoComplete="off">
                            <TextField id="Volume name" label="Volume name" onChange={handlename} /><br/>
                            <TextField id="label" label="label" onChange={handlelabel} /><br/>
                            <ButtonGroup color="primary" aria-label="outlined primary button group" style={{padding:'30px 30px'}}>
                                <Button onClick={this.createvolume}>Create</Button>
                                <Button onClick={this.deletevolume}>Delete</Button>
        
                            </ButtonGroup>
                            
                        </form>
                        </div>
                        
                        </Box>
                        <Typography variant="body2">
                        {tagging}
                        </Typography>
                        </div>
                  )
        }

    }
}

export default withStyles(styles)(Volumelist);