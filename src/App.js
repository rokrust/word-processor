import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MainPage from './pages/main';
import styled from 'styled-components'
import Google from './containers/google'

class App extends Component {
  constructor(){
    super()
    this.google = new Google()
  }

  callback = (response) => {
    this.google = response;
  }

  componentDidMount(){
    this.google.initialize({
      scope: 'https://www.googleapis.com/auth/drive',
      client_id: "774881068724-a2n55qo2us5dmvt9621demginbgbbii7.apps.googleusercontent.com",
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to write porgram</h1>
        </header>
        <button onClick={ () => { 
          this.google.signIn()
          this.google.drive.listFiles()
        }}>Login</button>
        <button onClick={this.google.signOut}>Logout</button>
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
