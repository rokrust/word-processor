import React, { Component } from 'react'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import styled from 'styled-components'

import Clickable from './blots/clickable'

//Blots
// TODO 
// Add clickable words 
//  https://stackoverflow.com/questions/45151080/add-hover-click-handlers-to-quill-blots
//  https://stackoverflow.com/questions/47625666/add-custom-div-to-selected-clicked-on-text-with-quill
//  https://github.com/quilljs/quill/issues/1971
const formats = ["clickable", "bold"];

var ops = [
    {
      insert: 'Eventful text',
      attributes: {
        clickable: '/'
      }
    }, { insert: '         Uneventful text', attributes: {bold: true}}
  ]

var Delta = Quill.import('delta')
var content = new Delta(ops)

export default class Editor extends Component{
    constructor(){
        super()
        this.state = { text: '' }
        this.formats = formats
        
        Quill.register(Clickable)
    }

    handleChange = (value, delta) => {
        this.setState({ text: value })
    }

    render() {
        
        return (
            <MainWrapper>
                <ReactQuill 
                    theme="snow"
                    value={content}
                    onChange={this.handleChange}
                    formats={this.formats}
                />
            </MainWrapper>
        );
    }
}

const MainWrapper = styled.div`
    position: absolute; 
    height: 100%; 
    width: 100%;
`;
