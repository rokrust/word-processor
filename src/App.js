import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GoogleSignIn from './pages/google-signin';
import styled from 'styled-components'
import Google from './containers/google'

class App extends Component {
  constructor(){
    super()
    this.google = new Google()
  }

  render() {
    
    return (
      <div className="App" style={{position: 'absolute', height: "100%", width: '100%'}}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to write porgram</h1>
        </header>
        <GoogleSignIn />
      </div>
    );
  }
}


export default App;
