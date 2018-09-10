import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MainPage from './pages/main';
import styled from 'styled-components'
import GoogleDriveAuthorizeButton from './components/googleDrive/authorizeButton'

class App extends Component {
  constructor(){
    super()
  }

  callback = (response) => {
    this.google = response;
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to write porgram</h1>
        </header>
        <GoogleDriveAuthorizeButton style={{color: 'green', backgroundColor: 'yellow', height: '20px', width: '120px'}}/>
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
