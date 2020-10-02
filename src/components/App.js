import React from 'react';
import logo from './images/logo.svg';
import './App.css';
import './Test_component';
import Test_component from './Test_component';
import Header from './Header_component/Header';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
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

export default App;
