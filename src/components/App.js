import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import './Test_component';
import Auth from './Auth_component/Auth';
import Contops from './Contops_component/Contops';
import Main from './Main';
import Imagedist from './Imagedist_component/Imagedist';
import Volumelist from './Volume_conponent/Volumlist';
import Buildinitiate from './Build_component/Buildinitiate';

function App() {
  return (

    <Switch>
      <Route path="/" component={Auth} exact/>
      <Route path="/home" component={Main}/>
      <Route path="/Contops" component={Contops}/>
      <Route path="/distcont" component={Imagedist}/>
      <Route path="/volume" component={Volumelist}/>
      <Route path="/build" component={Buildinitiate}/>
    </Switch>
  

  );
}

export default App;
