import React, {Component} from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export default class Editor extends Component{
    constructor(){
        super()    
        this.state = { text: '' }
    }

    render() {
        return (
            <ReactQuill 
                theme="snow" 
                value={this.state.text} 
                onChange={(value, delta) => {this.setState({ text: value })}}
            />
        );
    }
}