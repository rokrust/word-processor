import React, { Component } from 'react'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import styled from 'styled-components'
import QuillIndexing from '../../containers/quill-indexing'

import Clickable from './blots/clickable'

//Blots
// TODO 
// Add clickable words 
//  https://stackoverflow.com/questions/45151080/add-hover-click-handlers-to-quill-blots
//  https://stackoverflow.com/questions/47625666/add-custom-div-to-selected-clicked-on-text-with-quill
//  https://github.com/quilljs/quill/issues/1971
const formats = ["clickable", "bold"];

/*var ops = [
    {
        insert: 'Eventful text',
        attributes: {
            clickable: '/'
        }
    }
]

var Delta = Quill.import('delta')
var content = new Delta(ops)
*/

export default class Editor extends Component{
    constructor(){
        super()
        this.state = { text: "Lorem Ipsum Dolor: \"Sit Amet\"" }
        this.formats = formats
        
        Quill.register(Clickable)
    }

    handleChange = (value, delta) => {
        this.setState({ text: value })
    }

    removeFormat = () => {
        console.log(this.quill.getBounds(this.quill.getSelection()))
        //this.quill.removeFormat(selection.index, selection.length, 'user')
    }

    formatClickable = () => {
        this.quill.format('clickable', '/')
        console.log(this.quill.getContents())
    }

    componentDidMount() {
        this.quill = this.reactQuillRef.getEditor()
        this.indexing = new QuillIndexing(this.quill)
        
    }

    leftSelect = () => {
        if(!this.quill) return
        this.indexing.addPrevWordToSelection(this.quill.getSelection())
    }

    leftRemove = () => {
        if(!this.quill) return
        this.indexing.removeFirstWordFromSelection(this.quill.getSelection())
    }

    rightSelect = () => {
        if(!this.quill) return
        this.indexing.addNextWordToSelection(this.quill.getSelection())
        //this.quill.setSelection(this.indexing.getNextWordSelection(this.quill.getSelection()))
    }

    rightRemove = () => {
        if(!this.quill) return
        this.indexing.removeLastWordFromSelection(this.quill.getSelection())
    }

    render() {
        
        return (
            <MainWrapper>
                <button onClick={this.formatClickable}>Make clickable</button>
                <button onClick={this.leftRemove}>→</button>
                <button onClick={this.leftSelect}>←</button>
                <button onClick={this.rightSelect}>→</button>
                <button onClick={this.rightRemove}>←</button>
                <button onClick={this.removeFormat}>Remove format</button>
                <ReactQuill 
                    ref = {el => this.reactQuillRef = el}
                    theme="snow"
                    value={this.state.text}
                    placeholder="Placeholder test value"
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
