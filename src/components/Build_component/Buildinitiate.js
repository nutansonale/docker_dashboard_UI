import React, { Component } from 'react'
import {DropzoneDialog} from 'material-ui-dropzone'
import Button from '@material-ui/core/Button';
import {Typography} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Header from '../Header_component/Header';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

const styles={
    root: {
        flexGrow: 1,
      },
      paper: {
        padding: "10px",
        textAlign: 'center',
        
      },
    
  };

class Buildinitiate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            filesname:'no file selected',
            successbuilds:{},
            failbuilds:{}
            
        };

        this.successbuild=this.successbuild.bind(this);
        this.failbuild=this.failbuild.bind(this);
        this.formhandler=this.formhandler.bind(this);
    }
 
    async componentDidMount(){
        this.successbuild();
        this.failbuild();
    }

    async formhandler()
    {
        var dos = document.getElementById("fileselctor");
        if('files' in dos)
        {
            
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Token 81fa648bc86e41c6ad4419880fd989d762aa3c86");
            
            
            var formdata = new FormData();
            formdata.append("file",dos.files[0],dos.files[0].name);
            var requestOptions = {
                                    method: 'POST',
                                    headers: myHeaders,
                                    body: formdata,
                                    
                                  };
            fetch("http://"+window.location.hostname+":8000/buildinitiate", requestOptions)
            .then(response => response.json()).then(
                (result) => {
                  
                    
                    alert(JSON.stringify(result["result"]));
                  
                  
                  
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                  alert("operation not successful");
                }
              );
              this.setState({filesname:'no file selected'})
                                  
        }
    }

    async successbuild()
    {
        fetch("http://"+window.location.hostname+":8000/buildinitiate/1",{
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
                    successbuilds: result["result"]
                  });
                  
                  console.log(result["result"]);
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

    async failbuild()
    {
        fetch("http://"+window.location.hostname+":8000/buildinitiate/0",{
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
                    failbuilds: result["result"]
                  });
                  
                  console.log(result["result"]);
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

    
    render() {
        const {classes} = this.props;
        const handlechange=()=>{
            var filenam=document.getElementById("fileselctor");
            
            this.setState(
            {
                filesname:filenam.files[0].name
            }
        )};

        const tagging=(
            <Grid container  spacing={12} color="text.primary">
                <Grid item xs={6} >
                    <Typography variant="h6" color="primary" align="center">Successful builds</Typography>
                </Grid>
                <Grid item xs={6} bgcolor="primary" alignItems="center">
                    <Typography variant="h6" color="primary" align="center" >Unsuccessful builds</Typography>
                </Grid>
                <Grid item xs={6}>
                <Grid container  spacing={12} color="text.primary">
              {Object.keys(this.state.successbuilds).map((objects)=>
              
                <Grid item xs={12}>
                    <Paper className={classes.paper} xs={6}>
                      <Box  align="left"><Typography><b>submited by</b> {this.state.successbuilds[objects].user_name}</Typography>
                      <Typography><b>request time</b> {this.state.successbuilds[objects].requesttime}</Typography>
                      <Typography><b>build time</b> {this.state.successbuilds[objects].buildtime}</Typography>
                      </Box>
                      
                    </Paper>
                  </Grid>
                  
                  )}
                  </Grid>
                  </Grid>
                  <Grid item xs={6}>
                <Grid container  spacing={12} color="text.primary">
              {Object.keys(this.state.failbuilds).map((objects)=>
              
                <Grid item xs={12}>
                    <Paper className={classes.paper} xs={6}>
                    <Box  align="left">
                    <Typography><b>submited by</b> {this.state.failbuilds[objects].user_name}</Typography>
                      <Typography><b>request time</b> {this.state.failbuilds[objects].requesttime}</Typography>
                      <Typography><b>build time</b> {this.state.failbuilds[objects].buildtime}</Typography>
                      </Box>
                      
                    </Paper>
                  </Grid>
                  
                  )}
                  </Grid>
                  </Grid>
            </Grid>);
        return (
            <div>
                <Header/>
                        <Box bgcolor="grey.300">
                        <Typography variant="h4" color="primary" >
                         Build image
                        </Typography>
                        
                        <div style={{padding:'30px 30px'}}>
                        <Typography variant="h7" color="primary" >
                         upload dockerfile to initiate build
                        </Typography>
                        <form  onSubmit={this.formhandler}>
                        <Button variant="contained" component="label">
                        {this.state.filesname}
                        <input type="file" name="choose file" id="fileselctor" onChange={handlechange} hidden />
                        </Button>
                        
                        <br/><br/>
                        <Button variant="contained" component="label">
                        submit
                        <input type="button" value="Submit" onClick={this.formhandler} hidden/>
                        </Button>
                        
                        
                        </form>
                        </div>
                        </Box>
                        <Typography variant="body2">
                        {tagging}
                        </Typography>
                        
                        

                
                
            </div>
        );
    }
}

export default withStyles(styles)(Buildinitiate);