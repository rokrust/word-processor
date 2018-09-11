import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MainPage from './pages/main';
import styled from 'styled-components'
import GoogleLogin from './containers/storage/remote'

class App extends Component {
  constructor(){
    super()
    this.googleLogin = new GoogleLogin()
  }

  callback = (response) => {
    this.google = response;
  }

  componentDidMount(){
    this.googleLogin.loadOauth2({
      scope: 'https://www.googleapis.com/auth/drive.file',
      clientId: "774881068724-a2n55qo2us5dmvt9621demginbgbbii7.apps.googleusercontent.com"
    })
    //this.googleLogin.signIn()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to write porgram</h1>
        </header>
        <button onClick={this.googleLogin.signIn}>Login</button>
        <button onClick={this.googleLogin.signOut}>Logout</button>
        <MainPage />
      </div>
    );
  }
}

const AuthorizeButton = styled.button`
  onClick: ${(props) => props.onClick};
  background: blue;
  color: green;
`;
export default App;
