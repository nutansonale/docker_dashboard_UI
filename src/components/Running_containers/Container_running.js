import React, {Component} from 'react';
import {Typography} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';


class Container_running extends Component{

    constructor(props){
        super(props);
        this.state={                    //state of this component contains the variables for tracking errors and storing the list ftched
            error:null,
            isloaded:false,
            containers:[]
        };
    }

    componentDidMount(){ //this method is executed when this component is loaded

        let token= "Bearer "+"0e78f741cad4c6d26583d94d81bab01167ec8ebc";

        fetch("http://"+window.location.hostname+":8000/runningCont/",      //building a fetch request along with the headers
        {
            method: 'POST',
            withCredentials: true,
            credentials: 'same-origin',
            mode: 'cors',
            headers:{
                'Authorization': token,
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers':'http://localhost:3000'
            }
        })              
        .then(response=> response.json())
        .then(
            (data)=>            //handling data when there is a response from the api
            {
                this.setState({isloaded:true, containers: data});
            },
            (error)=>           //handlind the error in response
            {
                this.setState({isloaded:true,error});
            }
        );
    }

    render(){
        const{ error, isloaded, containers }=this.state;

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
                </Box>
            );
        }

    }
}

export default Container_running;