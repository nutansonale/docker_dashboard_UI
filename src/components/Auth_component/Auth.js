import React, {Component} from 'react';
import {Link} from 'react-router-dom';
class Auth extends Component{

    render(){
        return(<div><p>hello this is auth page</p><Link to="/home">home</Link></div>);
    }
}

export default Auth;