import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import './Test_component';
import Auth from './Auth_component/Auth';

import Main from './Main';

function App() {
  return (

    <Switch>
      <Route path="/" component={Auth} exact/>
      <Route path="/home" component={Main}/>
    </Switch>
  

  );
}

export default App;
