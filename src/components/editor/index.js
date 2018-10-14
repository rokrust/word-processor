import React, { Component } from 'react'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'


//Blots
// TODO 
// Add clickable words
const formats = ["bold", "italic", "underline", "header"];


export default class Editor extends Component{
    constructor(){
        super()    
        this.state = { text: '' }
        this.formats = formats
    }

    render() {
        console.log(window.location.pathname)
        return (
            <ReactQuill 
                theme="snow"
                value={this.state.text} 
                onChange={(value, delta) => {this.setState({ text: value })}}
                formats={this.formats}
            />
        );
    }
}