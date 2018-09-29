import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MainPage from './pages/main';
import styled from 'styled-components'
import Google from './containers/google'

class App extends Component {
  constructor(){
    super()
    this.google = new Google({
      drive: {
        permission: 'metadata.readonly',
        version: 'v3',
      },
    })
  }

  callback = (response) => {
    this.google = response;
  }

  componentDidMount(){
    this.google.initialize()
  }

  render() {
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to write porgram</h1>
        </header>
        <button onClick={this.google.signIn}>Login</button>
        <input type="text" onChange={(event) => this.google.setCredentials(event.target.value)}/>
        <MainPage />
      </div>
    );
  }
}

//ya29.GlsnBl6QnK4xZiCzggd0Q8RL66zvyAUMnjgH3WiOSDmsVlPvZzXtmRMUybR7D8TiqoMpTo_vE5CVVQZ9lyyoOue4bp1PVqTzdz46sZKdNQ99JFNsD0m5q5n6UXi0
//ya29.GlsnBmoKk48Z2xkY_Xd2g6mScGYwFxo9zuxkC_5F5pXT_89csJZaURl9PmQTthPnjxqfq8Xlo9XB0jePCuRmWhR7sxtf-oqCUdOiZrVbkFr5o_i6EliCRz-ohQ1f

const AuthorizeButton = styled.button`
  onClick: ${(props) => props.onClick};
  background: blue;
  color: green;
`;

const position = styled.div`
  flex-direction: row;
  flex: 2;
  border-radius = 0.5;
`;



export default App;
