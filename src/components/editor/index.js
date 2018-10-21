import React, { Component } from 'react'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import styled from 'styled-components'
import QuillIndexing from '../../containers/quill-indexing'

import Clickable, {LeftClickable, RightClickable, Hoverable} from './blots/clickable'

//Blots
// TODO 
// Add clickable words 
//  https://stackoverflow.com/questions/45151080/add-hover-click-handlers-to-quill-blots
//  https://stackoverflow.com/questions/47625666/add-custom-div-to-selected-clicked-on-text-with-quill
//  https://github.com/quilljs/quill/issues/1971
const formats = ["bold", "underline", "clickable", "left-clickable", "right-clickable", "hoverable"];

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
        this.state = { text: ".....Lorem Ipsum Dolor: \"Sit Amet\"" }
        this.formats = formats
        
        Quill.register(Clickable)
        Quill.register(RightClickable)
        Quill.register(LeftClickable)
        Quill.register(Hoverable)
    }

    handleChange = (value, delta) => {
        this.setState({ text: value })
    }

    removeFormat = () => {
        //let selection = this.quill.getSelection()
        //this.quill.removeFormat(selection.index, selection.length, 'user')
        console.log(this.quill.getSelection())
    }

    formatAllWords = (format) => {
        let selection = this.quill.getSelection()
        this.indexing.getAllWordRanges().forEach(item => {
            this.quill.setSelection(item) 
            this.quill.format(format, '/')
        })
        this.quill.setSelection(selection)
    }
    
    formatClickable = () => {
        this.quill.format('clickable', '/')
    }

    formatLClickable = () => {
        this.quill.format('left-clickable', '/')
    }

    formatRClickable = () => {
        this.quill.format('right-clickable', '/')
    }

    formatHoverable = () => {
        this.quill.format('hoverable', '/')
    }

    componentDidMount() {
        this.quill = this.reactQuillRef.getEditor()
        this.indexing = new QuillIndexing(this.quill)
        console.log(this.indexing.getAllWordRanges())
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
            <MainWrapper className="Main">
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
                    onChange={this.handleChange}
                    formats={this.formats}
                ><MainWrapper/></ReactQuill>
            </MainWrapper>
        );
    }
}  
const MainWrapper = styled.div`
    position: absolute; 
    height: 100%; 
    width: 100%;
`;
