import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

//React select for options

class App extends Component {
  constructor(){
    super()    
    this.state = { text: '' }
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to write porgram</h1>
        </header>
          <ReactQuill 
            theme="snow" 
            value={this.state.text} 
            onChange={(value, delta) => {
              console.log(delta)
              this.setState({ text: value })}
            }
          />
      </div>
    );
  }
}

export default App;
