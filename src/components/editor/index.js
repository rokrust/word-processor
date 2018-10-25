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
        this.state = { 
            text: ".....Lorem Ipsum Dolor: \"Sit Amet\"",
            clicked: false
        }
        this.formats = formats
        console.log("Constructor")
        Quill.register(Clickable)
        Quill.register(RightClickable)
        Quill.register(LeftClickable)
        Quill.register(Hoverable)
    }

    handleChange = (value, delta) => {
        console.log(delta)
        this.setState({ text: value })
    }

    removeFormat = () => {
        //let selection = this.quill.getSelection()
        //this.quill.removeFormat(selection.index, selection.length, 'user')
        console.log(this.quill.getSelection())
    }

    test = () => {
        this.formatAllWords('clickable', {
            path: '/',
            onClick: () => window.open('https://en.wikipedia.org'),//this.setState({clicked: true}),
            onRightClick: () => console.log("Right click"),
            onMouseOver: () => window.open('https://www.google.no')
        })
    }

    formatAllWords = (format, value) => {
        this.indexing.getAllWordRanges().forEach(item => {
            this.quill.formatText(item.index, item.length, format, value, 'user')
        })
    }
    
    formatClickable = () => {
        this.quill.format('clickable', {
            path: '/',
            onClick: () => this.setState({clicked: true}),
            onRightClick: () => console.log("Right click"),
            onMouseOver: () => this.setState({clicked: true})
        })
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
                <button onClick={this.test}>Yolo</button>
                {this.state.clicked ? <p>Clicked!</p> : null}
                <ReactQuill
                    style={{position: 'absolute', height: '100%', width: '100%'}} 
                    ref = {el => this.reactQuillRef = el}
                    theme='snow'
                    value={this.state.text}
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
