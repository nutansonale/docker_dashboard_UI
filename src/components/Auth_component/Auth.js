import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import Header from '../Header_component/Header';

const styles={
    paper: {
      marginTop: 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: 1,
      
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: 1,
    },
    submit: {
      margin:1,
    },
  };

class Auth extends Component{

    constructor(props){
      super(props);
      this.state={
        password:"",
        username:""
      };

      this.Authenticate=this.Authenticate.bind(this);

    }
    
    Copyright() {
        return (
          <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
              Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        );
      }

      async Authenticate(event)
      {
        event.preventDefault();
        //alert(this.state.username+"\n"+this.state.password);
        //this.props.history.replace('/home');
        if(this.state.username!=="" || this.state.password!==""){
            let responce= await fetch("http://"+window.location.hostname+":8000/signin",{
                            method: 'POST',
                            credentials: 'same-origin',
                            mode:'cors',
                            headers: {
                              'Authorization':'Token 81fa648bc86e41c6ad4419880fd989d762aa3c86',
                              
                                      },
                            body: JSON.stringify({"username":this.state.username,"password":this.state.password})
                            });
            if(responce.status !== 401)
            {
              let data = await responce.json();
              
              if(data.result==="Success")
              {
                sessionStorage.setItem("token", data.token);
                this.props.history.replace('/home');

              }
            }
            else
            {
              let data = await responce.json();
              console.log(data);
              

            }
         }
         else{
           alert("fields are empty");
         }
      
    }




    render(){
        const handleClick = () => alert(this.state.username);
        const handlechange=(event)=>this.setState({username:event.target.value});
        const handlepass=(event)=>this.setState({password:event.target.value});
        const {classes} = this.props;
        return(
          <div>
          
            <Container component="main" maxWidth="xs">
              
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" align="center">
          Docker Dashboard <br/>Sign in
        </Typography>
        <form className={classes.form} method="post" noValidate onSubmit={this.Authenticate}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handlechange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handlepass}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <this.Copyright />
      </Box>
    </Container>  
    </div>  );
    }
}

export default withStyles(styles)(Auth);