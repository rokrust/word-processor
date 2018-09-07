import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MainPage from './pages/main'

//React select for options

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to write porgram</h1>
        </header>
        <MainPage />
      </div>
    );
  }
}

export default App;
