import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GoogleSignIn from './pages/google-signin';
import Main from './pages/main'
import Google from './containers/google'
import { Link, Switch, Route } from 'react-router-dom'

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
        <Switch>
          <Route exact path='/' component={Main}/>
          <Route exact path='/googleSignIn' component={GoogleSignIn}/>
        </Switch>
      </div>
    );
  }
}


export default App;
