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
        permission: '',
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
        <button onClick={() => {
          this.google.drive.listFile.next().value
          .then(resp => {
            console.log(resp.files)
            //this.google.drive.getFile({dir: resp.files[0].name, id: resp.files[0].id})
            this.google.drive.createFile('fillertext.txt').then((resp) => this.google.drive.updateFile({id: resp.result.id, dir: 'newtest.txt'}))
          })
        }}>Logout</button>
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
