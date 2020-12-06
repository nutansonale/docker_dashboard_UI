import React from 'react';
import logo from './images/logo.svg';
import './main.css'; 
import './Test_component';
import Test_component from './Test_component';
import Header from './Header_component/Header';
import Container_running from './Running_containers/Container_running';
import Slider from './Slider_component/Slider';

function Main() {
  return (
    <div className="Main">
      <Header/>
      <Slider/>
      <header className="Main-header">
        <img src={logo} className="Main-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="Main-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        
      </header>
      <Test_component name="nutan"/>
      
    </div>

  );
}

export default Main;